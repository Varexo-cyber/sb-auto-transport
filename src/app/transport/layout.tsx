import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto Transport Nederland & Europa | Snel & Veilig Vervoer",
  description: "Professioneel autotransport door heel Nederland en Europa. Veilig, verzekerd en snel. Binnen 48 uur op locatie. Vraag nu een gratis offerte aan bij DirectAutoHulp!",
  keywords: [
    "auto transport",
    "autotransport nederland",
    "auto transport europa",
    "auto laten transporteren",
    "auto verschepen",
    "auto vervoer",
    "auto op transport",
    "autotransport kosten",
    "auto transport bedrijf",
    "voertuig transport",
    "auto laten vervoeren",
    "auto transport binnen europa",
    "goedkoop auto transport",
    "auto ophalen en bezorgen",
    "auto transport dienst",
  ],
  alternates: {
    canonical: "https://directautohulp.nl/transport",
  },
  openGraph: {
    title: "Auto Transport Nederland & Europa | DirectAutoHulp",
    description: "Professioneel autotransport door heel Europa. Veilig, verzekerd en binnen 48 uur op locatie. Vraag gratis offerte aan!",
    url: "https://directautohulp.nl/transport",
    images: [{ url: "/Logo.png", width: 1200, height: 630, alt: "Auto Transport - DirectAutoHulp" }],
  },
};

export default function TransportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
