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

  let vehicle, formData;

  try {
    const body = await request.json();
    vehicle = body.vehicle;
    formData = body.formData;
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

  const emailText = [
    "NIEUWE AUTO VERKOOP AANVRAAG",
    "============================",
    "",
    "Merk: " + vehicle.merk,
    "Model: " + vehicle.handelsbenaming,
    "Kenteken: " + vehicle.kenteken,
    "Kleur: " + vehicle.eerste_kleur,
    "Brandstof: " + (vehicle.brandstof_omschrijving || "Onbekend"),
    "Kilometerstand: " + formData.kilometerstand + " km",
    "",
    "KLANT GEGEVENS",
    "Naam: " + formData.naam,
    "Email: " + formData.email,
    "Telefoon: " + formData.telefoon,
    "",
    "Verkopen aan: " + verkopenAanText,
    "Termijn: " + termijnText,
    "",
    "ACTIE VEREIST - Bel binnen 30 min!",
    "Datum: " + formatDate,
  ].join("\n");

  // Zoho transporter (bewezen werkend)
  const zohoUser = process.env.ZOHO_SMTP_USER || "info@directautohulp.nl";
  const zoho = nodemailer.createTransport({
    host: process.env.ZOHO_SMTP_HOST || "smtp.zoho.eu",
    port: parseInt(process.env.ZOHO_SMTP_PORT || "587"),
    secure: false,
    auth: { user: zohoUser, pass: process.env.ZOHO_SMTP_PASS },
  });

  // 1. Team notificatie naar info@directautohulp.nl + info@varexo.nl
  try {
    await zoho.sendMail({
      from: '"DirectAutoHulp Verkoop" <' + zohoUser + '>',
      to: RECIPIENT_EMAILS,
      subject: emailSubject,
      text: emailText,
    });
    console.log("Team email OK");
  } catch (err) {
    console.error("Team email fout:", err.message);
  }

  // 2. Klant bevestiging vanuit info@directautohulp.nl
  try {
    if (zoho) {

      const customerHtml = '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f3f4f6;"><table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;"><tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;"><tr><td style="background:linear-gradient(135deg,#10b981,#059669);padding:40px;text-align:center;"><div style="font-size:28px;font-weight:800;color:#fff;">DirectAutoHulp</div><div style="font-size:14px;color:rgba(255,255,255,0.9);">Professioneel Auto Transport &amp; Inkoop</div></td></tr><tr><td style="padding:40px;"><div style="text-align:center;margin-bottom:24px;"><div style="font-size:24px;font-weight:700;color:#1f2937;margin-bottom:8px;">Bedankt, ' + formData.naam + '!</div><div style="font-size:16px;color:#6b7280;">Uw aanvraag is succesvol ontvangen.</div></div><table width="100%" cellpadding="16" cellspacing="0" style="background:#f0fdf4;border-radius:12px;border:1px solid #bbf7d0;margin-bottom:24px;"><tr><td><div style="font-size:20px;font-weight:700;color:#166534;margin-bottom:12px;">' + vehicle.merk + ' ' + vehicle.handelsbenaming + '</div><div style="padding:8px 0;border-bottom:1px solid #bbf7d0;"><span style="color:#15803d;">Kenteken:</span> <strong>' + vehicle.kenteken + '</strong></div><div style="padding:8px 0;border-bottom:1px solid #bbf7d0;"><span style="color:#15803d;">Kleur:</span> <strong>' + vehicle.eerste_kleur + '</strong></div><div style="padding:8px 0;border-bottom:1px solid #bbf7d0;"><span style="color:#15803d;">Kilometerstand:</span> <strong>' + formData.kilometerstand + ' km</strong></div><div style="padding:8px 0;"><span style="color:#15803d;">Termijn:</span> <strong>' + termijnText + '</strong></div></td></tr></table><table width="100%" cellpadding="16" cellspacing="0" style="background:#f9fafb;border-radius:12px;margin-bottom:24px;"><tr><td><div style="font-weight:700;color:#374151;margin-bottom:12px;">Wat kunt u verwachten?</div><div style="margin-bottom:8px;color:#4b5563;"><strong>1. Direct contact</strong> - We bellen u binnen 30 minuten</div><div style="margin-bottom:8px;color:#4b5563;"><strong>2. Persoonlijk bod</strong> - Binnen 1-2 uur een eerlijk bod</div><div style="color:#4b5563;"><strong>3. Snelle afhandeling</strong> - Bij akkoord: direct geld!</div></td></tr></table><table width="100%" cellpadding="20" cellspacing="0" style="background:#eff6ff;border-radius:12px;border:1px solid #bfdbfe;text-align:center;"><tr><td><div style="font-size:18px;font-weight:700;color:#1e40af;margin-bottom:8px;">Vragen? Bel ons!</div><a href="tel:+31612345948" style="font-size:24px;font-weight:800;color:#1e40af;text-decoration:none;">+31 6 12345948</a></td></tr></table></td></tr><tr><td style="background:#1f2937;padding:30px;text-align:center;"><div style="font-size:20px;font-weight:800;color:#fff;margin-bottom:8px;">DirectAutoHulp</div><div style="font-size:13px;color:#9ca3af;">Professioneel auto transport, inkoop &amp; pechhulp</div></td></tr></table></td></tr></table></body></html>';

      const zohoFrom = process.env.ZOHO_SMTP_USER || "info@directautohulp.nl";
      await zoho.sendMail({
        from: '"DirectAutoHulp" <' + zohoFrom + '>',
        to: formData.email,
        subject: "Bedankt voor uw aanmelding - " + vehicle.merk + " " + vehicle.handelsbenaming,
        html: customerHtml,
        text: "Bedankt " + formData.naam + "! Uw aanvraag voor " + vehicle.merk + " " + vehicle.handelsbenaming + " (" + vehicle.kenteken + ") is ontvangen. We bellen u binnen 30 minuten. Team DirectAutoHulp",
      });
      console.log("Klant email OK");
    } else {
      console.log("Zoho SMTP niet ingesteld");
    }
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
