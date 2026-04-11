// @ts-nocheck
import nodemailer from "nodemailer";

export default async (request, context) => {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  let vehicle, formData, schadeFotos;

  try {
    const body = await request.json();
    vehicle = body.vehicle;
    formData = body.formData;
    schadeFotos = body.schadeFotos || [];
  } catch (e) {
    return new Response(
      JSON.stringify({ success: false, message: "Ongeldige data" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const RECIPIENT_EMAILS = ["info@directautohulp.nl", "info@varexo.nl"];

  const formatDate = new Date().toLocaleString("nl-NL", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  const verkopenAanMap = {
    particulier: "Particulier", dealer: "Dealer", geen_voorkeur: "Geen voorkeur",
  };
  const verkopenAanText = verkopenAanMap[formData.verkoopAan] || "Geen voorkeur";

  const termijnMap = {
    direct: "Direct / Zo snel mogelijk", "4_weken": "Binnen 4 weken",
    "3_maanden": "Binnen 3 maanden", geen_verkoop: "Alleen waarde check",
  };
  const termijnText = termijnMap[formData.verkoopTermijn] || "Direct";

  const emailSubject = "Nieuwe Auto Verkoop Aanvraag - " + vehicle.merk + " " + vehicle.handelsbenaming;

  const schadeText = formData.schade === "ja"
    ? "JA - " + (formData.schadeOmschrijving || "Geen omschrijving")
    : "Nee, geen schade";

  const emailLines = [
    "NIEUWE AUTO VERKOOP AANVRAAG",
    "============================",
    "",
    "VOERTUIG GEGEVENS",
    "-----------------",
    "Merk: " + vehicle.merk,
    "Model: " + vehicle.handelsbenaming,
    "Kenteken: " + vehicle.kenteken,
    "Kleur: " + vehicle.eerste_kleur,
    "Bouwjaar: " + (formData.bouwjaar || "Onbekend"),
    "Brandstof: " + (formData.brandstof || vehicle.brandstof_omschrijving || "Onbekend"),
    "Transmissie: " + (formData.transmissie || "Onbekend"),
    "Kilometerstand: " + formData.kilometerstand + " km",
    "",
    "SCHADE",
    "------",
    "Schade: " + schadeText,
  ];

  if (schadeFotos.length > 0) {
    emailLines.push("Aantal schade foto's: " + schadeFotos.length + " (zie bijlagen)");
  }

  emailLines.push(
    "",
    "KLANT GEGEVENS",
    "--------------",
    "Naam: " + formData.naam,
    "Email: " + formData.email,
    "Telefoon: " + formData.telefoon,
    "",
    "VERKOOP VOORKEUREN",
    "------------------",
    "Verkopen aan: " + verkopenAanText,
    "Termijn: " + termijnText,
    "",
    "ACTIE VEREIST - Bel binnen 30 min!",
    "Datum: " + formatDate,
  );

  const emailText = emailLines.join("\n");

  // Zoho transporter (bewezen werkend)
  const zohoUser = process.env.ZOHO_SMTP_USER || "info@directautohulp.nl";
  const zoho = nodemailer.createTransport({
    host: process.env.ZOHO_SMTP_HOST || "smtp.zoho.eu",
    port: parseInt(process.env.ZOHO_SMTP_PORT || "587"),
    secure: false,
    auth: { user: zohoUser, pass: process.env.ZOHO_SMTP_PASS },
  });

  // Foto bijlagen voorbereiden
  const attachments = schadeFotos.map(function(foto, i) {
    const matches = foto.data.match(/^data:(.+);base64,(.+)$/);
    if (matches) {
      return { filename: foto.name || ("schade_" + (i + 1) + ".jpg"), content: matches[2], encoding: "base64" };
    }
    return null;
  }).filter(Boolean);

  // 1. Team notificatie naar info@directautohulp.nl + info@varexo.nl
  try {
    await zoho.sendMail({
      from: '"DirectAutoHulp Verkoop" <' + zohoUser + '>',
      to: RECIPIENT_EMAILS,
      subject: emailSubject,
      text: emailText,
      attachments: attachments,
    });
    console.log("Team email OK");
  } catch (err) {
    console.error("Team email fout:", err.message);
  }

  // 2. Klant bevestiging vanuit info@directautohulp.nl
  try {
    const logoUrl = "https://directautohulp.nl/Logo.png";
    const customerHtml = [
      '<!DOCTYPE html><html><head><meta charset="UTF-8"></head>',
      '<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f3f4f6;">',
      '<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;"><tr><td align="center">',
      '<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;">',

      // HEADER
      '<tr><td style="background:linear-gradient(135deg,#10b981,#059669);padding:40px;text-align:center;">',
      '<div style="font-size:28px;font-weight:800;color:#fff;margin-bottom:4px;">DirectAutoHulp</div>',
      '<div style="font-size:14px;color:rgba(255,255,255,0.9);">Professioneel Auto Transport &amp; Inkoop</div>',
      '</td></tr>',

      // CONTENT
      '<tr><td style="padding:40px;">',

      // Greeting
      '<div style="text-align:center;margin-bottom:24px;">',
      '<div style="font-size:24px;font-weight:700;color:#1f2937;margin-bottom:8px;">Bedankt, ' + formData.naam + '!</div>',
      '<div style="font-size:16px;color:#6b7280;">Uw aanvraag is succesvol ontvangen. We gaan direct voor u aan de slag.</div>',
      '</div>',

      // Car card
      '<table width="100%" cellpadding="16" cellspacing="0" style="background:#f0fdf4;border-radius:12px;border:1px solid #bbf7d0;margin-bottom:24px;">',
      '<tr><td>',
      '<div style="font-size:20px;font-weight:700;color:#166534;margin-bottom:12px;">' + vehicle.merk + ' ' + vehicle.handelsbenaming + '</div>',
      '<div style="padding:8px 0;border-bottom:1px solid #bbf7d0;"><span style="color:#15803d;">Kenteken:</span> <strong>' + vehicle.kenteken + '</strong></div>',
      '<div style="padding:8px 0;border-bottom:1px solid #bbf7d0;"><span style="color:#15803d;">Bouwjaar:</span> <strong>' + (formData.bouwjaar || "Onbekend") + '</strong></div>',
      '<div style="padding:8px 0;border-bottom:1px solid #bbf7d0;"><span style="color:#15803d;">Kleur:</span> <strong>' + vehicle.eerste_kleur + '</strong></div>',
      '<div style="padding:8px 0;border-bottom:1px solid #bbf7d0;"><span style="color:#15803d;">Brandstof:</span> <strong>' + (formData.brandstof || "Onbekend") + '</strong></div>',
      '<div style="padding:8px 0;border-bottom:1px solid #bbf7d0;"><span style="color:#15803d;">Transmissie:</span> <strong>' + (formData.transmissie || "Onbekend") + '</strong></div>',
      '<div style="padding:8px 0;border-bottom:1px solid #bbf7d0;"><span style="color:#15803d;">Kilometerstand:</span> <strong>' + formData.kilometerstand + ' km</strong></div>',
      '<div style="padding:8px 0;border-bottom:1px solid #bbf7d0;"><span style="color:#15803d;">Schade:</span> <strong>' + (formData.schade === "ja" ? "Ja" : "Nee") + '</strong></div>',
      formData.schade === "ja" ? '<div style="padding:8px 0;border-bottom:1px solid #bbf7d0;"><span style="color:#15803d;">Schade omschrijving:</span> <strong>' + (formData.schadeOmschrijving || "-") + '</strong></div>' : '',
      '<div style="padding:8px 0;"><span style="color:#15803d;">Termijn:</span> <strong>' + termijnText + '</strong></div>',
      '</td></tr></table>',

      // Timeline
      '<table width="100%" cellpadding="16" cellspacing="0" style="background:#f9fafb;border-radius:12px;margin-bottom:24px;">',
      '<tr><td>',
      '<div style="font-weight:700;color:#374151;margin-bottom:12px;">Wat kunt u verwachten?</div>',
      '<div style="margin-bottom:8px;color:#4b5563;"><strong>1. Direct contact</strong> - We bellen u binnen 30 minuten</div>',
      '<div style="margin-bottom:8px;color:#4b5563;"><strong>2. Persoonlijk bod</strong> - Binnen 1-2 uur een eerlijk bod</div>',
      '<div style="color:#4b5563;"><strong>3. Snelle afhandeling</strong> - Bij akkoord: direct geld!</div>',
      '</td></tr></table>',

      // Contact box
      '<table width="100%" cellpadding="24" cellspacing="0" style="background:#eff6ff;border-radius:12px;border:1px solid #bfdbfe;text-align:center;margin-bottom:24px;">',
      '<tr><td>',
      '<div style="font-size:18px;font-weight:700;color:#1e40af;margin-bottom:12px;">Vragen? Neem contact op!</div>',
      '<div style="margin-bottom:12px;">',
      '<a href="tel:+31612345948" style="font-size:22px;font-weight:800;color:#1e40af;text-decoration:none;">+31 6 12345948</a>',
      '</div>',
      '<div style="margin-bottom:8px;">',
      '<a href="mailto:info@directautohulp.nl" style="font-size:15px;color:#3b82f6;text-decoration:none;font-weight:600;">info@directautohulp.nl</a>',
      '</div>',
      '<div>',
      '<a href="https://directautohulp.nl" style="font-size:14px;color:#3b82f6;text-decoration:underline;">www.directautohulp.nl</a>',
      '</div>',
      '</td></tr></table>',

      '</td></tr>',

      // FOOTER
      '<tr><td style="background:#1f2937;padding:40px 30px;text-align:center;">',

      // Logo
      '<img src="' + logoUrl + '" alt="DirectAutoHulp" width="160" style="display:block;margin:0 auto 16px;max-width:160px;" />',

      // Tagline
      '<div style="font-size:14px;color:#d1d5db;margin-bottom:20px;">Professioneel auto transport, inkoop &amp; pechhulp<br>Door heel Europa | 24/7 Bereikbaar</div>',

      // Divider
      '<div style="width:60px;height:2px;background:#10b981;margin:0 auto 20px;"></div>',

      // Contact in footer
      '<div style="margin-bottom:16px;">',
      '<a href="tel:+31612345948" style="color:#10b981;text-decoration:none;font-weight:600;font-size:15px;">+31 6 12345948</a>',
      '<span style="color:#4b5563;margin:0 8px;">|</span>',
      '<a href="mailto:info@directautohulp.nl" style="color:#10b981;text-decoration:none;font-weight:600;font-size:15px;">info@directautohulp.nl</a>',
      '</div>',

      // Website link
      '<div style="margin-bottom:20px;">',
      '<a href="https://directautohulp.nl" style="display:inline-block;padding:10px 28px;background:#10b981;color:#fff;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">Bezoek onze website</a>',
      '</div>',

      // BTW + KVK
      '<div style="font-size:12px;color:#6b7280;line-height:1.8;">',
      '<span style="color:#9ca3af;">BTW:</span> NL005332380B82',
      '<span style="color:#4b5563;margin:0 8px;">|</span>',
      '<span style="color:#9ca3af;">KVK:</span> 98448803',
      '</div>',

      '<div style="font-size:11px;color:#4b5563;margin-top:12px;">&copy; ' + new Date().getFullYear() + ' DirectAutoHulp. Alle rechten voorbehouden.</div>',

      '</td></tr>',
      '</table>',
      '</td></tr></table>',
      '</body></html>'
    ].join('');

    const zohoFrom = process.env.ZOHO_SMTP_USER || "info@directautohulp.nl";
    await zoho.sendMail({
      from: '"DirectAutoHulp" <' + zohoFrom + '>',
      to: formData.email,
      subject: "Bedankt voor uw aanmelding - " + vehicle.merk + " " + vehicle.handelsbenaming,
      html: customerHtml,
      text: "Bedankt " + formData.naam + "! Uw aanvraag voor " + vehicle.merk + " " + vehicle.handelsbenaming + " (" + vehicle.kenteken + ") is ontvangen. We bellen u binnen 30 minuten. Bel: +31 6 12345948 | Mail: info@directautohulp.nl | Web: directautohulp.nl | BTW: NL005332380B82 | KVK: 98448803 | Team DirectAutoHulp",
    });
    console.log("Klant email OK");
  } catch (err) {
    console.error("Klant email fout:", err.message);
  }

  // Always return success
  return new Response(
    JSON.stringify({ success: true, message: "Verzoek verwerkt", recipients: RECIPIENT_EMAILS }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};

export const config = {
  path: "/.netlify/functions/send-verkoop",
};
