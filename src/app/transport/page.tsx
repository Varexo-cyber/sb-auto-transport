"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Clock,
  MapPin,
  Mail,
  Truck,
  Shield,
  CheckCircle,
  ArrowRight,
  ChevronLeft,
  Euro,
  Star,
  Route,
  Globe,
  Package,
  Zap,
  Navigation,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function AutoTransportPage() {
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
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300" />
              </Link>
              <Link href="/transport" className="text-sm text-red-400 font-semibold">
                Auto Transport
              </Link>
              <Link href="/pechhulp" className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-300 relative group">
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
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 rounded-full text-gray-900 font-semibold text-sm hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 animate-pulse-glow"
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
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="block text-lg text-gray-600 hover:text-red-500 py-2 transition-colors">Home</Link>
            <Link href="/#diensten" onClick={() => setIsMenuOpen(false)} className="block text-lg text-gray-600 hover:text-red-500 py-2 transition-colors">Diensten</Link>
            <Link href="/transport" onClick={() => setIsMenuOpen(false)} className="block text-lg text-red-500 font-semibold py-2">Auto Transport</Link>
            <Link href="/pechhulp" onClick={() => setIsMenuOpen(false)} className="block text-lg text-gray-600 hover:text-red-500 py-2 transition-colors">Pechhulp</Link>
            <Link href="/inkoop" onClick={() => setIsMenuOpen(false)} className="block text-lg text-gray-600 hover:text-red-500 py-2 transition-colors">Auto Inkoop</Link>
            <Link href="/#contact" onClick={() => setIsMenuOpen(false)} className="block text-lg text-gray-600 hover:text-red-500 py-2 transition-colors">Contact</Link>
          </div>
        </motion.div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&q=80"
            alt="Car transport truck"
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
          className="absolute top-1/3 right-20 w-96 h-96 bg-gradient-to-br from-red-600/30 to-transparent rounded-full blur-3xl"
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
            className="inline-flex items-center gap-4 px-4 py-2 rounded-full bg-red-500/20 mb-10"
          >
            <Truck className="w-4 h-4 text-red-400" />
            <span className="text-sm text-white/80 font-semibold">Professioneel Auto Transport</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="text-white">Auto Transport</span>
            <br />
            <span className="gradient-text">Door Heel Europa</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-gray-200 max-w-3xl mb-10"
          >
            Snel, veilig en verzekerd transport van jouw auto. Van deur tot deur, 
            met GPS-tracking en volledige verzekering.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="group px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 rounded-full text-white font-bold text-lg hover:shadow-2xl hover:shadow-red-500/40 transition-all duration-300 flex items-center gap-3">
              <Phone className="w-5 h-5" />
              Direct Offerte Aanvragen
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              Bekijk Routes
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Globe, title: "Europa Dekking", desc: "Alle landen binnen de EU" },
              { icon: Route, title: "GPS Tracking", desc: "Volg je auto real-time" },
              { icon: Shield, title: "100% Verzekerd", desc: "All-risk verzekering" },
              { icon: Zap, title: "Snelle Service", desc: "Binnen 48u op locatie" },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center group hover:bg-white/10 transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-red-500/10 text-red-400 text-sm font-semibold mb-6">
              TRANSPARANTE PRIJZEN
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Transport <span className="gradient-text">Tarief</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Geen verborgen kosten. Direct een eerlijke prijs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Standaard",
                price: "Vanaf €0,89",
                unit: "per km",
                features: [
                  "Enkele auto transport",
                  "Binnen 5 werkdagen",
                  "Basale verzekering",
                  "Email updates",
                ],
                popular: false,
              },
              {
                name: "Express",
                price: "Vanaf €1,29",
                unit: "per km",
                features: [
                  "Prioriteit transport",
                  "Binnen 48 uur",
                  "All-risk verzekering",
                  "Live GPS tracking",
                  "Directe updates via WhatsApp",
                  "Ophaal en aflever op adres",
                ],
                popular: true,
              },
              {
                name: "Business",
                price: "Op aanvraag",
                unit: "maatwerk",
                features: [
                  "Meerdere auto's",
                  "Terugkerende routes",
                  "Dedicated accountmanager",
                  "Maandelijkse facturatie",
                  "VIP service",
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
                    ? "bg-gradient-to-br from-red-600/30 to-orange-600/30 border-2 border-red-500"
                    : "glass-card"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-gray-900 text-sm font-bold">
                    Meest Gekozen
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                  </div>
                  <span className="text-gray-600">{plan.unit}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle className={`w-5 h-5 flex-shrink-0 ${plan.popular ? "text-orange-400" : "text-green-400"}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-4 rounded-full font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-red-600 to-orange-500 text-gray-900 hover:shadow-lg hover:shadow-red-500/30"
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

      {/* How It Works */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Hoe Werkt <span className="gradient-text">Auto Transport</span>?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", icon: Phone, title: "Contact Opnemen", desc: "Bel of app ons met je verzoek" },
              { step: "2", icon: Navigation, title: "Route Plan", desc: "Wij plannen de optimale route" },
              { step: "3", icon: Truck, title: "Ophalen", desc: "Wij komen jouw auto ophalen" },
              { step: "4", icon: MapPin, title: "Afleveren", desc: "Veilig afleveren op bestemming" },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-10 h-10 text-gray-900" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-red-500/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Wat Klanten <span className="gradient-text">Zeggen</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Mark van den Berg",
                role: "Leaseauto vervoerd",
                text: "Super snelle service! Mijn auto werd binnen 24 uur van Amsterdam naar Barcelona gebracht. Perfecte communicatie via WhatsApp.",
                rating: 5,
              },
              {
                name: "Sandra de Vries",
                role: "Oldtimer transport",
                text: "Hele professionele aanpak. Mijn oldtimer werd met zorg behandeld. De GPS tracking gaf me gemoedsrust.",
                rating: 5,
              },
              {
                name: "Jan Peters",
                role: "Bedrijfsauto's",
                text: "Wij werken al 3 jaar met SB Auto voor onze vloot. Betrouwbaar, snel en altijd scherpe prijzen.",
                rating: 5,
              },
            ].map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-orange-400 fill-orange-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{review.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{review.name}</p>
                  <p className="text-sm text-gray-600">{review.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Veelgestelde <span className="gradient-text">Vragen</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              { q: "Hoe snel kan mijn auto opgehaald worden?", a: "In de meeste gevallen kunnen we binnen 24-48 uur op locatie zijn. Voor spoedtransport hebben we een Express optie waarbij we binnen 24 uur kunnen ophalen." },
              { q: "Is mijn auto verzekerd tijdens transport?", a: "Ja, al onze transporten zijn all-risk verzekerd. Je auto is gedekt tegen alle schade die tijdens transport kan ontstaan." },
              { q: "Kan ik mijn auto volgen tijdens transport?", a: "Absoluut! Bij onze Express en Business opties krijg je toegang tot live GPS tracking zodat je precies weet waar je auto is." },
              { q: "Transporteer jullie ook naar landen buiten de EU?", a: "Ja, wij verzorgen transport door heel Europa inclusief Zwitserland, Noorwegen en het VK. Neem contact op voor specifieke bestemmingen." },
              { q: "Hoe worden de prijzen berekend?", a: "Onze prijzen zijn afhankelijk van de afstand, type auto, en de gekozen service. Vraag een gratis offerte aan voor een exacte prijs." },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-orange-600/20" />
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="glass-card rounded-3xl p-8 sm:p-16 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Klaar om Je Auto te <span className="gradient-text">Transport</span>?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Vraag nu een gratis offerte aan. We reageren binnen 15 minuten.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+31612345948"
                className="group px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 rounded-full text-gray-900 font-bold text-lg hover:shadow-2xl hover:shadow-red-500/40 transition-all duration-300 flex items-center justify-center gap-3"
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
                Europa's meest betrouwbare partner voor al je auto-gerelateerde zaken.
              </p>
            </div>

            <div>
              <h4 className="text-gray-900 font-semibold mb-6">Diensten</h4>
              <ul className="space-y-3">
                <li><Link href="/transport" className="text-red-400 hover:text-gray-900 transition-colors">Auto Transport</Link></li>
                <li><Link href="/pechhulp" className="text-gray-600 hover:text-gray-900 transition-colors">Pechhulp</Link></li>
                <li><Link href="/inkoop" className="text-gray-600 hover:text-gray-900 transition-colors">Auto Inkoop</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 font-semibold mb-6">Contact</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-400" />
                  <a href="tel:+31612345948" className="hover:text-red-500 transition-colors">+31 6 12345948</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-green-400" />
                  <a href="mailto:info@directautohulp.nl" className="hover:text-green-500 transition-colors">info@directautohulp.nl</a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-400" />
                  <a href="https://maps.google.com/?q=Leyweg+809+2545+GS+Den+Haag" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">Leyweg 809, 2545 GS Den Haag</a>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>KVK: 98448803</span>
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

      {/* WhatsApp Widget */}
      <a
        href="https://wa.me/31612345948?text=Ik%20heb%20een%20vraagje%20over%20auto%20transport"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
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
