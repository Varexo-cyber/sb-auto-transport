import nodemailer from "nodemailer";

export default async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { vehicle, formData } = JSON.parse(event.body);

    // Email configuration
    const RECIPIENT_EMAILS = ["info@directautohulp.nl", "info@varexo.nl"];

    const formatDate = new Date().toLocaleString("nl-NL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const verkopenAanMap = {
      particulier: "Particulier",
      dealer: "Dealer",
      geen_voorkeur: "Geen voorkeur",
    };
    const verkopenAanText = verkopenAanMap[formData.verkoopAan] || "Geen voorkeur";

    const termijnMap = {
      direct: "Direct / Zo snel mogelijk",
      "4_weken": "Binnen 4 weken",
      "3_maanden": "Binnen 3 maanden",
      geen_verkoop: "Alleen waarde check (geen verkoop)",
    };
    const termijnText = termijnMap[formData.verkoopTermijn] || "Direct";

    // Transporter 1: Voor interne meldingen (info@varexo.nl)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Transporter 2: Voor klant bevestiging (info@directautohulp.nl via Zoho)
    const zohoTransporter = nodemailer.createTransport({
      host: process.env.ZOHO_SMTP_HOST || "smtp.zoho.eu",
      port: parseInt(process.env.ZOHO_SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.ZOHO_SMTP_USER || "info@directautohulp.nl",
        pass: process.env.ZOHO_SMTP_PASS,
      },
    });

    const emailSubject = `Nieuwe Auto Verkoop Aanvraag - ${vehicle.merk} ${vehicle.handelsbenaming}`;

    // Plain text version
    const emailText = `
NIEUWE AUTO VERKOOP AANVRAAG
============================

VOERTUIG GEGEVENS
-----------------
Merk: ${vehicle.merk}
Model: ${vehicle.handelsbenaming}
Kenteken: ${vehicle.kenteken}
Kleur: ${vehicle.eerste_kleur}
Brandstof: ${vehicle.brandstof_omschrijving || "Onbekend"}
Kilometerstand: ${formData.kilometerstand} km
${vehicle.catalogusprijs ? `Catalogusprijs (nieuw): €${parseInt(vehicle.catalogusprijs).toLocaleString("nl-NL")}` : ""}

KLANT GEGEVENS
--------------
Naam: ${formData.naam}
Email: ${formData.email}
Telefoon: ${formData.telefoon}

VERKOOP VOORKEUREN
------------------
Verkopen aan: ${verkopenAanText}
Termijn: ${termijnText}

ACTIE VEREIST
-------------
Neem binnen 30 minuten contact op met de klant!

---
DirectAutoHulp Verkoop Systeem
Datum: ${formatDate}
    `.trim();

    // 1. Send internal notification to team
    await transporter.sendMail({
      from: `"DirectAutoHulp Verkoop" <${process.env.SMTP_USER}>`,
      to: RECIPIENT_EMAILS,
      subject: emailSubject,
      text: emailText,
    });

    // 2. Send confirmation email to customer
    const customerEmailHtml = `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bedankt voor uw aanmelding - DirectAutoHulp</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f3f4f6;
            line-height: 1.6;
            color: #1f2937;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            padding: 40px 30px;
            text-align: center;
        }
        .logo {
            font-size: 28px;
            font-weight: 800;
            color: white;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
        }
        .tagline {
            font-size: 14px;
            color: rgba(255,255,255,0.9);
            font-weight: 500;
        }
        .success-icon {
            width: 80px;
            height: 80px;
            background: white;
            border-radius: 50%;
            margin: -40px auto 0;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
            position: relative;
            z-index: 10;
        }
        .success-icon svg {
            width: 40px;
            height: 40px;
            color: #10b981;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 24px;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 8px;
            text-align: center;
        }
        .intro {
            font-size: 16px;
            color: #6b7280;
            text-align: center;
            margin-bottom: 30px;
        }
        .car-card {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 30px;
            border: 1px solid #bbf7d0;
        }
        .car-title {
            font-size: 20px;
            font-weight: 700;
            color: #166534;
            margin-bottom: 12px;
        }
        .car-detail {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #bbf7d0;
            font-size: 15px;
        }
        .car-detail:last-child {
            border-bottom: none;
        }
        .car-label {
            color: #15803d;
            font-weight: 500;
        }
        .car-value {
            color: #166534;
            font-weight: 600;
        }
        .timeline {
            background: #f9fafb;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 30px;
        }
        .timeline-title {
            font-size: 16px;
            font-weight: 700;
            color: #374151;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .timeline-item {
            display: flex;
            gap: 16px;
            margin-bottom: 16px;
        }
        .timeline-item:last-child {
            margin-bottom: 0;
        }
        .timeline-dot {
            width: 12px;
            height: 12px;
            background: #10b981;
            border-radius: 50%;
            flex-shrink: 0;
            margin-top: 4px;
        }
        .timeline-content {
            font-size: 14px;
            color: #4b5563;
        }
        .timeline-content strong {
            color: #1f2937;
            display: block;
            margin-bottom: 2px;
        }
        .contact-box {
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            border-radius: 12px;
            padding: 24px;
            text-align: center;
            border: 1px solid #bfdbfe;
        }
        .contact-title {
            font-size: 18px;
            font-weight: 700;
            color: #1e40af;
            margin-bottom: 8px;
        }
        .contact-text {
            font-size: 14px;
            color: #3b82f6;
            margin-bottom: 16px;
        }
        .contact-phone {
            font-size: 24px;
            font-weight: 800;
            color: #1e40af;
            text-decoration: none;
            display: inline-block;
        }
        .footer {
            background: #1f2937;
            color: white;
            padding: 30px;
            text-align: center;
        }
        .footer-logo {
            font-size: 20px;
            font-weight: 800;
            margin-bottom: 8px;
        }
        .footer-text {
            font-size: 13px;
            color: #9ca3af;
            margin-bottom: 16px;
        }
        .social-links {
            display: flex;
            justify-content: center;
            gap: 16px;
            margin-top: 16px;
        }
        .social-link {
            width: 40px;
            height: 40px;
            background: rgba(255,255,255,0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-decoration: none;
            font-size: 18px;
        }
        @media (max-width: 480px) {
            .container {
                margin: 0;
                border-radius: 0;
            }
            .content {
                padding: 24px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">DirectAutoHulp</div>
            <div class="tagline">Professioneel Auto Transport & Inkoop</div>
        </div>
        
        <div class="success-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
            </svg>
        </div>
        
        <div class="content">
            <div class="greeting">Bedankt, ${formData.naam}!</div>
            <div class="intro">Uw aanvraag is succesvol ontvangen. We gaan direct voor u aan de slag.</div>
            
            <div class="car-card">
                <div class="car-title">${vehicle.merk} ${vehicle.handelsbenaming}</div>
                <div class="car-detail">
                    <span class="car-label">Kenteken</span>
                    <span class="car-value">${vehicle.kenteken}</span>
                </div>
                <div class="car-detail">
                    <span class="car-label">Kleur</span>
                    <span class="car-value">${vehicle.eerste_kleur}</span>
                </div>
                <div class="car-detail">
                    <span class="car-label">Kilometerstand</span>
                    <span class="car-value">${parseInt(formData.kilometerstand).toLocaleString("nl-NL")} km</span>
                </div>
                <div class="car-detail">
                    <span class="car-label">Gewenste termijn</span>
                    <span class="car-value">${termijnText}</span>
                </div>
            </div>
            
            <div class="timeline">
                <div class="timeline-title">
                    <span style="font-size: 20px;">📋</span>
                    Wat kunt u verwachten?
                </div>
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <strong>Direct contact</strong>
                        We bellen u binnen 30 minuten voor een korte intake.
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <strong>Persoonlijk bod</strong>
                        Binnen 1-2 uur ontvangt u een eerlijk bod op uw auto.
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <strong>Snelle afhandeling</strong>
                        Bij akkoord: direct geld op uw rekening!
                    </div>
                </div>
            </div>
            
            <div class="contact-box">
                <div class="contact-title">Vragen? Bel ons!</div>
                <div class="contact-text">We zijn 24/7 bereikbaar voor al uw vragen.</div>
                <a href="tel:+31612345948" class="contact-phone">+31 6 12345948</a>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-logo">DirectAutoHulp</div>
            <div class="footer-text">
                Professioneel auto transport, inkoop & pechhulp<br>
                Door heel Europa | 24/7 Bereikbaar
            </div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 16px;">
                Deze email is verzonden op ${formatDate}
            </div>
        </div>
    </div>
</body>
</html>
    `;

    const customerEmailText = `
Bedankt voor uw aanmelding, ${formData.naam}!

Uw aanvraag is succesvol ontvangen. We gaan direct voor u aan de slag.

UW AUTO
-------
Merk: ${vehicle.merk} ${vehicle.handelsbenaming}
Kenteken: ${vehicle.kenteken}
Kleur: ${vehicle.eerste_kleur}
Kilometerstand: ${parseInt(formData.kilometerstand).toLocaleString("nl-NL")} km
Gewenste termijn: ${termijnText}

WAT KUNT U VERWACHTEN?
------------------------
1. Direct contact - We bellen u binnen 30 minuten
2. Persoonlijk bod - Binnen 1-2 uur ontvangt u een eerlijk bod
3. Snelle afhandeling - Bij akkoord: direct geld op uw rekening!

VRAGEN?
-------
Bel ons: +31 6 12345948
We zijn 24/7 bereikbaar!

Met vriendelijke groet,
Team DirectAutoHulp
www.directautohulp.nl
    `.trim();

    await zohoTransporter.sendMail({
      from: `"DirectAutoHulp" <${process.env.ZOHO_SMTP_USER || "info@directautohulp.nl"}>`,
      to: formData.email,
      subject: `Bedankt voor uw aanmelding - ${vehicle.merk} ${vehicle.handelsbenaming}`,
      html: customerEmailHtml,
      text: customerEmailText,
    });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({
        success: true,
        message: "Verzoek verwerkt en email verstuurd",
        recipients: RECIPIENT_EMAILS,
      }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: error.message }),
    };
  }
};
