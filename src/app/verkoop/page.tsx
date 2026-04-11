"use client";

import { motion } from "framer-motion";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Car,
  Gauge,
  User,
  Mail,
  Phone,
  Clock,
  Users,
  CheckCircle,
  Sparkles,
  ChevronRight,
  Loader2,
  Building,
  HelpCircle,
  Zap,
  Calendar,
  Search,
  X,
  Inbox,
  Smartphone,
} from "lucide-react";

// Types
interface VehicleInfo {
  merk: string;
  handelsbenaming: string;
  kenteken: string;
  eerste_kleur: string;
  brandstof_omschrijving?: string;
  catalogusprijs?: string;
  image?: string;
}

// Component that uses searchParams - wrapped in Suspense
function VerkoopForm() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    kilometerstand: "",
    naam: "",
    email: "",
    telefoon: "",
    verkoopAan: "geen_voorkeur",
    verkoopTermijn: "direct",
  });

  // Get vehicle info from URL params
  const vehicle: VehicleInfo = {
    merk: searchParams.get("merk") || "",
    handelsbenaming: searchParams.get("model") || "",
    kenteken: searchParams.get("kenteken") || "",
    eerste_kleur: searchParams.get("kleur") || "",
    brandstof_omschrijving: searchParams.get("brandstof") || "",
    catalogusprijs: searchParams.get("prijs") || "",
    image: searchParams.get("image") || "",
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/send-verkoop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicle,
          formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
      } else {
        alert("Er ging iets mis bij het versturen. Probeer het later opnieuw.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Er ging iets mis bij het versturen. Probeer het later opnieuw.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateForm = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
      </div>
    );
  }

  // Success screen
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-8 md:p-12 max-w-lg w-full text-center shadow-2xl"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            Verzoek Ontvangen!
            <Sparkles className="w-8 h-8 text-green-500" />
          </h1>
          <p className="text-gray-600 mb-6">
            We gaan direct voor je aan de slag. Je ontvangt binnen <strong>1-2 uur</strong> een
            persoonlijk bod op je {vehicle.merk} {vehicle.handelsbenaming}.
          </p>
          <div className="bg-green-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-green-700 flex items-center gap-2 mb-1">
              <Inbox className="w-4 h-4" />
              Check je email (ook spam folder)
            </p>
            <p className="text-sm text-green-700 flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              We bellen je binnen 30 minuten
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-500 rounded-full text-white font-bold hover:shadow-lg transition-all"
          >
            Terug naar Home
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/inkoop" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Terug</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm font-medium text-gray-600">DirectAutoHulp</span>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-colors ${
                i <= step ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
        <p className="text-center text-sm text-gray-500">
          Stap {step} van 3
        </p>
      </div>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 pb-12">
        {/* Vehicle Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 mb-6 shadow-lg border border-green-100"
        >
          <div className="flex items-center gap-4">
            {vehicle.image ? (
              <img
                src={vehicle.image}
                alt="Auto"
                className="w-20 h-20 object-cover rounded-xl"
              />
            ) : (
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                <Car className="w-10 h-10 text-green-500" />
              </div>
            )}
            <div className="flex-1">
              <h2 className="font-bold text-gray-900">
                {vehicle.merk} {vehicle.handelsbenaming}
              </h2>
              <p className="text-sm text-gray-500">{vehicle.kenteken}</p>
              <p className="text-sm text-gray-500">
                {vehicle.eerste_kleur} • {vehicle.brandstof_omschrijving || "Onbekend"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Step 1: Kilometerstand */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-6 md:p-8 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Gauge className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Hoeveel kilometer staat er op?</h2>
                <p className="text-sm text-gray-500">Dit bepaalt mede de waarde van je auto</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Huidige kilometerstand
              </label>
              <input
                type="number"
                value={formData.kilometerstand}
                onChange={(e) => updateForm("kilometerstand", e.target.value)}
                placeholder="Bijv. 85.000"
                className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
              />
              <p className="text-sm text-gray-400 mt-2">km</p>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!formData.kilometerstand}
              className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-500 rounded-full text-white font-bold text-lg hover:shadow-lg hover:shadow-green-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Volgende
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* Step 2: Contact Info */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-6 md:p-8 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Wie ben je?</h2>
                <p className="text-sm text-gray-500">Zodat we je persoonlijk kunnen bereiken</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Je naam</label>
                <input
                  type="text"
                  value={formData.naam}
                  onChange={(e) => updateForm("naam", e.target.value)}
                  placeholder="Voornaam Achternaam"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                    placeholder="naam@email.nl"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefoonnummer</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.telefoon}
                    onChange={(e) => updateForm("telefoon", e.target.value)}
                    placeholder="06 123 45 678"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-4 border-2 border-gray-200 rounded-full text-gray-600 font-semibold hover:border-gray-300 transition-colors"
              >
                Terug
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!formData.naam || !formData.email || !formData.telefoon}
                className="flex-[2] py-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full text-white font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Volgende
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Verkoop Voorkeuren */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-6 md:p-8 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Laatste vragen!</h2>
                <p className="text-sm text-gray-500">Zodat we het beste bod kunnen doen</p>
              </div>
            </div>

            {/* Verkoop aan */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Aan wie wil je verkopen?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "particulier", label: "Particulier", icon: User },
                  { value: "dealer", label: "Dealer", icon: Building },
                  { value: "geen_voorkeur", label: "Geen voorkeur", icon: HelpCircle },
                ].map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => updateForm("verkoopAan", option.value)}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        formData.verkoopAan === option.value
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <IconComponent className="w-8 h-8 mx-auto mb-1 text-purple-500" />
                      <span className="text-xs font-medium">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Wanneer verkopen */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Wanneer wil je verkopen?
              </label>
              <div className="space-y-2">
                {[
                  { value: "direct", label: "Direct / Zo snel mogelijk", desc: "Ik wil vandaag nog een bod", icon: Zap },
                  { value: "4_weken", label: "Binnen 4 weken", desc: "Niet heel dringend", icon: Calendar },
                  { value: "3_maanden", label: "Binnen 3 maanden", desc: "Ik vergelijk even", icon: Search },
                  { value: "geen_verkoop", label: "Ik ben niet van plan om te verkopen", desc: "Ik wil alleen de waarde weten", icon: X },
                ].map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => updateForm("verkoopTermijn", option.value)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                        formData.verkoopTermijn === option.value
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <IconComponent className="w-5 h-5 text-purple-500 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900">{option.label}</div>
                        <div className="text-sm text-gray-500">{option.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-4 border-2 border-gray-200 rounded-full text-gray-600 font-semibold hover:border-gray-300 transition-colors"
              >
                Terug
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-[2] py-4 bg-gradient-to-r from-green-600 to-emerald-500 rounded-full text-white font-bold hover:shadow-lg hover:shadow-green-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Versturen...
                  </>
                ) : (
                  <>
                    Waardevraag Indienen
                    <CheckCircle className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-sm text-gray-400 mt-4 flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Je ontvangt een bod binnen 1-2 uur
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}

// Main page component with Suspense wrapper
export default function VerkoopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
      </div>
    }>
      <VerkoopForm />
    </Suspense>
  );
}
