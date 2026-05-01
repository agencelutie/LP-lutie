#!/usr/bin/env python3
"""
Clarity Client Manager — Gestion des tokens Clarity multi-clients pour Lutie.

Usage :
    python manage_clients.py list                          # Lister les clients configurés
    python manage_clients.py add                           # Ajouter un client (interactif)
    python manage_clients.py add --name "Client" --token "eyJ..." --url "https://site.com"
    python manage_clients.py remove --name "Client"        # Supprimer un client
    python manage_clients.py test --name "Client"          # Tester la connexion Clarity
    python manage_clients.py test --all                    # Tester tous les clients
    python manage_clients.py export                        # Exporter la liste (sans tokens)
"""

import argparse
import json
import sys
import time
from pathlib import Path

CONFIG_PATH = Path(__file__).parent.parent / "references" / "clarity-clients.json"
API_BASE = "https://www.clarity.ms/export-data/api/v1/project-live-insights"


def load_config() -> dict:
    """Charge la config. Crée le fichier si inexistant."""
    if not CONFIG_PATH.exists():
        CONFIG_PATH.parent.mkdir(parents=True, exist_ok=True)
        default = {"clients": []}
        CONFIG_PATH.write_text(json.dumps(default, indent=2, ensure_ascii=False))
        return default
    with open(CONFIG_PATH, encoding="utf-8") as f:
        return json.load(f)


def save_config(config: dict):
    """Sauvegarde la config."""
    CONFIG_PATH.parent.mkdir(parents=True, exist_ok=True)
    CONFIG_PATH.write_text(
        json.dumps(config, indent=2, ensure_ascii=False), encoding="utf-8"
    )
    print(f"  💾 Config sauvegardée dans {CONFIG_PATH}")


def find_client(config: dict, name: str) -> tuple[int, dict | None]:
    """Trouve un client par nom (case-insensitive)."""
    for i, c in enumerate(config["clients"]):
        if c["name"].lower() == name.lower():
            return i, c
    return -1, None


def mask_token(token: str) -> str:
    """Masque un token pour affichage sécurisé."""
    if len(token) <= 10:
        return "***"
    return token[:6] + "..." + token[-4:]


# ── Commands ─────────────────────────────────────────────────────────────────


def cmd_list(config: dict):
    """Liste les clients configurés."""
    clients = config["clients"]
    if not clients:
        print("  Aucun client configuré. Utilise 'add' pour en ajouter un.")
        return

    print(f"  📋 {len(clients)} client(s) configuré(s) :\n")
    print(f"  {'Nom':<25} {'Site':<35} {'Token':<20} {'GA4':<25} {'CVR cible'}")
    print(f"  {'─'*25} {'─'*35} {'─'*20} {'─'*25} {'─'*10}")

    for c in clients:
        name = c["name"][:24]
        url = c.get("site_url", "—")[:34]
        token = mask_token(c.get("clarity_token", ""))
        ga4 = c.get("ga4_property", "—")[:24]
        cvr = c.get("cro_objectives", {}).get("target_cvr", "—")
        cvr_str = f"{cvr}%" if isinstance(cvr, (int, float)) else str(cvr)
        print(f"  {name:<25} {url:<35} {token:<20} {ga4:<25} {cvr_str}")


def cmd_add(config: dict, args):
    """Ajoute un nouveau client."""
    name = args.name
    token = args.token
    url = args.url

    # Mode interactif si les args manquent
    if not name:
        print("  ➕ Ajout d'un nouveau client Clarity\n")
        name = input("  Nom du client : ").strip()
        if not name:
            print("  ❌ Nom requis.")
            return

    # Vérifier doublon
    idx, existing = find_client(config, name)
    if existing:
        overwrite = input(f"  ⚠️  '{name}' existe déjà. Mettre à jour ? (o/N) : ").strip().lower()
        if overwrite != "o":
            print("  Annulé.")
            return
        # On va remplacer
        client = existing
    else:
        client = {"name": name}

    if not token:
        print(f"\n  Pour obtenir le token Clarity :")
        print(f"  1. Va sur https://clarity.microsoft.com")
        print(f"  2. Sélectionne le projet '{name}'")
        print(f"  3. Settings → Data Export → Generate new API token\n")
        token = input("  Token Clarity (JWT) : ").strip()
        if not token:
            print("  ❌ Token requis.")
            return

    client["clarity_token"] = token

    if not url:
        url = input("  URL du site (ex: https://chauffoplombier.be) : ").strip()
    if url:
        client["site_url"] = url

    # GA4
    ga4 = args.ga4 if hasattr(args, "ga4") and args.ga4 else None
    if not ga4:
        ga4 = input("  Propriété GA4 (ex: properties/123456789, ou Entrée pour skip) : ").strip()
    if ga4:
        client["ga4_property"] = ga4

    # Objectifs CRO
    if "cro_objectives" not in client:
        print("\n  📊 Objectifs CRO (Entrée pour valeurs par défaut) :")
        target_cvr = input("  CVR cible en % (défaut: 3.0) : ").strip()
        primary_conv = input("  Conversion principale (défaut: form_submit) : ").strip()
        key_pages_raw = input("  Pages clés séparées par des virgules (défaut: /, /contact) : ").strip()
        secondary_raw = input("  Conversions secondaires séparées par des virgules (optionnel) : ").strip()

        client["cro_objectives"] = {
            "target_cvr": float(target_cvr) if target_cvr else 3.0,
            "primary_conversion": primary_conv or "form_submit",
            "secondary_conversions": [s.strip() for s in secondary_raw.split(",") if s.strip()] if secondary_raw else [],
            "key_pages": [p.strip() for p in key_pages_raw.split(",") if p.strip()] if key_pages_raw else ["/", "/contact"],
        }

    # Sauvegarder
    if idx >= 0:
        config["clients"][idx] = client
        print(f"\n  ✅ Client '{name}' mis à jour.")
    else:
        config["clients"].append(client)
        print(f"\n  ✅ Client '{name}' ajouté.")

    save_config(config)


