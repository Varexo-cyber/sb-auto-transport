import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto Verkopen? Gratis Waardebepaling | Beste Prijs Gegarandeerd",
  description: "Auto verkopen voor de beste prijs? Voer uw kenteken in en ontvang direct een bod. Gratis waardebepaling, geen verplichtingen. DirectAutoHulp koopt elke auto! Binnen 1 uur een bod.",
  keywords: [
    "auto verkopen",
    "auto inkoop",
    "auto verkopen beste prijs",
    "auto opkoper",
    "auto inruilen",
    "auto verkopen zonder gedoe",
    "kenteken waardebepaling",
    "auto waarde check",
    "auto verkopen nederland",
    "tweedehands auto verkopen",
    "occasion verkopen",
    "auto laten taxeren",
    "auto verkopen direct geld",
    "auto opkopen",
    "mijn auto verkopen",
  ],
  alternates: {
    canonical: "https://directautohulp.nl/inkoop",
  },
  openGraph: {
    title: "Auto Verkopen? Gratis Waardebepaling | DirectAutoHulp",
    description: "Voer uw kenteken in en ontvang direct een bod op uw auto. Gratis, snel en zonder verplichtingen. Beste prijs gegarandeerd!",
    url: "https://directautohulp.nl/inkoop",
    images: [{ url: "/Logo.png", width: 1200, height: 630, alt: "Auto Verkopen - DirectAutoHulp" }],
  },
};

export default function InkoopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
