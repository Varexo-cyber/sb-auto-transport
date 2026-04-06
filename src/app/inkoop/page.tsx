"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  MapPin,
  Mail,
  Shield,
  CheckCircle,
  ArrowRight,
  ChevronLeft,
  Star,
  Car,
  Euro,
  BadgeCheck,
  HandCoins,
  FileText,
  Menu,
  X,
  Search,
  Sparkles,
  AlertCircle,
  Clock,
  Wallet,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { useState, useEffect } from "react";

// Sell Car Popup Component
function SellCarPopup({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 50 }}
      className="fixed bottom-8 right-8 z-50 max-w-sm"
    >
      <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-6 text-white shadow-2xl border border-white/20">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Car className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg">Wil je je auto verkopen?</span>
        </div>
        
        <p className="text-white/90 mb-4 text-sm">
          Ontdek binnen 1 minuut hoeveel je auto waard is! Direct bod, geen gedoe.
        </p>
        
        <div className="flex gap-2">
          <button
            onClick={() => {
              onClose();
              document.getElementById('kenteken-check')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex-1 py-3 bg-white text-green-700 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
          >
            Check Waarde
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// License Plate Component - REALISTIC DUTCH STYLE
function LicensePlateInput({ onSubmit }: { onSubmit: (plate: string) => void }) {
  const [plate, setPlate] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9\-]/g, "");
    setPlate(value);
    setIsValid(value.replace(/-/g, "").length >= 6);
  };

  const handleSubmit = () => {
    if (isValid) {
      onSubmit(plate);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative flex flex-col items-center">
        {/* Realistic Dutch License Plate */}
        <div className="relative flex items-stretch shadow-2xl rounded-lg overflow-hidden border-2 border-gray-400" style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}>
          {/* EU Blue Strip */}
          <div className="w-12 bg-gradient-to-b from-blue-600 to-blue-800 flex flex-col items-center justify-center py-2 border-r-2 border-gray-400">
            <span className="text-[10px] font-bold text-yellow-400 tracking-tight">NL</span>
            <div className="w-6 h-4 mt-1">
              <svg viewBox="0 0 27 18" className="w-full h-full">
                <circle cx="13.5" cy="9" r="8" fill="none" stroke="#FFD700" strokeWidth="1"/>
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30 - 90) * (Math.PI / 180);
                  const x = parseFloat((13.5 + 6.5 * Math.cos(angle)).toFixed(2));
                  const y = parseFloat((9 + 6.5 * Math.sin(angle)).toFixed(2));
                  return <circle key={i} cx={x} cy={y} r="0.8" fill="#FFD700"/>;
                })}
              </svg>
            </div>
          </div>
          
          {/* Yellow Plate Area */}
          <div className="bg-yellow-300 flex items-center justify-center px-6 py-3" style={{ backgroundColor: '#FFCC00' }}>
            <input
              type="text"
              value={plate}
              onChange={handleChange}
              placeholder="XX-XXX-X"
              maxLength={8}
              className="w-48 text-3xl font-bold tracking-[0.15em] text-black uppercase bg-transparent border-none outline-none text-center placeholder-gray-500"
              style={{ 
                fontFamily: 'Arial, Helvetica, sans-serif',
                textShadow: '0 1px 1px rgba(255,255,255,0.5)'
              }}
            />
          </div>
        </div>
        
        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: isValid ? 1.02 : 1 }}
          whileTap={{ scale: isValid ? 0.98 : 1 }}
          onClick={handleSubmit}
          disabled={!isValid}
          className={`mt-6 px-10 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg ${
            isValid 
              ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white hover:shadow-xl hover:shadow-green-500/30 cursor-pointer" 
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          <Search className="w-5 h-5" />
          Check Waarde
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        {!isValid && plate.length > 0 && (
          <p className="text-red-300 text-sm mt-3 text-center">
            Voer een geldig kenteken in (minimaal 6 tekens)
          </p>
        )}
      </div>
    </div>
  );
}

// Car Value Display Component
function CarValueResult({ plate, onClose }: { plate: string; onClose: () => void }) {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(Math.floor(Math.random() * 15000) + 2000);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [plate]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <div className="glass-card rounded-3xl p-8 max-w-md w-full text-center relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-900 hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {loading ? (
          <div className="py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-gray-600">Opzoeken kenteken {plate}...</p>
          </div>
        ) : (
          <div className="py-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 mb-6">
              <Sparkles className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-semibold">Taxatie Gereed!</span>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Geschatte Waarde</h3>
            <div className="text-5xl font-bold gradient-text mb-4">
              €{value?.toLocaleString('nl-NL')}
            </div>
            <p className="text-gray-600 mb-6">
              Voor kenteken: <span className="text-gray-900 font-mono bg-yellow-400/20 px-2 py-1 rounded">{plate}</span>
            </p>
            
            <div className="space-y-3">
              <button className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-500 rounded-full text-gray-900 font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                Direct Contact voor Bod
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 glass rounded-full text-gray-600 hover:text-gray-900 transition-colors"
              >
                Sluiten
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function InkoopPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [submittedPlate, setSubmittedPlate] = useState("");

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handlePlateSubmit = (plate: string) => {
    setSubmittedPlate(plate);
    setShowResult(true);
  };

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
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300" />
              </Link>
              <Link href="/transport" className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-300 relative group">
                Auto Transport
              </Link>
              <Link href="/pechhulp" className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-300 relative group">
                Pechhulp
              </Link>
              <Link href="/inkoop" className="text-sm text-green-400 font-semibold">
                Auto Inkoop
              </Link>
              <Link href="/#contact" className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-300 relative group">
                Contact
              </Link>
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-500 rounded-full text-gray-900 font-semibold text-sm hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 animate-pulse-glow"
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
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="block text-lg text-gray-600 hover:text-green-500 py-2 transition-colors">Home</Link>
            <Link href="/#diensten" onClick={() => setIsMenuOpen(false)} className="block text-lg text-gray-600 hover:text-green-500 py-2 transition-colors">Diensten</Link>
            <Link href="/transport" onClick={() => setIsMenuOpen(false)} className="block text-lg text-gray-600 hover:text-green-500 py-2 transition-colors">Auto Transport</Link>
            <Link href="/pechhulp" onClick={() => setIsMenuOpen(false)} className="block text-lg text-gray-600 hover:text-green-500 py-2 transition-colors">Pechhulp</Link>
            <Link href="/inkoop" onClick={() => setIsMenuOpen(false)} className="block text-lg text-green-500 font-semibold py-2">Auto Inkoop</Link>
            <Link href="/#contact" onClick={() => setIsMenuOpen(false)} className="block text-lg text-gray-600 hover:text-green-500 py-2 transition-colors">Contact</Link>
          </div>
        </motion.div>
      </motion.nav>

      {/* HERO SECTION - NEW COMMERCIAL DESIGN */}
      <section id="kenteken-check" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image - Clean car showroom */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1920&q=80"
            alt="Luxury car garage"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
        </div>
        
        <div className="absolute inset-0 grid-pattern opacity-20" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        >
          {/* Back Link */}
          <Link href="/#diensten">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Terug naar alle diensten</span>
            </motion.div>
          </Link>

          {/* Commercial Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/30 border border-green-400/50 mb-10"
          >
            <Sparkles className="w-4 h-4 text-green-400" />
            <span className="text-sm text-white font-semibold">Beste Prijs Garantie - Direct Uitbetaald</span>
          </motion.div>

          {/* Main Headline - COMMERCIAL */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-4 leading-tight"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}
          >
            <span className="text-white">Verkoop je Auto</span>
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}
          >
            <span className="gradient-text">Direct voor de Beste Prijs!</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl sm:text-2xl text-white max-w-3xl mb-6"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
          >
            Binnen 1 minuut je waarde bekend. <strong className="text-green-400">Direct bod, geen gedoe, cash geld!</strong>
          </motion.p>
          
          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <div className="flex items-center gap-2 text-white/90">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm">Gratis taxatie</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm">Direct geld</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm">Alle auto&apos;s welkom</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm">Papierwerk geregeld</span>
            </div>
          </motion.div>

          {/* License Plate Input */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-8"
          >
            <LicensePlateInput onSubmit={handlePlateSubmit} />
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-6 mt-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">€50M+</div>
              <div className="text-sm text-white/70">Ingekocht</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">15.000+</div>
              <div className="text-sm text-white/70">Klanten</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">4.9/5</div>
              <div className="text-sm text-white/70">Beoordeling</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* WHY SELL TO US - COMMERCIAL SECTION */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-600 text-sm font-bold mb-4">
              WAAROM WIJ?
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Waarom je Auto aan <span className="gradient-text">Ons Verkopen</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Geen gedoe met private verkopen. Wij regelen alles en jij krijgt direct het geld.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Snel & Makkelijk",
                desc: "Binnen 1 minuut weet je de waarde. Direct bod, geen gedoe."
              },
              {
                icon: Wallet,
                title: "Direct Uitbetaald",
                desc: "Geen wachten. Direct geld op je rekening bij akkoord."
              },
              {
                icon: Shield,
                title: "Veilige Transactie",
                desc: "Papierwerk wordt geregeld. Geen risico voor jou."
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - STEP BY STEP */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Zo Verkoop je je Auto
            </h2>
            <p className="text-xl text-white/80">
              In 4 simpele stappen, binnen 24 uur geregeld!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", icon: Search, title: "Kenteken Check", desc: "Vul je kenteken in" },
              { step: "2", icon: Euro, title: "Direct Bod", desc: "Binnen 1 minuut waarde" },
              { step: "3", icon: FileText, title: "Papierwerk", desc: "Wij regelen alles" },
              { step: "4", icon: HandCoins, title: "Geld Op Rekening", desc: "Direct uitbetaald" },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center"
              >
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 border-2 border-white/30">
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-sm font-bold text-gray-900">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-white/70">{item.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-white/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE BUY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-red-100 text-red-600 text-sm font-bold mb-4">
              WE KOPEN ALLES!
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Welke Auto&apos;s <span className="gradient-text">Kopen Wij?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Geen auto is te oud, te nieuw, of te gek. <strong>We kopen ze allemaal!</strong>
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Gebruikte Auto's",
                desc: "Alle merken en modellen. Ook met hoge km-stand.",
                price: "€500 - €50.000",
                color: "from-blue-500 to-blue-600"
              },
              {
                title: "Luxe & Sport",
                desc: "Mercedes, BMW, Porsche, Audi, etc.",
                price: "€20.000 - €150.000",
                color: "from-purple-500 to-purple-600"
              },
              {
                title: "Sloop / Schade",
                desc: "Motorschade, total loss, oude auto's.",
                price: "€100 - €5.000",
                color: "from-orange-500 to-red-500"
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-gray-50 rounded-3xl p-8 border border-gray-200 hover:shadow-lg transition-all"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6`}>
                  <Car className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.desc}</p>
                <div className="text-green-600 font-bold text-lg">{item.price}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST & TESTIMONIALS */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Tevreden <span className="gradient-text">Verkopers</span>
            </h2>
            <p className="text-xl text-gray-400">
              Duizenden mensen gingen je voor. Bekijk hun ervaring!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Peter Jansen",
                car: "BMW 3-Serie",
                amount: "€18.500",
                text: "Binnen 2 uur had ik een eerlijk bod. Direct het geld ontvangen. Super service!",
                rating: 5,
              },
              {
                name: "Maria Koster",
                car: "Volkswagen Golf",
                amount: "€8.200",
                text: "Dacht dat ik niets zou krijgen voor mijn oude Golf, maar kreeg toch nog een mooi bedrag!",
                rating: 5,
              },
              {
                name: "Hans van Dijk",
                car: "Mercedes C-Klasse",
                amount: "€22.000",
                text: "Beste prijs gehad van 5 aanbieders. Zeer professioneel geholpen.",
                rating: 5,
              },
            ].map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <span className="text-white font-bold">{review.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{review.name}</p>
                    <p className="text-sm text-green-400">{review.car} • {review.amount}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Klaar om je Auto te Verkopen?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Vul je kenteken in en ontdek direct hoeveel je auto waard is. <strong>Gratis & vrijblijvend!</strong>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('kenteken-check')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-white text-green-700 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3"
              >
                <Search className="w-5 h-5" />
                Check je Kenteken
              </button>
              <a
                href="tel:+31612345948"
                className="px-10 py-5 bg-green-800 text-white rounded-full font-bold text-lg hover:bg-green-900 transition-all flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5" />
                Bel Direct: +31 6 12345948
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gray-900 text-white">
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
              <p className="text-gray-400 mb-6 max-w-md">
                Jouw auto direct verkocht tegen de beste prijs. Binnen 1 minuut taxatie, direct uitbetaald.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Diensten</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/transport" className="hover:text-white transition-colors">Auto Transport</Link></li>
                <li><Link href="/pechhulp" className="hover:text-white transition-colors">Pechhulp</Link></li>
                <li><Link href="/inkoop" className="text-green-400 hover:text-white transition-colors">Auto Inkoop</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Contact</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-400" />
                  <a href="tel:+31612345948" className="hover:text-green-300 transition-colors">+31 6 12345948</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-green-400" />
                  <a href="mailto:info@directautohulp.nl" className="hover:text-green-300 transition-colors">info@directautohulp.nl</a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-400" />
                  <a href="https://maps.google.com/?q=Leyweg+809+2545+GS+Den+Haag" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition-colors">Leyweg 809, 2545 GS Den Haag</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; 2026 DirectAutoHulp. Alle rechten voorbehouden.
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

      {/* Sell Car Popup */}
      <AnimatePresence>
        {showPopup && (
          <SellCarPopup onClose={() => setShowPopup(false)} />
        )}
      </AnimatePresence>

      {/* License Plate Result Modal */}
      <AnimatePresence>
        {showResult && (
          <CarValueResult plate={submittedPlate} onClose={() => setShowResult(false)} />
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
