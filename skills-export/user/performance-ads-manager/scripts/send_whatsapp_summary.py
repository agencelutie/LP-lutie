"""
Send a performance summary via WhatsApp Business API (Meta).

Usage:
    python scripts/send_whatsapp_summary.py --phone "+33XXXXXXXXX" --template weekly_summary --data ./data.json
    python scripts/send_whatsapp_summary.py --phone "+33XXXXXXXXX" --test

Setup: configure WhatsApp credentials in .env file (see references/api_setup.md)

Note: WhatsApp Business API requires:
  - A verified Meta Business Manager account
  - A registered WhatsApp Business phone number
  - Approved message templates (submit in Meta Business Manager > WhatsApp Manager > Message Templates)
"""

import argparse
import json
import os
import sys
from pathlib import Path

try:
    import requests
    from dotenv import load_dotenv
except ImportError:
    print("❌ Missing dependencies. Install with: pip install requests python-dotenv")
    sys.exit(1)

load_dotenv()

WHATSAPP_API_BASE = "https://graph.facebook.com/v18.0"


def get_credentials():
    token = os.getenv("WHATSAPP_ACCESS_TOKEN")
    phone_number_id = os.getenv("WHATSAPP_PHONE_NUMBER_ID")

    if not token or not phone_number_id:
        print("❌ WHATSAPP_ACCESS_TOKEN or WHATSAPP_PHONE_NUMBER_ID not found in .env")
        print("   See references/api_setup.md for setup instructions")
        sys.exit(1)

    return token, phone_number_id


def send_template_message(to_phone, template_name, template_params, language="fr"):
    """Send a pre-approved WhatsApp template message."""
    token, phone_number_id = get_credentials()

    url = f"{WHATSAPP_API_BASE}/{phone_number_id}/messages"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }

    # Build components from params
    components = []
    if template_params:
        body_params = [{"type": "text", "text": str(p)} for p in template_params]
        components.append({"type": "body", "parameters": body_params})

    payload = {
        "messaging_product": "whatsapp",
        "to": to_phone,
        "type": "template",
        "template": {
            "name": template_name,
            "language": {"code": language},
            "components": components,
        },
    }

    response = requests.post(url, headers=headers, json=payload)

    if response.status_code == 200:
        return True, response.json()
    else:
        return False, response.json()


def send_free_text_message(to_phone, text):
    """Send a free-form text message (only within 24h customer service window)."""
    token, phone_number_id = get_credentials()

    url = f"{WHATSAPP_API_BASE}/{phone_number_id}/messages"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }

    payload = {
        "messaging_product": "whatsapp",
        "to": to_phone,
        "type": "text",
        "text": {"body": text, "preview_url": False},
    }

    response = requests.post(url, headers=headers, json=payload)

    if response.status_code == 200:
        return True, response.json()
    else:
        return False, response.json()


def build_weekly_summary_text(data):
    """Build the weekly summary message text from data dict."""
    client = data.get("client", "")
    week = data.get("week", "")
    spend = data.get("total_spend", "N/A")
    spend_var = data.get("spend_variation", "")
    conversions = data.get("total_conversions", "N/A")
    conv_var = data.get("conversions_variation", "")
    cpa = data.get("cpa", "N/A")
    roas = data.get("roas", "N/A")
    top_action = data.get("top_action", "")
    watch_out = data.get("watch_out", "")

    spend_str = f"{spend}" + (f" ({spend_var})" if spend_var else "")
    conv_str = f"{conversions}" + (f" ({conv_var})" if conv_var else "")

    lines = [
        f"📊 *Rapport Hebdo{' — ' + client if client else ''}*" + (f" | Sem. du {week}" if week else ""),
        "",
        f"💰 Dépense : {spend_str}",
        f"🎯 Conversions : {conv_str}",
        f"📈 CPA : {cpa} | ROAS : {roas}",
    ]

    if top_action:
        lines += ["", f"⚡ Action prioritaire cette semaine :", top_action]

    if watch_out:
        lines += ["", f"🔴 Point de vigilance :", watch_out]

    lines += ["", "_Rapport complet envoyé par email._"]

    return "\n".join(lines)


