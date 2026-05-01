"""
Send performance reports by email (SMTP or SendGrid API).

Usage:
    python scripts/send_report_email.py --to client@example.com --subject "Bilan Mensuel" --report-path ./report.xlsx
    python scripts/send_report_email.py --to client@example.com --test

Setup: configure email credentials in .env file (see references/api_setup.md)
"""

import argparse
import os
import smtplib
import sys
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path

try:
    from dotenv import load_dotenv
except ImportError:
    print("❌ Install python-dotenv: pip install python-dotenv")
    sys.exit(1)

load_dotenv()


def send_via_smtp(to, subject, body_html, body_text, attachments=None):
    host = os.getenv("EMAIL_SMTP_HOST", "smtp.gmail.com")
    port = int(os.getenv("EMAIL_SMTP_PORT", "587"))
    sender = os.getenv("EMAIL_SENDER")
    password = os.getenv("EMAIL_PASSWORD")

    if not sender or not password:
        print("❌ EMAIL_SENDER or EMAIL_PASSWORD not found in .env")
        print("   See references/api_setup.md for setup instructions")
        sys.exit(1)

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = sender
    msg["To"] = to

    msg.attach(MIMEText(body_text, "plain", "utf-8"))
    msg.attach(MIMEText(body_html, "html", "utf-8"))

    if attachments:
        msg_with_attach = MIMEMultipart("mixed")
        msg_with_attach["Subject"] = subject
        msg_with_attach["From"] = sender
        msg_with_attach["To"] = to
        msg_with_attach.attach(msg)

        for filepath in attachments:
            path = Path(filepath)
            if path.exists():
                with open(path, "rb") as f:
                    part = MIMEApplication(f.read(), Name=path.name)
                    part["Content-Disposition"] = f'attachment; filename="{path.name}"'
                    msg_with_attach.attach(part)
                print(f"   📎 Attached: {path.name}")
            else:
                print(f"   ⚠️  File not found: {filepath}")
        msg = msg_with_attach

    with smtplib.SMTP(host, port) as server:
        server.ehlo()
        server.starttls()
        server.login(sender, password)
        server.sendmail(sender, to, msg.as_string())

    return True


def send_via_sendgrid(to, subject, body_html, body_text, attachments=None):
    try:
        import sendgrid
        from sendgrid.helpers.mail import Mail, Attachment, FileContent, FileName, FileType, Disposition
        import base64
    except ImportError:
        print("❌ SendGrid not installed: pip install sendgrid")
        sys.exit(1)

    api_key = os.getenv("SENDGRID_API_KEY")
    sender = os.getenv("EMAIL_SENDER")

    if not api_key or not sender:
        print("❌ SENDGRID_API_KEY or EMAIL_SENDER not found in .env")
        sys.exit(1)

    message = Mail(
        from_email=sender,
        to_emails=to,
        subject=subject,
        plain_text_content=body_text,
        html_content=body_html,
    )

    if attachments:
        for filepath in attachments:
            path = Path(filepath)
            if path.exists():
                with open(path, "rb") as f:
                    encoded = base64.b64encode(f.read()).decode()
                attachment = Attachment(
                    file_content=FileContent(encoded),
                    file_name=FileName(path.name),
                    file_type=FileType("application/octet-stream"),
                    disposition=Disposition("attachment"),
                )
                message.attachment = attachment

    sg = sendgrid.SendGridAPIClient(api_key=api_key)
    response = sg.send(message)
    return response.status_code in [200, 201, 202]


