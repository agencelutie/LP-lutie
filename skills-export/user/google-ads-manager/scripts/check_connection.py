#!/usr/bin/env python3
"""
Vérifie la connexion à l'API Google Ads et affiche les informations du compte.
Usage: python check_connection.py --customer-id CUSTOMER_ID
"""
import argparse
import sys

try:
    from google.ads.googleads.client import GoogleAdsClient
    from google.ads.googleads.errors import GoogleAdsException
except ImportError:
    print("❌ La bibliothèque google-ads n'est pas installée.")
    print("   Exécutez : pip install google-ads --break-system-packages")
    sys.exit(1)


def check_connection(customer_id: str):
    """Vérifie la connexion et affiche les infos du compte."""
    # Nettoyer le customer_id (enlever les tirets)
    cid = customer_id.replace("-", "")

    try:
        client = GoogleAdsClient.load_from_storage()
    except Exception as e:
        print(f"❌ Impossible de charger les credentials depuis google-ads.yaml")
        print(f"   Erreur : {e}")
        print(f"   Vérifiez le fichier ~/.google-ads.yaml (voir references/api_setup.md)")
        sys.exit(1)

    ga_service = client.get_service("GoogleAdsService")

    query = """
        SELECT
            customer.id,
            customer.descriptive_name,
            customer.currency_code,
            customer.time_zone,
            customer.status
        FROM customer
        LIMIT 1
    """

    try:
        response = ga_service.search_stream(customer_id=cid, query=query)
        for batch in response:
            for row in batch.results:
                customer = row.customer
                print(f"✅ Connexion réussie")
                print(f"   Compte : {customer.descriptive_name}")
                print(f"   ID     : {customer.id}")
                print(f"   Statut : {customer.status.name}")
                print(f"   Timezone: {customer.time_zone}")
                print(f"   Devise : {customer.currency_code}")
        return True

    except GoogleAdsException as ex:
        print(f"❌ Erreur API Google Ads")
        print(f"   Code : {ex.error.code().name}")
        for error in ex.failure.errors:
            print(f"   Message : {error.message}")
            if error.location:
                for field_path_element in error.location.field_path_elements:
                    print(f"   Champ : {field_path_element.field_name}")
        return False
    except Exception as e:
        print(f"❌ Erreur inattendue : {e}")
        return False


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Vérifie la connexion à l'API Google Ads")
    parser.add_argument("--customer-id", required=True, help="ID du compte Google Ads (ex: 123-456-7890)")
    args = parser.parse_args()
    success = check_connection(args.customer_id)
    sys.exit(0 if success else 1)
