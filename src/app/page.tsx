"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Clock,
  MapPin,
  Truck,
  Wrench,
  DollarSign,
  Shield,
  CheckCircle,
  ArrowRight,
  Star,
  ChevronRight,
  Menu,
  X,
  Euro,
  Navigation,
  Car,
  BadgeCheck,
  Sparkles,
  Target,
  Award,
} from "lucide-react";
import { useState, useRef } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 nav-glass"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <Truck className="w-7 h-7 text-gray-900" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SB Auto</h1>
                <p className="text-xs text-gray-600">Transport & Services</p>
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/#diensten" className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-300 relative group">
                Diensten
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300" />
              </Link>
              <Link href="/transport" className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-300 relative group">
                Auto Transport
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300" />
              </Link>
              <Link href="/pechhulp" className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-300 relative group">
                Pechhulp
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300" />
              </Link>
              <Link href="/inkoop" className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-300 relative group">
                Auto Inkoop
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300" />
              </Link>
              <Link href="/#contact" className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-300 relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300" />
              </Link>
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 rounded-full text-gray-900 font-semibold text-sm hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 animate-pulse-glow"
              >
                <Phone className="w-4 h-4 inline mr-2" />
                Bel Direct
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-900"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isMenuOpen ? "auto" : 0, opacity: isMenuOpen ? 1 : 0 }}
          className="md:hidden overflow-hidden bg-black/90 backdrop-blur-xl"
        >
          <div className="px-4 py-6 space-y-4">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="block text-lg text-gray-900 font-semibold py-2">Home</Link>
            <Link href="/#diensten" onClick={() => setIsMenuOpen(false)} className="block text-lg text-gray-700 hover:text-gray-900 py-2">Diensten</Link>
            <Link href="/transport" onClick={() => setIsMenuOpen(false)} className="block text-lg text-gray-700 hover:text-gray-900 py-2">Auto Transport</Link>
            <Link href="/pechhulp" onClick={() => setIsMenuOpen(false)} className="block text-lg text-gray-700 hover:text-gray-900 py-2">Pechhulp</Link>
            <Link href="/inkoop" onClick={() => setIsMenuOpen(false)} className="block text-lg text-gray-700 hover:text-gray-900 py-2">Auto Inkoop</Link>
            <Link href="/#contact" onClick={() => setIsMenuOpen(false)} className="block text-lg text-gray-700 hover:text-gray-900 py-2">Contact</Link>
          </div>
        </motion.div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1920&q=80"
            alt="Luxury Mercedes car"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/85" />
        </div>
        
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 grid-pattern opacity-50" />
        
        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-20 w-64 h-64 bg-gradient-to-br from-red-600/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 30, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-20 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-transparent rounded-full blur-3xl"
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32"
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm mb-10 border border-white/20"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-white font-semibold">24/7 Bereikbaar - Door heel Europa</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
            >
              <span className="text-white">Je Auto in</span>
              <br />
              <span className="gradient-text">Veilige Handen</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl sm:text-2xl text-white max-w-3xl mx-auto mb-10"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
            >
              Professioneel transport, directe pechhulp & hoogste inkoopprijzen. 
              Europa's meest betrouwbare autopartner.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button className="group px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 rounded-full text-white font-bold text-lg hover:shadow-2xl hover:shadow-red-500/40 transition-all duration-300 flex items-center gap-3">
                <Phone className="w-5 h-5" />
                Direct Contact
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                Bekijk Diensten
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {[
                { value: "15K+", label: "Auto's Getransporteerd" },
                { value: "24/7", label: "Pechhulp Beschikbaar" },
                { value: "25+", label: "Jaar Ervaring" },
                { value: "99%", label: "Tevreden Klanten" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  className="glass-card rounded-2xl p-6 text-center"
                >
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
          >
            <div className="w-1.5 h-3 rounded-full bg-white/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="diensten" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.span variants={fadeInUp} className="inline-block px-4 py-2 rounded-full bg-red-500/10 text-red-400 text-sm font-semibold mb-6">
              ONZE DIENSTEN
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Alles Voor <span className="gradient-text">Jouw Auto</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Van transport tot pechhulp, van inkoop tot verkoop. Wij regelen het allemaal.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1: Transport */}
            <Link href="/transport">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-card rounded-3xl p-8 group cursor-pointer relative overflow-hidden h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-500/30">
                    <Truck className="w-8 h-8 text-gray-900" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Auto Transport</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Snel en veilig transport door heel Europa. Ophaalservice op locatie, 
                    volledig verzekerd en met GPS-tracking.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {["Pan-Europa dekking", "GPS-tracking", "Volledig verzekerd", "Binnen 48u opgehaald"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-2 text-red-400 font-semibold group-hover:gap-4 transition-all">
                    Bekijk Dienst <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Service 2: Pechhulp */}
            <Link href="/pechhulp">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-card rounded-3xl p-8 group cursor-pointer relative overflow-hidden h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30">
                    <Wrench className="w-8 h-8 text-gray-900" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">24/7 Pechhulp</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Altijd en overal geholpen. Onze wegenwacht staat dag en nacht voor je klaar 
                    met professionele ondersteuning.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {["Gemiddelde aanrijtijd 30min", "Altijd bereikbaar", "Directe afhandeling", "Alle merken"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-2 text-blue-400 font-semibold group-hover:gap-4 transition-all">
                    Bekijk Dienst <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Service 3: Inkoop */}
            <Link href="/inkoop">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-card rounded-3xl p-8 group cursor-pointer relative overflow-hidden h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/30">
                    <DollarSign className="w-8 h-8 text-gray-900" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Auto Inkoop</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Jouw auto direct verkocht tegen de beste prijs. Direct geld op je rekening, 
                    wij regelen alle papierwerk.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {["Beste prijs garantie", "Direct uitbetaald", "Gratis ophalen", "Alle auto's welkom"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-2 text-green-400 font-semibold group-hover:gap-4 transition-all">
                    Bekijk Dienst <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="over-ons" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-900/5 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-red-500/10 text-red-400 text-sm font-semibold mb-6">
                WAAROM WIJ?
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Europa's Meest <span className="gradient-text">Betrouwbare</span> Autopartner
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Met meer dan 25 jaar ervaring en duizenden tevreden klanten zijn wij dé keuze 
                voor al je auto-gerelateerde zaken.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Shield, title: "100% Verzekerd", desc: "Alle transporten volledig verzekerd" },
                  { icon: Clock, title: "Snelle Service", desc: "Gemiddelde responstijd van 30 minuten" },
                  { icon: BadgeCheck, title: "Erkend Bedrijf", desc: "KVK geregistreerd & BRDO erkend" },
                  { icon: Star, title: "5-Sterren Service", desc: "Gemiddelde beoordeling van 4.9/5" },
                ].map((feature, i) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl glass hover:bg-white/5 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-gray-600">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/30 to-blue-600/30 rounded-3xl blur-2xl" />
                <div className="relative glass-card rounded-3xl p-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="glass rounded-2xl p-6 text-center">
                        <Car className="w-10 h-10 text-red-400 mx-auto mb-3" />
                        <div className="text-3xl font-bold text-gray-900">15.000+</div>
                        <div className="text-sm text-gray-600">Auto's verhuisd</div>
                      </div>
                      <div className="glass rounded-2xl p-6 text-center">
                        <Navigation className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                        <div className="text-3xl font-bold text-gray-900">30+</div>
                        <div className="text-sm text-gray-600">Landen</div>
                      </div>
                    </div>
                    <div className="space-y-4 pt-8">
                      <div className="glass rounded-2xl p-6 text-center">
                        <Euro className="w-10 h-10 text-green-400 mx-auto mb-3" />
                        <div className="text-3xl font-bold text-gray-900">€50M+</div>
                        <div className="text-sm text-gray-600">Auto's ingekocht</div>
                      </div>
                      <div className="glass rounded-2xl p-6 text-center">
                        <Clock className="w-10 h-10 text-orange-400 mx-auto mb-3" />
                        <div className="text-3xl font-bold text-gray-900">25+</div>
                        <div className="text-sm text-gray-600">Jaar ervaring</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="hoe-werkt-het" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-red-500/10 text-red-400 text-sm font-semibold mb-6">
              HOE HET WERKT
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Simpel, Snel & <span className="gradient-text">Transparant</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0 -translate-y-1/2" />

            {[
              { step: "01", title: "Contact Opnemen", desc: "Bel ons of vul het formulier in. We reageren binnen 15 minuten." },
              { step: "02", title: "Offerte Ontvangen", desc: "Gratis offerte zonder verplichtingen. Altijd de beste prijs." },
              { step: "03", title: "Geregeld!", desc: "Wij regelen alles. Jij hoeft alleen maar te ontvangen." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative"
              >
                <div className="glass-card rounded-3xl p-8 text-center relative z-10 h-full">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-gray-900">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-32 relative overflow-hidden bg-gradient-to-br from-red-600/10 via-transparent to-blue-600/10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="glass-card rounded-3xl p-8 sm:p-12">
            <div className="text-center mb-10">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Neem <span className="gradient-text">Contact</span> Op
              </h2>
              <p className="text-xl text-gray-600">
                Vul het formulier in en we nemen binnen 15 minuten contact met je op.
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Naam</label>
                  <input
                    type="text"
                    placeholder="Jouw naam (Voorbeeld)"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Telefoonnummer</label>
                  <input
                    type="tel"
                    placeholder="06-12345678 (Voorbeeld)"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">E-mail</label>
                  <input
                    type="email"
                    placeholder="email@voorbeeld.nl (Voorbeeld)"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Locatie / Adres</label>
                  <input
                    type="text"
                    placeholder="Jouw locatie (Voorbeeld)"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Onderwerp</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all">
                  <option>Kies een dienst...</option>
                  <option>Auto Transport</option>
                  <option>Pechhulp</option>
                  <option>Auto Inkoop</option>
                  <option>Overige vragen</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bericht</label>
                <textarea
                  rows={4}
                  placeholder="Vertel ons wat je nodig hebt (Voorbeeld)"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-4 bg-gradient-to-r from-green-600 to-emerald-500 rounded-full text-white font-bold text-lg hover:shadow-2xl hover:shadow-green-500/40 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Phone className="w-5 h-5" />
                  Verstuur Bericht
                </button>
                <a
                  href="tel:+31612345678"
                  className="flex-1 py-4 bg-gray-100 rounded-full text-gray-900 font-semibold text-lg hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Phone className="w-5 h-5" />
                  Bel Direct
                </a>
              </div>
            </form>

            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="grid sm:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-red-500" />
                  </div>
                  <p className="font-semibold text-gray-900">Telefoon</p>
                  <p className="text-sm text-gray-600">06-12345678 (Voorbeeld)</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="font-semibold text-gray-900">Adres</p>
                  <p className="text-sm text-gray-600">Straatnaam 123 (Voorbeeld)</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="font-semibold text-gray-900">Bereikbaar</p>
                  <p className="text-sm text-gray-600">24/7 - Altijd bereikbaar</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                  <Truck className="w-7 h-7 text-gray-900" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">SB Auto</h3>
                  <p className="text-xs text-gray-600">Transport & Services</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6 max-w-md">
                Europa's meest betrouwbare partner voor al je auto-gerelateerde zaken. 
                24/7 beschikbaar, professioneel en transparant.
              </p>
              <div className="flex gap-4">
                {["Facebook", "Instagram", "LinkedIn"].map((social) => (
                  <button
                    key={social}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white/10 transition-all"
                  >
                    <span className="text-xs">{social[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-gray-900 font-semibold mb-6">Diensten</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/transport" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2">
                    <Truck className="w-4 h-4" /> Auto Transport
                  </Link>
                </li>
                <li>
                  <Link href="/pechhulp" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2">
                    <Wrench className="w-4 h-4" /> Pechhulp
                  </Link>
                </li>
                <li>
                  <Link href="/inkoop" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2">
                    <DollarSign className="w-4 h-4" /> Auto Inkoop
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 font-semibold mb-6">Contact</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-400" />
                  <span>06-12345678 (Voorbeeld)</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-400" />
                  <span>Adres (Voorbeeld)</span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-green-400" />
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