def build_report_email_html(summary_data):
    """Build a clean HTML email body from summary data dict."""
    client = summary_data.get("client", "Client")
    period = summary_data.get("period", "")
    spend = summary_data.get("total_spend", "N/A")
    conversions = summary_data.get("total_conversions", "N/A")
    cpa = summary_data.get("cpa", "N/A")
    roas = summary_data.get("roas", "N/A")
    top_action = summary_data.get("top_action", "")
    watch_out = summary_data.get("watch_out", "")

    return f"""
    <html><body style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
    <div style="background: #1a73e8; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
        <h2 style="margin: 0;">📊 Rapport Performance Ads</h2>
        <p style="margin: 5px 0 0;">{client} — {period}</p>
    </div>
    <div style="background: #f8f9fa; padding: 20px; border: 1px solid #e0e0e0;">
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 10px; background: white; border: 1px solid #e0e0e0; text-align: center;">
                    <div style="font-size: 24px; font-weight: bold; color: #1a73e8;">{spend}</div>
                    <div style="color: #666; font-size: 12px;">DÉPENSE TOTALE</div>
                </td>
                <td style="padding: 10px; background: white; border: 1px solid #e0e0e0; text-align: center;">
                    <div style="font-size: 24px; font-weight: bold; color: #34a853;">{conversions}</div>
                    <div style="color: #666; font-size: 12px;">CONVERSIONS</div>
                </td>
                <td style="padding: 10px; background: white; border: 1px solid #e0e0e0; text-align: center;">
                    <div style="font-size: 24px; font-weight: bold; color: #fbbc04;">{cpa}</div>
                    <div style="color: #666; font-size: 12px;">CPA MOYEN</div>
                </td>
                <td style="padding: 10px; background: white; border: 1px solid #e0e0e0; text-align: center;">
                    <div style="font-size: 24px; font-weight: bold; color: #ea4335;">{roas}</div>
                    <div style="color: #666; font-size: 12px;">ROAS</div>
                </td>
            </tr>
        </table>
    </div>
    {"<div style='padding: 15px; background: #e8f5e9; border-left: 4px solid #34a853; margin: 10px 0;'><strong>⚡ Action prioritaire :</strong> " + top_action + "</div>" if top_action else ""}
    {"<div style='padding: 15px; background: #fce8e6; border-left: 4px solid #ea4335; margin: 10px 0;'><strong>🔴 Point de vigilance :</strong> " + watch_out + "</div>" if watch_out else ""}
    <div style="padding: 15px; color: #666; font-size: 12px; border-top: 1px solid #e0e0e0; margin-top: 10px;">
        Le rapport complet est en pièce jointe. Pour toute question, répondez à cet email.
    </div>
    </body></html>
    """


def main():
    parser = argparse.ArgumentParser(description="Send performance report by email")
    parser.add_argument("--to", help="Recipient email address")
    parser.add_argument("--subject", default="Rapport Performance Ads", help="Email subject")
    parser.add_argument("--report-path", help="Path to the report file to attach")
    parser.add_argument("--summary-json", help="Path to JSON file with summary data for email body")
    parser.add_argument("--provider", choices=["smtp", "sendgrid"], default="smtp", help="Email provider")
    parser.add_argument("--test", action="store_true", help="Send a test email to verify setup")
    args = parser.parse_args()

    recipient = args.to or os.getenv("EMAIL_RECIPIENT_DEFAULT")
    if not recipient:
        print("❌ No recipient specified. Use --to or set EMAIL_RECIPIENT_DEFAULT in .env")
        sys.exit(1)

    print(f"\n📧 Sending email report")
    print(f"   To: {recipient}")
    print(f"   Subject: {args.subject}")
    print(f"   Provider: {args.provider}\n")

    if args.test:
        summary = {"client": "Test Client", "period": "Test", "total_spend": "€0", "conversions": "0", "cpa": "€0", "roas": "0"}
        subject = "[TEST] Email Configuration Test"
    else:
        summary = {}
        if args.summary_json:
            import json
            summary = json.loads(Path(args.summary_json).read_text())
        subject = args.subject

    body_html = build_report_email_html(summary)
    body_text = f"Rapport Performance Ads\n\nRapport disponible en pièce jointe."

    attachments = [args.report_path] if args.report_path and not args.test else []

    try:
        if args.provider == "sendgrid" and os.getenv("SENDGRID_API_KEY"):
            success = send_via_sendgrid(recipient, subject, body_html, body_text, attachments)
        else:
            success = send_via_smtp(recipient, subject, body_html, body_text, attachments)

        if success:
            print(f"✅ Email sent successfully to {recipient}")
        else:
            print("❌ Email sending failed")
            sys.exit(1)
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
