import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "24/7 Pechhulp Nederland | Snel Ter Plaatse | Sleepdienst",
  description: "Pech onderweg? DirectAutoHulp biedt 24/7 pechhulp in heel Nederland. Snelle hulp, sleepdienst en reparatie ter plaatse. Bel nu voor directe assistentie!",
  keywords: [
    "pechhulp",
    "pechhulp nederland",
    "24/7 pechhulp",
    "auto pechhulp",
    "wegenwacht alternatief",
    "sleepdienst",
    "auto pech",
    "pechhulp langs de weg",
    "auto slepen",
    "pechdienst",
    "auto start niet",
    "lekke band hulp",
    "accu leeg hulp",
    "auto ophalen bij pech",
    "goedkope pechhulp",
    "pechhulp zonder abonnement",
    "nood pechhulp",
  ],
  alternates: {
    canonical: "https://directautohulp.nl/pechhulp",
  },
  openGraph: {
    title: "24/7 Pechhulp Nederland | DirectAutoHulp",
    description: "Pech onderweg? Wij komen direct! 24/7 pechhulp, sleepdienst en reparatie in heel Nederland. Bel nu!",
    url: "https://directautohulp.nl/pechhulp",
    images: [{ url: "/Logo.png", width: 1200, height: 630, alt: "Pechhulp - DirectAutoHulp" }],
  },
};

export default function PechhulpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