def cmd_remove(config: dict, args):
    """Supprime un client."""
    if not args.name:
        print("  ❌ --name requis pour supprimer un client.")
        return

    idx, client = find_client(config, args.name)
    if not client:
        print(f"  ❌ Client '{args.name}' introuvable.")
        return

    confirm = input(f"  Supprimer '{client['name']}' ? (o/N) : ").strip().lower()
    if confirm != "o":
        print("  Annulé.")
        return

    config["clients"].pop(idx)
    save_config(config)
    print(f"  🗑️  Client '{client['name']}' supprimé.")


def cmd_test(config: dict, args):
    """Teste la connexion Clarity pour un ou tous les clients."""
    try:
        import requests
    except ImportError:
        print("  ❌ pip install requests --break-system-packages")
        return

    clients_to_test = []
    if args.all:
        clients_to_test = config["clients"]
    elif args.name:
        _, client = find_client(config, args.name)
        if not client:
            print(f"  ❌ Client '{args.name}' introuvable.")
            return
        clients_to_test = [client]
    else:
        print("  ❌ --name ou --all requis.")
        return

    if not clients_to_test:
        print("  Aucun client à tester.")
        return

    print(f"\n  🧪 Test de connexion Clarity pour {len(clients_to_test)} client(s) :\n")

    for client in clients_to_test:
        name = client["name"]
        token = client.get("clarity_token", "")
        sys.stdout.write(f"  {name:<25} ")
        sys.stdout.flush()

        if not token:
            print("❌ Pas de token configuré")
            continue

        try:
            headers = {
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json",
            }
            resp = requests.get(
                API_BASE,
                headers=headers,
                params={"numOfDays": "1", "dimension1": "Device"},
                timeout=15,
            )

            if resp.status_code == 200:
                data = resp.json()
                # Compter les sessions si disponible
                total_sessions = 0
                for metric in data:
                    if metric.get("metricName") == "Traffic":
                        for info in metric.get("information", []):
                            total_sessions += int(info.get("totalSessionCount", 0))
                print(f"✅ OK — {total_sessions:,} sessions (dernières 24h)")

            elif resp.status_code == 401:
                print("❌ Token expiré ou invalide — régénérer dans Clarity Settings")
            elif resp.status_code == 403:
                print("❌ Token non autorisé pour ce projet")
            elif resp.status_code == 429:
                print("⚠️  Limite API atteinte (10 appels/jour)")
            else:
                print(f"❌ Erreur HTTP {resp.status_code}")

        except requests.exceptions.Timeout:
            print("❌ Timeout (>15s)")
        except requests.exceptions.ConnectionError:
            print("❌ Erreur de connexion")
        except Exception as e:
            print(f"❌ {e}")

    print()


def cmd_export(config: dict):
    """Exporte la liste des clients sans les tokens (pour partage)."""
    export = {"clients": []}
    for c in config["clients"]:
        safe = {k: v for k, v in c.items() if k != "clarity_token"}
        safe["clarity_token"] = "***MASKED***"
        export["clients"].append(safe)

    print(json.dumps(export, indent=2, ensure_ascii=False))


# ── Main ─────────────────────────────────────────────────────────────────────


def main():
    parser = argparse.ArgumentParser(
        description="Gestionnaire de tokens Clarity multi-clients — Lutie"
    )
    sub = parser.add_subparsers(dest="command")

    sub.add_parser("list", help="Lister les clients")

    add_p = sub.add_parser("add", help="Ajouter un client")
    add_p.add_argument("--name", help="Nom du client")
    add_p.add_argument("--token", help="Token Clarity JWT")
    add_p.add_argument("--url", help="URL du site")
    add_p.add_argument("--ga4", help="Propriété GA4")

    rm_p = sub.add_parser("remove", help="Supprimer un client")
    rm_p.add_argument("--name", required=True, help="Nom du client")

    test_p = sub.add_parser("test", help="Tester la connexion")
    test_p.add_argument("--name", help="Nom du client")
    test_p.add_argument("--all", action="store_true", help="Tester tous les clients")

    sub.add_parser("export", help="Exporter sans tokens")

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        return

    config = load_config()

    if args.command == "list":
        cmd_list(config)
    elif args.command == "add":
        cmd_add(config, args)
    elif args.command == "remove":
        cmd_remove(config, args)
    elif args.command == "test":
        cmd_test(config, args)
    elif args.command == "export":
        cmd_export(config)


if __name__ == "__main__":
    main()
