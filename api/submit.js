import admin from 'firebase-admin';

const SKILL_URL = 'https://skill.lutie.fr/ads-google-lutie.skill';

let app;
function getApp() {
  if (!app) {
    app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  }
  return app;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, company } = req.body || {};

  if (!name?.trim() || !email?.trim()) {
    return res.status(400).json({ error: 'Nom et email requis.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Email invalide.' });
  }

  // 1. Save lead to Firebase Firestore
  try {
    const db = getApp() && admin.firestore();
    await db.collection('crm_leads').add({
      company_name: company.trim(),
      contact_name: name.trim(),
      email: email.trim().toLowerCase(),
      status: 'new',
      source: 'skill.lutie.fr',
      created_at: admin.firestore.FieldValue.serverTimestamp(),
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    });
  } catch (err) {
    console.error('Firestore error:', err);
    return res.status(500).json({ error: 'Erreur lors de l\'enregistrement.' });
  }

  // 2. Send email via Brevo with download link
  const firstName = name.trim().split(' ')[0];

  const html = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;background:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:40px 16px;">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <tr><td align="center" style="padding-bottom:32px;">
          <img src="https://website-off-eta.vercel.app/images/Groupe-1721-3.png" alt="Lutie" height="36" style="display:block;" />
        </td></tr>

        <tr><td style="background:#FCB002;border-radius:16px;padding:32px 32px 32px;text-align:center;">
          <p style="margin:0 0 8px;font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#19345c;opacity:0.7;">Votre skill est prêt</p>
          <h1 style="margin:0 0 12px;font-size:26px;font-weight:800;color:#19345c;line-height:1.2;">Skill Google Ads<br>pour Claude</h1>
          <p style="margin:0 0 24px;font-size:15px;color:#19345c;opacity:0.85;line-height:1.6;">Bonjour ${firstName},<br>Cliquez sur le bouton ci-dessous pour télécharger votre skill.</p>
          <a href="${SKILL_URL}" style="display:inline-block;background:#19345c;color:#FCB002;font-weight:800;font-size:16px;text-decoration:none;padding:16px 36px;border-radius:999px;">
            Télécharger le skill ☀️
          </a>
        </td></tr>

        <tr><td style="padding:32px 0 0;">
          <p style="margin:0 0 20px;font-size:17px;font-weight:700;color:#19345c;">Comment l'installer :</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:top;padding-right:12px;width:40px;">
                <div style="width:28px;height:28px;border-radius:50%;background:#19345c;color:#FCB002;font-weight:800;font-size:13px;text-align:center;line-height:28px;">1</div>
              </td>
              <td style="padding-bottom:16px;">
                <p style="margin:0;font-size:14px;color:#19345c;line-height:1.5;"><strong>Téléchargez</strong> le fichier <strong>ads-google-lutie.skill</strong> via le bouton ci-dessus</p>
              </td>
            </tr>
            <tr>
              <td style="vertical-align:top;padding-right:12px;">
                <div style="width:28px;height:28px;border-radius:50%;background:#19345c;color:#FCB002;font-weight:800;font-size:13px;text-align:center;line-height:28px;">2</div>
              </td>
              <td style="padding-bottom:16px;">
                <p style="margin:0;font-size:14px;color:#19345c;line-height:1.5;">Ouvrez <strong>Claude Code</strong> et exécutez <strong style="font-family:monospace;background:#fff3cc;padding:2px 6px;border-radius:4px;">claude skill install ads-google-lutie.skill</strong></p>
              </td>
            </tr>
            <tr>
              <td style="vertical-align:top;padding-right:12px;">
                <div style="width:28px;height:28px;border-radius:50%;background:#19345c;color:#FCB002;font-weight:800;font-size:13px;text-align:center;line-height:28px;">3</div>
              </td>
              <td>
                <p style="margin:0;font-size:14px;color:#19345c;line-height:1.5;">Tapez <strong style="font-family:monospace;background:#fff3cc;padding:2px 6px;border-radius:4px;">/ads-google</strong> dans n'importe quelle conversation Claude</p>
              </td>
            </tr>
          </table>
        </td></tr>

        <tr><td style="padding:24px 0 0;">
          <div style="background:#f8f8f8;border-radius:12px;padding:16px 20px;">
            <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#19345c;">Aller plus loin</p>
            <p style="margin:0;font-size:13px;color:#19345c;opacity:0.75;line-height:1.6;">Connectez Claude directement à votre compte Google Ads avec le MCP officiel : <a href="https://github.com/googleads/google-ads-mcp" style="color:#19345c;font-weight:700;">github.com/googleads/google-ads-mcp</a></p>
          </div>
        </td></tr>

        <tr><td style="padding:32px 0;text-align:center;">
          <p style="margin:0 0 16px;font-size:14px;color:#19345c;opacity:0.7;">Une question ? Besoin d'un audit humain de vos campagnes ?</p>
          <a href="https://lutie.fr" style="display:inline-block;background:#19345c;color:#FCB002;font-weight:800;font-size:15px;text-decoration:none;padding:14px 32px;border-radius:999px;">Contacter Lutie →</a>
        </td></tr>

        <tr><td style="border-top:1px solid #eeeeee;padding-top:24px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#999999;">Skill créé par <a href="https://lutie.fr" style="color:#999999;">Lutie</a> — Agence Google Ads</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'Lutie', email: 'hello@lutie.fr' },
      to: [{ email: email.trim().toLowerCase(), name: name.trim() }],
      subject: `${firstName}, votre Skill Google Ads pour Claude ☀️`,
      htmlContent: html,
      tags: ['skill-lutie-fr'],
    }),
  });

  if (!brevoRes.ok) {
    const err = await brevoRes.text();
    console.error('Brevo error:', err);
    return res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.' });
  }

  return res.status(200).json({ success: true });
}
