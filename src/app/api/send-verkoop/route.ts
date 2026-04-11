import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Email configuration
const RECIPIENT_EMAILS = ["info@directautohulp.nl", "info@varexo.nl"];

// Create SMTP transporter
// Gebruik je eigen mailserver (bijv. van je hosting provider)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.yourhost.com", // Vervang met je SMTP server
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true voor 465, false voor andere ports
  auth: {
    user: process.env.SMTP_USER || "info@directautohulp.nl", // Je email adres
    pass: process.env.SMTP_PASS || "je-wachtwoord", // Je wachtwoord of app-specifiek wachtwoord
  },
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const {
      vehicle,
      formData,
    } = data;

    // Format the email content
    const emailSubject = `Nieuwe Auto Verkoop Aanvraag - ${vehicle.merk} ${vehicle.handelsbenaming}`;
    
    const formatDate = new Date().toLocaleString("nl-NL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const verkopenAanMap: Record<string, string> = {
      particulier: "Particulier",
      dealer: "Dealer",
      geen_voorkeur: "Geen voorkeur",
    };
    const verkopenAanText = verkopenAanMap[formData.verkoopAan] || "Geen voorkeur";

    const termijnMap: Record<string, string> = {
      direct: "Direct / Zo snel mogelijk",
      "4_weken": "Binnen 4 weken",
      "3_maanden": "Binnen 3 maanden",
      geen_verkoop: "Alleen waarde check (geen verkoop)",
    };
    const termijnText = termijnMap[formData.verkoopTermijn] || "Direct";

    // Beautiful HTML Email Template
    const emailHtml = `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nieuwe Auto Verkoop Aanvraag</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            line-height: 1.6;
            color: #1a202c;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        .header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
        }
        .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        .header p {
            font-size: 16px;
            opacity: 0.9;
        }
        .urgent-badge {
            display: inline-block;
            background: #ef4444;
            color: white;
            padding: 8px 20px;
            border-radius: 50px;
            font-size: 13px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-top: 20px;
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        .content {
            padding: 30px;
        }
        .section {
            background: #f8fafc;
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 24px;
            border-left: 4px solid #10b981;
        }
        .section-title {
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #10b981;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .car-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 12px;
            margin-bottom: 20px;
        }
        .car-placeholder {
            width: 100%;
            height: 200px;
            background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
        }
        .car-name {
            font-size: 24px;
            font-weight: 700;
            color: #1a202c;
            margin-bottom: 4px;
        }
        .car-plate {
            display: inline-block;
            background: #1a202c;
            color: white;
            padding: 6px 16px;
            border-radius: 8px;
            font-family: monospace;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 16px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
        }
        .info-item {
            background: white;
            padding: 12px 16px;
            border-radius: 10px;
            border: 1px solid #e2e8f0;
        }
        .info-label {
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            color: #64748b;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
        }
        .info-value {
            font-size: 15px;
            font-weight: 600;
            color: #1a202c;
        }
        .price-tag {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 20px 24px;
            border-radius: 12px;
            text-align: center;
            margin-top: 16px;
        }
        .price-label {
            font-size: 12px;
            font-weight: 500;
            opacity: 0.9;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .price-value {
            font-size: 32px;
            font-weight: 700;
            margin-top: 4px;
        }
        .contact-card {
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            color: white;
            padding: 24px;
            border-radius: 16px;
            margin-top: 24px;
        }
        .contact-title {
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            opacity: 0.9;
            margin-bottom: 12px;
        }
        .contact-name {
            font-size: 22px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        .contact-detail {
            font-size: 16px;
            margin-bottom: 4px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .preferences {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .preference-item {
            background: white;
            padding: 16px;
            border-radius: 10px;
            border: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .preference-label {
            font-size: 13px;
            color: #64748b;
            font-weight: 500;
        }
        .preference-value {
            font-size: 14px;
            font-weight: 600;
            color: #1a202c;
        }
        .action-box {
            background: #fef3c7;
            border: 2px solid #f59e0b;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            margin-top: 24px;
        }
        .action-title {
            font-size: 16px;
            font-weight: 700;
            color: #92400e;
            margin-bottom: 8px;
        }
        .action-text {
            font-size: 14px;
            color: #a16207;
        }
        .footer {
            background: #1a202c;
            color: white;
            padding: 24px 30px;
            text-align: center;
        }
        .footer-logo {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        .footer-text {
            font-size: 12px;
            color: #94a3b8;
        }
        .timestamp {
            font-size: 12px;
            color: #64748b;
            text-align: center;
            margin-top: 16px;
            padding-top: 16px;
            border-top: 1px solid #e2e8f0;
        }
        @media (max-width: 480px) {
            .info-grid {
                grid-template-columns: 1fr;
            }
            .container {
                margin: 0;
                border-radius: 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Nieuwe Verkoop Aanvraag</h1>
            <p>Er is een nieuw verzoek binnengekomen via de website</p>
            <div class="urgent-badge">Actie Vereist - Bel binnen 30 min!</div>
        </div>
        
        <div class="content">
            <!-- Voertuig Details -->
            <div class="section">
                <div class="section-title">Voertuig Details</div>
                
                ${vehicle.image ? `<img src="${vehicle.image}" alt="${vehicle.merk} ${vehicle.handelsbenaming}" class="car-image">` : `<div class="car-placeholder"><svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="1.5"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 002 9v8c0 .6.4 1 1 1h1M19 17H8M8 17v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3M8 17v-3m6 3v-2a2 2 0 00-2-2h-3m0 0a2 2 0 00-2 2v2m2-2h3"></path></svg></div>`}
                
                <div class="car-name">${vehicle.merk} ${vehicle.handelsbenaming}</div>
                <div class="car-plate">${vehicle.kenteken}</div>
                
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Kleur</div>
                        <div class="info-value">${vehicle.eerste_kleur}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Brandstof</div>
                        <div class="info-value">${vehicle.brandstof_omschrijving || "Onbekend"}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Kilometerstand</div>
                        <div class="info-value">${parseInt(formData.kilometerstand).toLocaleString("nl-NL")} km</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Catalogusprijs</div>
                        <div class="info-value">${vehicle.catalogusprijs ? "€" + parseInt(vehicle.catalogusprijs).toLocaleString("nl-NL") : "Niet beschikbaar"}</div>
                    </div>
                </div>
                
                ${vehicle.catalogusprijs ? `
                <div class="price-tag">
                    <div class="price-label">Nieuwprijs (catalogus)</div>
                    <div class="price-value">€${parseInt(vehicle.catalogusprijs).toLocaleString("nl-NL")}</div>
                </div>
                ` : ""}
            </div>
            
            <!-- Klant Gegevens -->
            <div class="section" style="border-left-color: #3b82f6;">
                <div class="section-title" style="color: #3b82f6;">Klant Gegevens</div>
                
                <div class="contact-card">
                    <div class="contact-title">Contactpersoon</div>
                    <div class="contact-name">${formData.naam}</div>
                    <div class="contact-detail">${formData.email}</div>
                    <div class="contact-detail" style="font-size: 20px; font-weight: 700; margin-top: 8px;">${formData.telefoon}</div>
                </div>
            </div>
            
            <!-- Voorkeuren -->
            <div class="section" style="border-left-color: #8b5cf6;">
                <div class="section-title" style="color: #8b5cf6;">Verkoop Voorkeuren</div>
                
                <div class="preferences">
                    <div class="preference-item">
                        <span class="preference-label">Verkopen aan</span>
                        <span class="preference-value">${verkopenAanText}</span>
                    </div>
                    <div class="preference-item">
                        <span class="preference-label">Gewenste termijn</span>
                        <span class="preference-value">${termijnText}</span>
                    </div>
                </div>
            </div>
            
            <!-- Actie Box -->
            <div class="action-box">
                <div class="action-title">Directe Actie Vereist!</div>
                <div class="action-text">
                    Deze klant verwacht contact binnen <strong>30 minuten</strong>. 
                    Bel nu om een afspraak te maken voor een vrijblijvende taxatie!
                </div>
            </div>
            
            <div class="timestamp">
                Aanvraag ontvangen op: ${formatDate}
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-logo">DirectAutoHulp</div>
            <div class="footer-text">
                Professioneel auto transport, inkoop & pechhulp<br>
                www.directautohulp.nl | info@directautohulp.nl
            </div>
        </div>
    </div>
</body>
</html>
    `;

    // Plain text version as fallback
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

    // Send email via NodeMailer SMTP
    try {
      await transporter.sendMail({
        from: `"DirectAutoHulp Verkoop" <${process.env.SMTP_USER || "info@directautohulp.nl"}>`,
        to: RECIPIENT_EMAILS,
        subject: emailSubject,
        html: emailHtml,
        text: emailText,
      });
      
      console.log("✅ Email succesvol verstuurd via SMTP naar:", RECIPIENT_EMAILS.join(", "));
    } catch (emailError) {
      console.error("❌ Email verzenden mislukt:", emailError);
      // Continue anyway - we don't want to block the user
    }

    return NextResponse.json({ 
      success: true, 
      message: "Verzoek verwerkt en email verstuurd",
      recipients: RECIPIENT_EMAILS,
    });

  } catch (error) {
    console.error("Error processing verkoop request:", error);
    return NextResponse.json(
      { success: false, message: "Er ging iets mis" },
      { status: 500 }
    );
  }
}
