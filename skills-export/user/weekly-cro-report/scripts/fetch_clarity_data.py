#!/usr/bin/env python3
"""
Clarity Data Export — Script d'extraction pour le skill weekly-cro-report.
Fallback quand le MCP Clarity n'est pas connecté.

Usage :
    python fetch_clarity_data.py --client "Nom Client" --config path/to/clarity-clients.json
    python fetch_clarity_data.py --token "eyJ..." --days 3

Sortie : JSON structuré avec les métriques CRO par page, device, et canal.
"""

import argparse
import json
import sys
import time
from pathlib import Path

try:
    import requests
except ImportError:
    print("ERROR: pip install requests --break-system-packages", file=sys.stderr)
    sys.exit(1)

API_BASE = "https://www.clarity.ms/export-data/api/v1/project-live-insights"
MAX_DAYS = 3  # Clarity API limit
MAX_CALLS_PER_DAY = 10


def load_client_config(config_path: str, client_name: str) -> dict:
    """Charge la configuration d'un client depuis le fichier JSON."""
    with open(config_path) as f:
        config = json.load(f)

    for client in config["clients"]:
        if client["name"].lower() == client_name.lower():
            return client

    available = [c["name"] for c in config["clients"]]
    raise ValueError(
        f"Client '{client_name}' introuvable. Clients disponibles : {available}"
    )


def fetch_clarity(token: str, num_days: int, dimensions: list[str]) -> dict:
    """Appel unique à l'API Clarity Data Export."""
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }
    params = {"numOfDays": str(min(num_days, MAX_DAYS))}

    for i, dim in enumerate(dimensions[:3], 1):
        params[f"dimension{i}"] = dim

    resp = requests.get(API_BASE, headers=headers, params=params, timeout=30)

    if resp.status_code == 401:
        raise PermissionError(
            "Token Clarity expiré ou invalide. "
            "Régénérer dans Settings > Data Export > Generate new API token."
        )
    if resp.status_code == 429:
        raise RuntimeError(
            f"Limite API Clarity atteinte ({MAX_CALLS_PER_DAY} appels/jour/projet). "
            "Réessayer demain ou utiliser les données GA4 seules."
        )
    if resp.status_code == 403:
        raise PermissionError("Token non autorisé pour ce projet Clarity.")

    resp.raise_for_status()
    return resp.json()


