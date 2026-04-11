"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Clock,
  MapPin,
  Mail,
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
import { useState, useEffect } from "react";

// Pechhulp Popup Component
function PechhulpPopup({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 50 }}
      className="fixed bottom-8 right-8 z-50 max-w-sm"
    >
      <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 text-white shadow-2xl border border-white/20">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg">Staat je auto stil?</span>
        </div>
        
        <p className="text-white/90 mb-4 text-sm">
          24/7 pechhulp beschikbaar. Wij komen direct naar je toe!
        </p>
        
        <div className="flex gap-2">
          <a
            href="tel:+31612345948"
            className="flex-1 py-3 bg-white text-blue-700 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
          >
            Bel Direct
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function PechhulpPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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
              <Image
                src="/logo.png"
                alt="DirectAutoHulp"
                width={800}
                height={240}
                className="h-16 sm:h-20 md:h-32 w-auto"
              />
              </motion.div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/#diensten" className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-300 relative group">
                Diensten
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
              </Link>
              <Link href="/inkoop" className="text-sm text-green-600 font-semibold hover:text-green-700 transition-colors duration-300 relative group">
                Auto Inkoop
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300" />
              </Link>
              <Link href="/transport" className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-300 relative group">
                Auto Transport
              </Link>
              <Link href="/pechhulp" className="text-sm text-blue-400 font-semibold">
                Pechhulp
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
          className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-gray-100"
        >
          <div className="px-4 py-6 space-y-4">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="block text-lg text-gray-600 hover:text-blue-500 py-2 transition-colors">Home</Link>
            <Link href="/#diensten" onClick={() => setIsMenuOpen(false)} className="block text-lg text-gray-600 hover:text-blue-500 py-2 transition-colors">Diensten</Link>
            <Link href="/inkoop" onClick={() => setIsMenuOpen(false)} className="block text-lg text-green-600 font-semibold hover:text-green-700 py-2 transition-colors">Auto Inkoop</Link>
            <Link href="/transport" onClick={() => setIsMenuOpen(false)} className="block text-lg text-gray-600 hover:text-blue-500 py-2 transition-colors">Auto Transport</Link>
            <Link href="/pechhulp" onClick={() => setIsMenuOpen(false)} className="block text-lg text-blue-500 font-semibold py-2">Pechhulp</Link>
            <Link href="/#contact" onClick={() => setIsMenuOpen(false)} className="block text-lg text-gray-600 hover:text-blue-500 py-2 transition-colors">Contact</Link>
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
          <Link href="/#diensten" className="block mb-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
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
            <span className="text-sm text-white font-semibold">24/7 Beschikbaar - Vertrekpunt Rotterdam/Den Haag</span>
          </motion.div>

          {/* Main Headline - COMMERCIAL & CENTERED */}
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl sm:text-7xl lg:text-8xl font-black mb-2 tracking-tight"
              style={{ 
                textShadow: '0 0 40px rgba(59,130,246,0.5), 0 4px 20px rgba(0,0,0,0.8)',
                letterSpacing: '-0.02em'
              }}
            >
              <span className="text-white">24/7 PECHHULP</span>
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black mb-8 tracking-tight"
              style={{ 
                textShadow: '0 0 60px rgba(245,158,11,0.6), 0 4px 30px rgba(0,0,0,0.9)',
                letterSpacing: '-0.02em'
              }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-400 bg-clip-text text-transparent">
                ALTIJD GEHOLPEN!
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl sm:text-3xl text-white max-w-4xl mx-auto mb-8 font-medium"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}
            >
              Wegenwacht staat <span className="text-blue-400 font-bold">dag en nacht</span> klaar.
              <br />
              <span className="text-amber-400 font-bold">Snel ter plaatse</span> • 
              <span className="text-amber-400 font-bold"> Professioneel</span> • 
              <span className="text-amber-400 font-bold"> Rotterdam/Den Haag</span>
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="tel:+31612345948"
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
            className="glass-card rounded-2xl p-6 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-2 border-blue-500/50"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center animate-pulse">
                  <Phone className="w-8 h-8 text-gray-900" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">DIRECT HULP NODIG?</h3>
                  <p className="text-gray-600">We zijn er snel bij. Bel nu!</p>
                </div>
              </div>
              <a
                href="tel:+31612345948"
                className="px-8 py-4 bg-blue-600 rounded-full text-white font-bold text-xl hover:bg-blue-700 transition-all animate-pulse-glow"
              >
                +31 6 12345948
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

      {/* Tarieven & Facturatie */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold mb-6">
              TARIEVEN
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Pechhulp <span className="gradient-text">Tarieven</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Geen abonnementen nodig. Tarieven verschillen per situatie en worden direct op locatie gefactureerd.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Standaard Hulp</h3>
                  <p className="text-gray-600">Voor pechhulp zonder spoed</p>
                </div>
              </div>
              <p className="text-lg text-gray-600 mb-4 text-center">
                Tarief afhankelijk van situatie
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>24/7 beschikbaar</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Professionele hulp</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Facturatie op locatie</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-2xl p-8 border-2 border-blue-500/50"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Spoedservice</h3>
                  <p className="text-gray-600">Voor dringende gevallen</p>
                </div>
              </div>
              <p className="text-lg text-gray-600 mb-4 text-center">
                Tarief afhankelijk van situatie
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  <span>Prioriteit behandeling</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  <span>Snelle service</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  <span>Facturatie op locatie</span>
                </li>
              </ul>
            </motion.div>
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
              Bel direct voor professionele pechhulp. 24/7 beschikbaar!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+31612345948"
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full text-gray-900 font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5" />
                +31 6 12345948                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
                  <Image
                    src="/logo.png"
                    alt="DirectAutoHulp"
                    width={800}
                    height={240}
                    className="h-44 w-auto mb-6"
                  />
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
                  <Phone className="w-4 h-4 text-green-400" />
                  <a href="tel:+31612345948" className="hover:text-green-300 transition-colors">+31 6 12345948</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-green-400" />
                  <a href="mailto:info@directautohulp.nl" className="hover:text-green-300 transition-colors">info@directautohulp.nl</a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <a href="https://maps.google.com/?q=Leyweg+809+2545+GS+Den+Haag" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">Leyweg 809, 2545 GS Den Haag</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; 2026 SB Auto Transport. Alle rechten voorbehouden.
            </p>
            <p className="text-gray-500 text-sm">
              <span>Medemogelijk gemaakt door </span>
              <a href="https://varexo.nl" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 transition-colors">
                Varexo
              </a>
            </p>
            <p className="text-gray-500 text-sm">
              BTW: NL005332380B82 | KVK: 98448803
            </p>
          </div>
        </div>
      </footer>

      {/* Pechhulp Popup */}
      <AnimatePresence>
        {showPopup && (
          <PechhulpPopup onClose={() => setShowPopup(false)} />
        )}
      </AnimatePresence>

      {/* WhatsApp Widget */}
      <a
        href="https://wa.me/31612345948?text=Ik%20heb%20een%20vraagje%20over%20directautohulp"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 group"
      >
        <div className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white rounded-full px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          <span className="font-semibold text-sm">WhatsApp</span>
        </div>
      </a>
    </div>
  );
}
