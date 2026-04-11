import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "DirectAutoHulp | Auto Verkopen, Transport & Pechhulp Nederland",
    template: "%s | DirectAutoHulp",
  },
  description: "Auto verkopen? DirectAutoHulp biedt de beste prijs voor uw auto. Ook autotransport door heel Europa en 24/7 pechhulp. Gratis waardebepaling, direct geld. Bel nu!",
  keywords: [
    "auto verkopen",
    "auto inkoop",
    "auto verkopen nederland",
    "auto opkoper",
    "auto inruilen",
    "auto verkopen beste prijs",
    "auto transport",
    "autotransport nederland",
    "auto transport europa",
    "auto laten transporteren",
    "auto verschepen",
    "pechhulp",
    "pechhulp nederland",
    "24/7 pechhulp",
    "auto pechhulp",
    "wegenwacht alternatief",
    "sleepdienst",
    "auto ophalen",
    "auto waarde bepalen",
    "kenteken check",
    "auto waarde check",
    "directautohulp",
    "direct auto hulp",
    "auto hulp nederland",
  ],
  authors: [{ name: "DirectAutoHulp" }],
  creator: "DirectAutoHulp",
  publisher: "DirectAutoHulp",
  metadataBase: new URL("https://directautohulp.nl"),
  alternates: {
    canonical: "https://directautohulp.nl",
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://directautohulp.nl",
    siteName: "DirectAutoHulp",
    title: "DirectAutoHulp | Auto Verkopen, Transport & Pechhulp",
    description: "Auto verkopen? Wij bieden de beste prijs! Ook autotransport door heel Europa en 24/7 pechhulp. Gratis waardebepaling, direct geld op uw rekening.",
    images: [
      {
        url: "/Logo.png",
        width: 1200,
        height: 630,
        alt: "DirectAutoHulp - Auto Verkopen, Transport & Pechhulp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DirectAutoHulp | Auto Verkopen, Transport & Pechhulp",
    description: "Auto verkopen? Wij bieden de beste prijs! Autotransport door heel Europa en 24/7 pechhulp.",
    images: ["/Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
    apple: { url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' },
  },
  manifest: '/site.webmanifest',
  verification: {
    google: "google-site-verification-code",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "DirectAutoHulp",
  image: "https://directautohulp.nl/Logo.png",
  url: "https://directautohulp.nl",
  telephone: "+31612345948",
  email: "info@directautohulp.nl",
  description: "Professioneel auto transport, inkoop en 24/7 pechhulp door heel Nederland en Europa. Auto verkopen tegen de beste prijs met directe uitbetaling.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "NL",
  },
  areaServed: [
    { "@type": "Country", name: "Netherlands" },
    { "@type": "Continent", name: "Europe" },
  ],
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  sameAs: [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Diensten",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Auto Inkoop",
          description: "Verkoop uw auto tegen de beste prijs. Gratis waardebepaling op basis van kenteken. Direct geld op uw rekening.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Auto Transport",
          description: "Professioneel autotransport door heel Europa. Veilig, snel en verzekerd. Binnen 48 uur op locatie.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pechhulp",
          description: "24/7 pechhulp in heel Nederland. Pech onderweg? Wij komen direct naar u toe. Sleepdienst en reparatie ter plaatse.",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
