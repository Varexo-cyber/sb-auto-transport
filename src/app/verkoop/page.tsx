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
  Fuel,
  Settings,
  CalendarDays,
  AlertTriangle,
  Camera,
  Paperclip,
  Trash2,
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
    brandstof: "",
    transmissie: "",
    bouwjaar: "",
    schade: "",
    schadeOmschrijving: "",
    naam: "",
    email: "",
    telefoon: "",
    verkoopAan: "geen_voorkeur",
    verkoopTermijn: "direct",
  });
  const [schadeFotos, setSchadeFotos] = useState<File[]>([]);

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
      // Convert photos to base64
      const fotoData: { name: string; data: string }[] = [];
      for (const file of schadeFotos) {
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
        fotoData.push({ name: file.name, data: base64 });
      }

      const response = await fetch("/.netlify/functions/send-verkoop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicle,
          formData,
          schadeFotos: fotoData,
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
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600" />
      </div>
    );
  }

  // Success screen
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg p-8 md:p-12 max-w-lg w-full text-center border border-stone-200"
        >
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-orange-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-900 mb-4 ">
            Bedankt, we hebben uw aanvraag
          </h1>
          <p className="text-stone-600 mb-6">
            U ontvangt binnen <strong>1 à 2 uur</strong> een
            bod op uw {vehicle.merk} {vehicle.handelsbenaming}.
          </p>
          <div className="bg-stone-50 rounded-md p-4 mb-6 space-y-2 text-left">
            <p className="text-sm text-stone-700 flex items-center gap-2">
              <Inbox className="w-4 h-4 flex-shrink-0" />
              U ontvangt een bevestiging per e-mail
            </p>
            <p className="text-sm text-stone-700 flex items-center gap-2">
              <Mail className="w-4 h-4 flex-shrink-0" />
              Niets ontvangen? Kijk ook in uw spammap.
            </p>
            <p className="text-sm text-stone-700 flex items-center gap-2">
              <Smartphone className="w-4 h-4 flex-shrink-0" />
              We nemen telefonisch contact met u op
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 rounded-md text-white font-semibold hover:bg-orange-700"
          >
            Terug naar de homepage
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/inkoop" className="flex items-center gap-2 text-stone-600 hover:text-stone-900">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Terug</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-stone-900"><span className="text-orange-600">Direct</span>AutoHulp</span>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-colors ${
                i <= step ? "bg-orange-600" : "bg-stone-300"
              }`}
            />
          ))}
        </div>
        <p className="text-center text-sm text-stone-500">
          Stap {step} van 4
        </p>
      </div>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 pb-12">
        {/* Vehicle Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-4 mb-6 border border-stone-200"
        >
          <div className="flex items-center gap-4">
            {vehicle.image ? (
              <img
                src={vehicle.image}
                alt="Auto"
                className="w-20 h-20 object-cover rounded-xl"
              />
            ) : (
              <div className="w-20 h-20 bg-stone-100 rounded-md flex items-center justify-center">
                <Car className="w-10 h-10 text-stone-400" />
              </div>
            )}
            <div className="flex-1">
              <h2 className="font-bold text-stone-900">
                {vehicle.merk} {vehicle.handelsbenaming}
              </h2>
              <p className="text-sm text-stone-500">{vehicle.kenteken}</p>
              <p className="text-sm text-stone-500">
                {vehicle.eerste_kleur} • {vehicle.brandstof_omschrijving || "Onbekend"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Step 1: Voertuig Details */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg p-6 md:p-8 border border-stone-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-stone-100 rounded-md flex items-center justify-center">
                <Car className="w-6 h-6 text-stone-700" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-stone-900">Voertuig details</h2>
                <p className="text-sm text-stone-500">Een paar gegevens over de auto</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {/* Kilometerstand */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2 flex items-center gap-2">
                  <Gauge className="w-4 h-4" />
                  Kilometerstand
                </label>
                <input
                  type="number"
                  value={formData.kilometerstand}
                  onChange={(e) => updateForm("kilometerstand", e.target.value)}
                  placeholder="Bijv. 85000"
                  className="w-full px-4 py-4 border border-stone-300 rounded-md focus:border-orange-600 focus:outline-none transition-colors"
                />
              </div>

              {/* Bouwjaar */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  Bouwjaar
                </label>
                <input
                  type="number"
                  value={formData.bouwjaar}
                  onChange={(e) => updateForm("bouwjaar", e.target.value)}
                  placeholder="Bijv. 2019"
                  className="w-full px-4 py-4 border border-stone-300 rounded-md focus:border-orange-600 focus:outline-none transition-colors"
                />
              </div>

              {/* Brandstof */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2 flex items-center gap-2">
                  <Fuel className="w-4 h-4" />
                  Brandstof
                </label>
                <input
                  type="text"
                  value={formData.brandstof}
                  onChange={(e) => updateForm("brandstof", e.target.value)}
                  placeholder="Bijv. Benzine, Diesel, Elektrisch, Hybride"
                  className="w-full px-4 py-4 border border-stone-300 rounded-md focus:border-orange-600 focus:outline-none transition-colors"
                />
              </div>

              {/* Transmissie */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Transmissie
                </label>
                <input
                  type="text"
                  value={formData.transmissie}
                  onChange={(e) => updateForm("transmissie", e.target.value)}
                  placeholder="Bijv. Automaat, Handgeschakeld"
                  className="w-full px-4 py-4 border border-stone-300 rounded-md focus:border-orange-600 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!formData.kilometerstand || !formData.bouwjaar || !formData.brandstof || !formData.transmissie}
              className="w-full py-4 bg-orange-600 rounded-md text-white font-semibold text-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Volgende
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* Step 2: Schade */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg p-6 md:p-8 border border-stone-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-stone-100 rounded-md flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-stone-700" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-stone-900">Eventuele schade</h2>
                <p className="text-sm text-stone-500">Heeft de auto schade?</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { updateForm("schade", "ja"); }}
                  className={`p-4 rounded-md border text-center transition-all ${
                    formData.schade === "ja"
                      ? "border-orange-600 bg-orange-50"
                      : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-stone-500" />
                  <span className="font-medium">Ja, er is schade</span>
                </button>
                <button
                  onClick={() => { updateForm("schade", "nee"); updateForm("schadeOmschrijving", ""); setSchadeFotos([]); }}
                  className={`p-4 rounded-md border text-center transition-all ${
                    formData.schade === "nee"
                      ? "border-orange-600 bg-orange-50"
                      : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-stone-500" />
                  <span className="font-medium">Nee, geen schade</span>
                </button>
              </div>
            </div>

            {formData.schade === "ja" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 mb-6"
              >
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Omschrijving van de schade
                  </label>
                  <textarea
                    value={formData.schadeOmschrijving}
                    onChange={(e) => updateForm("schadeOmschrijving", e.target.value)}
                    placeholder="Bijv. deuk in de achterbumper, motor maakt geluid"
                    rows={4}
                    className="w-full px-4 py-3 border border-stone-300 rounded-md focus:border-orange-600 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2 flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Foto&apos;s van de schade (optioneel)
                  </label>
                  <label className="flex items-center justify-center gap-2 p-4 border border-dashed border-stone-300 rounded-md cursor-pointer hover:border-stone-400 hover:bg-stone-50 transition-colors">
                    <Paperclip className="w-5 h-5 text-stone-400" />
                    <span className="text-stone-500">Klik om foto&apos;s toe te voegen</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files) {
                          setSchadeFotos((prev) => [...prev, ...Array.from(e.target.files!)]);
                        }
                      }}
                    />
                  </label>
                  {schadeFotos.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {schadeFotos.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-stone-50 rounded-lg p-3">
                          <div className="flex items-center gap-2 min-w-0">
                            <Camera className="w-4 h-4 text-stone-400 flex-shrink-0" />
                            <span className="text-sm text-stone-600 truncate">{file.name}</span>
                          </div>
                          <button
                            onClick={() => setSchadeFotos((prev) => prev.filter((_, i) => i !== index))}
                            className="text-red-400 hover:text-red-600 flex-shrink-0 ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-4 border border-stone-300 rounded-md text-stone-700 font-semibold hover:border-stone-300 transition-colors"
              >
                Terug
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!formData.schade || (formData.schade === "ja" && !formData.schadeOmschrijving)}
                className="flex-[2] py-4 bg-orange-600 rounded-md text-white font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Volgende
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Contact Info */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg p-6 md:p-8 border border-stone-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-stone-100 rounded-md flex items-center justify-center">
                <User className="w-6 h-6 text-stone-700" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-stone-900">Uw gegevens</h2>
                <p className="text-sm text-stone-500">Zodat we u het bod kunnen sturen</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Naam</label>
                <input
                  type="text"
                  value={formData.naam}
                  onChange={(e) => updateForm("naam", e.target.value)}
                  placeholder="Voornaam Achternaam"
                  className="w-full px-4 py-4 border border-stone-300 rounded-md focus:border-orange-600 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 w-5 h-5 text-stone-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                    placeholder="naam@email.nl"
                    className="w-full pl-12 pr-4 py-4 border border-stone-300 rounded-md focus:border-orange-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Telefoonnummer</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-4 w-5 h-5 text-stone-400" />
                  <input
                    type="tel"
                    value={formData.telefoon}
                    onChange={(e) => updateForm("telefoon", e.target.value)}
                    placeholder="06 123 45 678"
                    className="w-full pl-12 pr-4 py-4 border border-stone-300 rounded-md focus:border-orange-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-4 border border-stone-300 rounded-md text-stone-700 font-semibold hover:border-stone-300 transition-colors"
              >
                Terug
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={!formData.naam || !formData.email || !formData.telefoon}
                className="flex-[2] py-4 bg-orange-600 rounded-md text-white font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Volgende
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Verkoop Voorkeuren */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg p-6 md:p-8 border border-stone-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-stone-100 rounded-md flex items-center justify-center">
                <Clock className="w-6 h-6 text-stone-700" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-stone-900">Nog twee vragen</h2>
                <p className="text-sm text-stone-500">Dan kunnen we een passend bod doen</p>
              </div>
            </div>

            {/* Verkoop aan */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-700 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Aan wie wilt u verkopen?
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
                      className={`p-3 rounded-md border text-center transition-all ${
                        formData.verkoopAan === option.value
                          ? "border-orange-600 bg-orange-50"
                          : "border-stone-200 hover:border-stone-300"
                      }`}
                    >
                      <IconComponent className="w-8 h-8 mx-auto mb-1 text-stone-500" />
                      <span className="text-xs font-medium">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Wanneer verkopen */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-700 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Wanneer wilt u verkopen?
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
                      className={`w-full p-4 rounded-md border text-left transition-all flex items-center gap-3 ${
                        formData.verkoopTermijn === option.value
                          ? "border-orange-600 bg-orange-50"
                          : "border-stone-200 hover:border-stone-300"
                      }`}
                    >
                      <IconComponent className="w-5 h-5 text-stone-500 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-stone-900">{option.label}</div>
                        <div className="text-sm text-stone-500">{option.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-3">
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-4 border border-stone-300 rounded-md text-stone-700 font-semibold hover:border-stone-300 transition-colors"
              >
                Terug
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-[2] py-4 bg-orange-600 rounded-md text-white font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Versturen...
                  </>
                ) : (
                  <>
                    Aanvraag versturen
                    <CheckCircle className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-sm text-stone-400 mt-4 flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" />
              U ontvangt binnen 1 à 2 uur een bod
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
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600" />
      </div>
    }>
      <VerkoopForm />
    </Suspense>
  );
}