def extract_all(token: str, num_days: int = 3) -> dict:
    """
    Extraction complète en 3 appels (respecte la limite de 10/jour).
    Retourne un dict structuré avec les 3 vues.
    """
    results = {}
    calls_made = 0

    # Appel 1 — Comportement par page
    print("  [1/3] Extraction par page (URL)...", file=sys.stderr)
    results["by_page"] = fetch_clarity(token, num_days, ["URL"])
    calls_made += 1
    time.sleep(1)  # Polite delay

    # Appel 2 — Croisement device × page
    print("  [2/3] Extraction par device × page...", file=sys.stderr)
    results["by_device_page"] = fetch_clarity(token, num_days, ["Device", "URL"])
    calls_made += 1
    time.sleep(1)

    # Appel 3 — Sources × page
    print("  [3/3] Extraction par canal × page...", file=sys.stderr)
    results["by_channel_page"] = fetch_clarity(token, num_days, ["Channel", "URL"])
    calls_made += 1

    results["_meta"] = {
        "num_days": num_days,
        "api_calls_used": calls_made,
        "api_calls_remaining_today": MAX_CALLS_PER_DAY - calls_made,
        "extraction_timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }

    return results


def summarize_cro_signals(data: dict) -> dict:
    """
    Post-traitement : extrait les signaux CRO clés depuis les données brutes Clarity.
    Identifie les pages problématiques selon les seuils d'alerte Lutie.
    """
    signals = {
        "critical": [],  # 🔴
        "important": [],  # 🟡
        "moderate": [],  # 🟠
    }

    by_page = data.get("by_page", [])

    for metric_group in by_page:
        metric_name = metric_group.get("metricName", "")

        if metric_name == "Dead Click Count":
            for info in metric_group.get("information", []):
                count = int(info.get("deadClickCount", 0))
                sessions = int(info.get("totalSessionCount", 1))
                url = info.get("URL", "unknown")
                rate = (count / sessions * 100) if sessions > 0 else 0

                if rate > 5:
                    signals["critical"].append({
                        "type": "dead_clicks",
                        "page": url,
                        "rate": round(rate, 1),
                        "count": count,
                        "sessions": sessions,
                        "severity": "critical",
                    })

        elif metric_name == "Rage Click Count":
            for info in metric_group.get("information", []):
                count = int(info.get("rageClickCount", 0))
                sessions = int(info.get("totalSessionCount", 1))
                url = info.get("URL", "unknown")
                rate = (count / sessions * 100) if sessions > 0 else 0

                if rate > 3:
                    signals["critical"].append({
                        "type": "rage_clicks",
                        "page": url,
                        "rate": round(rate, 1),
                        "count": count,
                        "sessions": sessions,
                        "severity": "critical",
                    })
                elif rate > 1:
                    signals["important"].append({
                        "type": "rage_clicks",
                        "page": url,
                        "rate": round(rate, 1),
                        "count": count,
                        "sessions": sessions,
                        "severity": "important",
                    })

        elif metric_name == "Quickback Click":
            for info in metric_group.get("information", []):
                count = int(info.get("quickbackCount", 0))
                sessions = int(info.get("totalSessionCount", 1))
                url = info.get("URL", "unknown")
                rate = (count / sessions * 100) if sessions > 0 else 0

                if rate > 10:
                    signals["critical"].append({
                        "type": "quickback",
                        "page": url,
                        "rate": round(rate, 1),
                        "count": count,
                        "sessions": sessions,
                        "severity": "critical",
                    })

        elif metric_name == "Script Error Count":
            for info in metric_group.get("information", []):
                count = int(info.get("scriptErrorCount", 0))
                url = info.get("URL", "unknown")
                if count > 0:
                    signals["critical"].append({
                        "type": "script_errors",
                        "page": url,
                        "count": count,
                        "severity": "critical",
                    })

    return signals


def main():
    parser = argparse.ArgumentParser(description="Clarity CRO Data Extraction")
    parser.add_argument("--client", help="Nom du client (depuis config)")
    parser.add_argument("--config", default="references/clarity-clients.json",
                        help="Chemin vers le fichier de config clients")
    parser.add_argument("--token", help="Token Clarity (override config)")
    parser.add_argument("--days", type=int, default=3, help="Nombre de jours (1-3)")
    parser.add_argument("--output", default="-", help="Fichier de sortie (- = stdout)")
    parser.add_argument("--summary", action="store_true",
                        help="Inclure le résumé des signaux CRO")

    args = parser.parse_args()

    # Résoudre le token
    token = args.token
    client_config = None

    if not token:
        if not args.client:
            parser.error("--client ou --token requis")
        client_config = load_client_config(args.config, args.client)
        token = client_config["clarity_token"]

    # Extraction
    print(f"Extraction Clarity ({args.days}j)...", file=sys.stderr)
    data = extract_all(token, args.days)

    # Ajouter le résumé CRO si demandé
    if args.summary:
        data["cro_signals"] = summarize_cro_signals(data)

    # Ajouter la config client si disponible
    if client_config:
        data["_client"] = {
            "name": client_config["name"],
            "site_url": client_config["site_url"],
            "cro_objectives": client_config.get("cro_objectives", {}),
        }

    # Sortie
    output = json.dumps(data, indent=2, ensure_ascii=False)

    if args.output == "-":
        print(output)
    else:
        Path(args.output).write_text(output, encoding="utf-8")
        print(f"Données sauvegardées dans {args.output}", file=sys.stderr)


if __name__ == "__main__":
    main()