def build_monthly_summary_text(data):
    """Build the monthly summary message text from data dict."""
    client = data.get("client", "")
    month = data.get("month", "")
    kpi_status = data.get("kpi_status", "")
    spend = data.get("total_spend", "N/A")
    budget = data.get("budget", "N/A")
    conversions = data.get("total_conversions", "N/A")
    conv_target = data.get("conversions_target", "N/A")
    cpa = data.get("cpa", "N/A")
    roas = data.get("roas", "N/A")
    top_fact = data.get("top_fact", "")
    next_month_attention = data.get("next_month_attention", "")

    lines = [
        f"📋 *Bilan Mensuel{' — ' + client if client else ''}*" + (f" | {month}" if month else ""),
        "",
    ]

    if kpi_status:
        lines.append(f"✅ KPI principal : {kpi_status}")

    lines += [
        f"💰 Dépense : {spend} / {budget}",
        f"🎯 Conversions : {conversions} vs {conv_target} objectif",
        f"📈 CPA moy. : {cpa} | ROAS : {roas}",
    ]

    if top_fact:
        lines += ["", f"🏆 Top fait du mois : {top_fact}"]

    if next_month_attention:
        lines += [f"🔴 Point d'attention M+1 : {next_month_attention}"]

    lines += ["", "_Rapport Excel complet envoyé par email._"]

    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description="Send WhatsApp performance summary")
    parser.add_argument("--phone", help="Recipient phone number with country code (e.g. +33XXXXXXXXX)")
    parser.add_argument("--template", choices=["weekly_summary", "monthly_summary"], default="weekly_summary")
    parser.add_argument("--data", help="Path to JSON file with summary data")
    parser.add_argument("--use-template", action="store_true", help="Use approved WA template instead of free text")
    parser.add_argument("--test", action="store_true", help="Test with dummy data")
    args = parser.parse_args()

    phone = args.phone or os.getenv("WHATSAPP_RECIPIENT_DEFAULT")
    if not phone:
        print("❌ No phone number specified. Use --phone or set WHATSAPP_RECIPIENT_DEFAULT in .env")
        sys.exit(1)

    print(f"\n📱 Sending WhatsApp summary")
    print(f"   To: {phone}")
    print(f"   Template: {args.template}\n")

    if args.test:
        data = {
            "client": "Test Client",
            "week": "24-30 mars",
            "total_spend": "€1,250",
            "spend_variation": "+5%",
            "total_conversions": "42",
            "conversions_variation": "+8%",
            "cpa": "€29.76",
            "roas": "3.2",
            "top_action": "Ajouter 6 négatifs sur SEARCH-GEN-FR (économie ~80€/sem)",
            "watch_out": "Fréquence Meta RETARGETING-30J = 4.1 → rafraîchir créatifs",
        }
    elif args.data:
        data = json.loads(Path(args.data).read_text())
    else:
        print("❌ Provide --data path or use --test flag")
        sys.exit(1)

    # Build message text
    if args.template == "weekly_summary":
        message_text = build_weekly_summary_text(data)
    else:
        message_text = build_monthly_summary_text(data)

    print("Message preview:")
    print("─" * 40)
    print(message_text)
    print("─" * 40)
    print()

    # Send message
    if args.use_template:
        # Use pre-approved template (required outside 24h customer service window)
        params = [
            data.get("client", ""),
            data.get("week", data.get("month", "")),
            data.get("total_spend", ""),
            data.get("total_conversions", ""),
            data.get("cpa", ""),
            data.get("top_action", ""),
        ]
        success, response = send_template_message(phone, args.template, params)
    else:
        # Free-form text (only works within 24h of last customer message)
        success, response = send_free_text_message(phone, message_text)

    if success:
        message_id = response.get("messages", [{}])[0].get("id", "")
        print(f"✅ WhatsApp message sent successfully! (ID: {message_id})")
    else:
        error = response.get("error", {})
        print(f"❌ Failed to send WhatsApp message")
        print(f"   Error: {error.get('message', 'Unknown error')} (code: {error.get('code', 'N/A')})")
        print("\n💡 If you get error 131030 (template not found), make sure:")
        print("   1. Your template is approved in Meta Business Manager")
        print("   2. The template name matches exactly")
        print("   3. Or use free-text (remove --use-template) if within 24h window")
        sys.exit(1)


if __name__ == "__main__":
    main()
