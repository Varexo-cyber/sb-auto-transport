import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto Verkopen | Vul Gegevens In & Ontvang Direct Een Bod",
  description: "Verkoop uw auto snel en eenvoudig via DirectAutoHulp. Vul uw gegevens in, ontvang binnen 1-2 uur een persoonlijk bod. Geen verplichtingen, beste prijs gegarandeerd!",
  keywords: [
    "auto verkopen formulier",
    "auto verkopen aanvraag",
    "auto verkopen bod",
    "auto verkopen online",
    "auto te koop aanbieden",
  ],
  alternates: {
    canonical: "https://directautohulp.nl/verkoop",
  },
  openGraph: {
    title: "Auto Verkopen | DirectAutoHulp",
    description: "Verkoop uw auto snel en eenvoudig. Ontvang binnen 1-2 uur een persoonlijk bod!",
    url: "https://directautohulp.nl/verkoop",
    images: [{ url: "/Logo.png", width: 1200, height: 630, alt: "Auto Verkopen - DirectAutoHulp" }],
  },
};

export default function VerkoopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
