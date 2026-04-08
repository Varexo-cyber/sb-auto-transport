import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DirectAutoHulp | Autotransport, Pechhulp & Auto Inkoop",
  description: "Professioneel auto transport door heel Europa. 24/7 pechhulp, auto inkoop tegen beste prijzen. Snel, veilig en betrouwbaar.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
