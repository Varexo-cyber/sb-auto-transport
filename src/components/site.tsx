"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

export const PHONE_DISPLAY = "06 12345948";
export const PHONE_TEL = "tel:+31612345948";
export const EMAIL = "info@directautohulp.nl";
export const ADDRESS = "Coolsingel 139, 3012 AG Rotterdam";
export const MAPS_URL = "https://maps.google.com/?q=Coolsingel+139+3012+AG+Rotterdam";

export function whatsappUrl(text = "Hallo DirectAutoHulp, ik heb een vraag.") {
  return `https://wa.me/31612345948?text=${encodeURIComponent(text)}`;
}

export function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-orange-600">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor" aria-hidden="true">
          <path d="M5 11l1.6-4.2A2 2 0 018.5 5.5h7a2 2 0 011.9 1.3L19 11h.5A1.5 1.5 0 0121 12.5V16a1 1 0 01-1 1h-1a2 2 0 01-4 0H9a2 2 0 01-4 0H4a1 1 0 01-1-1v-3.5A1.5 1.5 0 014.5 11H5zm2.2 0h9.6l-1.2-3.3a.5.5 0 00-.5-.3H8.9a.5.5 0 00-.5.3L7.2 11z" />
        </svg>
      </span>
      <span className={`text-lg font-bold tracking-tight ${light ? "text-white" : "text-stone-900"}`}>
        <span className="text-orange-600">Direct</span>AutoHulp
      </span>
    </span>
  );
}

const NAV = [
  { href: "/pechhulp", label: "Pechhulp & sleepdienst" },
  { href: "/transport", label: "Autotransport" },
  { href: "/inkoop", label: "Auto verkopen" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="DirectAutoHulp, naar de homepage">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                pathname === item.href ? "text-orange-600" : "text-stone-600 hover:text-stone-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={PHONE_TEL}
            className="inline-flex items-center gap-2 rounded-md bg-stone-900 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-700"
          >
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="p-2 text-stone-900 md:hidden"
          aria-label={open ? "Menu sluiten" : "Menu openen"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-stone-200 bg-white px-4 pb-6 pt-2 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-stone-100 py-3 text-base font-medium text-stone-800"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={PHONE_TEL}
            className="mt-4 flex items-center justify-center gap-2 rounded-md bg-stone-900 py-3 font-semibold text-white"
          >
            <Phone className="h-4 w-4" />
            Bel {PHONE_DISPLAY}
          </a>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-stone-950 text-stone-400">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Pechhulp, sleepdienst, autotransport en auto-inkoop vanuit Rotterdam. Dag en nacht bereikbaar.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Diensten</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href={PHONE_TEL} className="hover:text-white">{PHONE_DISPLAY}</a></li>
            <li><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp</a></li>
            <li><a href={`mailto:${EMAIL}`} className="hover:text-white">{EMAIL}</a></li>
            <li><a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">{ADDRESS}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs sm:flex-row sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} DirectAutoHulp · KvK 87769743 · btw NL005332380B82</p>
          <p>
            Website door{" "}
            <a href="https://varexo.nl" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Varexo
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFloat({ text }: { text?: string }) {
  return (
    <a
      href={whatsappUrl(text)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Stuur ons een WhatsApp-bericht"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#1ebe5b]"
    >
      <WhatsAppIcon />
      <span className="hidden sm:inline">WhatsApp ons</span>
    </a>
  );
}

export function ContactButtons({ waText, dark = false }: { waText?: string; dark?: boolean }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href={whatsappUrl(waText)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-6 py-3.5 font-semibold text-white hover:bg-[#1ebe5b]"
      >
        <WhatsAppIcon />
        Stuur een WhatsApp
      </a>
      <a
        href={PHONE_TEL}
        className={`inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 font-semibold ${
          dark ? "bg-white text-stone-900 hover:bg-stone-100" : "bg-stone-900 text-white hover:bg-stone-700"
        }`}
      >
        <Phone className="h-5 w-5" />
        Bel {PHONE_DISPLAY}
      </a>
    </div>
  );
}
