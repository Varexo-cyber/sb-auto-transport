import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SB Auto Transport | Europa's Nr. 1 Autotransport & Pechhulp",
  description: "Professioneel auto transport door heel Europa. 24/7 pechhulp, auto inkoop tegen beste prijzen. Snel, veilig en betrouwbaar.",
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
