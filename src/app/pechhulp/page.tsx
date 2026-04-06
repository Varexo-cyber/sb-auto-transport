"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Clock,
  MapPin,
  Wrench,
  Shield,
  CheckCircle,
  ArrowRight,
  ChevronLeft,
  Star,
  Zap,
  Car,
  Battery,
  Fuel,
  AlertTriangle,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function PechhulpPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 nav-glass"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Wrench className="w-7 h-7 text-gray-900" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">SB Auto</h1>
                  <p className="text-xs text-gray-600">24/7 Pechhulp</p>
                </div>
              </motion.div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/#diensten" className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-300 relative group">
                Diensten
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
              </Link>
              <Link href="/transport" className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-300 relative group">
                Auto Transport
              </Link>
              <Link href="/pechhulp" className="text-sm text-blue-400 font-semibold">
                Pechhulp
              </Link>
              <Link href="/inkoop" className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-300 relative group">
                Auto Inkoop
              </Link>
              <Link href="/#contact" className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-300 relative group">
                Contact
              </Link>
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full text-gray-900 font-semibold text-sm hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 animate-pulse-glow"
              >
                <Phone className="w-4 h-4 inline mr-2" />
                Bel Direct
              </motion.button>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-900">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{ height: isMenuOpen ? "auto" : 0, opacity: isMenuOpen ? 1 : 0 }}
          className="md:hidden overflow-hidden bg-black/90 backdrop-blur-xl"
        >
          <div className="px-4 py-6 space-y-4">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="block text-lg text-gray-700 hover:text-gray-900 py-2">Home</Link>
            <Link href="/#diensten" onClick={() => setIsMenuOpen(false)} className="block text-lg text-gray-700 hover:text-gray-900 py-2">Diensten</Link>
            <Link href="/transport" onClick={() => setIsMenuOpen(false)} className="block text-lg text-gray-700 hover:text-gray-900 py-2">Auto Transport</Link>
            <Link href="/pechhulp" onClick={() => setIsMenuOpen(false)} className="block text-lg text-blue-400 py-2">Pechhulp</Link>
            <Link href="/inkoop" onClick={() => setIsMenuOpen(false)} className="block text-lg text-gray-700 hover:text-gray-900 py-2">Auto Inkoop</Link>
            <Link href="/#contact" onClick={() => setIsMenuOpen(false)} className="block text-lg text-gray-700 hover:text-gray-900 py-2">Contact</Link>
          </div>
        </motion.div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1920&q=80"
            alt="Car service"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
        </div>
        <div className="absolute inset-0 grid-pattern opacity-50" />
        
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-20 w-96 h-96 bg-gradient-to-br from-blue-600/30 to-transparent rounded-full blur-3xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <Link href="/#diensten">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Terug naar alle diensten</span>
            </motion.div>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 mb-10"
          >
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-white font-semibold">24/7 Beschikbaar - Gemiddeld 30 min</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="text-white">24/7</span>
            <br />
            <span className="gradient-text">Pechhulp</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-2xl text-gray-200 max-w-3xl mb-10"
          >
            Altijd en overal geholpen. Onze wegenwacht staat dag en nacht voor je klaar 
            met professionele ondersteuning. Gemiddelde aanrijtijd: 30 minuten.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="tel:+31612345678"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full text-white font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 flex items-center gap-3"
            >
              <Phone className="w-5 h-5" />
              Direct Bellen
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              Onze Locaties
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Emergency Banner */}
      <section className="py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 bg-gradient-to-r from-red-600/20 to-orange-600/20 border-2 border-red-500/50"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center animate-pulse">
                  <Phone className="w-8 h-8 text-gray-900" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">DIRECT HULP NODIG?</h3>
                  <p className="text-gray-600">We zijn er snel bij. Bel nu!</p>
                </div>
              </div>
              <a
                href="tel:+31612345678"
                className="px-8 py-4 bg-red-600 rounded-full text-gray-900 font-bold text-xl hover:bg-red-700 transition-all animate-pulse-glow"
              >
                06-12345678
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold mb-6">
              ONZE DIENSTEN
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Wat Doen Wij <span className="gradient-text">Voor Jou</span>?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Battery, title: "Startproblemen", desc: "Accu leeg? Wij starten je auto direct." },
              { icon: Fuel, title: "Benzine", desc: "Tank leeg? Wij brengen brandstof." },
              { icon: Car, title: "Bandenwissel", desc: "Lekke band? Wij wisselen direct voor je." },
              { icon: AlertTriangle, title: "Ongevallen", desc: "Schade? Wij regelen alles voor je." },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center group hover:bg-blue-500/10 transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold mb-6">
              VOORDELIGE TARIEVEN
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Pechhulp <span className="gradient-text">Abonnementen</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Standaard",
                price: "€49",
                period: "per jaar",
                features: [
                  "5x per jaar hulp",
                  "Nederland dekking",
                  "Max 30min aanrijtijd",
                  "24/7 bereikbaar",
                ],
                popular: false,
              },
              {
                name: "Plus",
                price: "€89",
                period: "per jaar",
                features: [
                  "Onbeperkt hulp",
                  "Nederland & België",
                  "Max 30min aanrijtijd",
                  "24/7 bereikbaar",
                  "GRATIS vervangauto",
                  "Ophalen thuisadres",
                ],
                popular: true,
              },
              {
                name: "Europa",
                price: "€149",
                period: "per jaar",
                features: [
                  "Onbeperkt hulp",
                  "Hele Europa dekking",
                  "Max 30min aanrijtijd",
                  "24/7 bereikbaar",
                  "GRATIS vervangauto",
                  "Hotel bij lang wachten",
                ],
                popular: false,
              },
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={`relative rounded-3xl p-8 ${
                  plan.popular
                    ? "bg-gradient-to-br from-blue-600/30 to-cyan-600/30 border-2 border-blue-500"
                    : "glass-card"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-gray-900 text-sm font-bold">
                    Meest Gekozen
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle className={`w-5 h-5 flex-shrink-0 ${plan.popular ? "text-cyan-400" : "text-green-400"}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-4 rounded-full font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-gray-900 hover:shadow-lg hover:shadow-blue-500/30"
                      : "glass hover:bg-white/10 text-gray-900"
                  }`}
                >
                  Kies {plan.name}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-cyan-600/20" />
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="glass-card rounded-3xl p-8 sm:p-16 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Staat Je Auto <span className="gradient-text">Stil</span>?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Wij zijn er binnen 30 minuten. Bel direct!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+31612345678"
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full text-gray-900 font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5" />
                06-12345678 (Voorbeeld)
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <Link href="/">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Wrench className="w-7 h-7 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">SB Auto</h3>
                    <p className="text-xs text-gray-600">24/7 Pechhulp</p>
                  </div>
                </div>
              </Link>
              <p className="text-gray-600 mb-6 max-w-md">
                Altijd en overal geholpen. Onze wegenwacht staat dag en nacht voor je klaar.
              </p>
            </div>

            <div>
              <h4 className="text-gray-900 font-semibold mb-6">Diensten</h4>
              <ul className="space-y-3">
                <li><Link href="/transport" className="text-gray-600 hover:text-gray-900 transition-colors">Auto Transport</Link></li>
                <li><Link href="/pechhulp" className="text-blue-400 hover:text-gray-900 transition-colors">Pechhulp</Link></li>
                <li><Link href="/inkoop" className="text-gray-600 hover:text-gray-900 transition-colors">Auto Inkoop</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 font-semibold mb-6">Contact</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>06-12345678 (Voorbeeld)</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>Adres (Voorbeeld)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>KVK: 12345678 (Voorbeeld)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 SB Auto Transport. Alle rechten voorbehouden.
            </p>
            <p className="text-gray-500 text-sm">
              BTW: NL123456789B01 (Voorbeeld) | KVK: 12345678 (Voorbeeld)
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
