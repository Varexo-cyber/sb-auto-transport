"use client";

import Link from "next/link";
import Image from "next/image";
import { Car, X, Search, AlertCircle, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { SiteHeader, SiteFooter, WhatsAppFloat, ContactButtons } from "@/components/site";

const WA_TEXT = "Hallo, ik wil mijn auto verkopen. Kenteken: ";

// RDW API Types - UITGEBREID met alle beschikbare velden
interface RDWVehicleData {
  kenteken: string;
  voertuigsoort: string;
  merk: string;
  handelsbenaming: string;
  eerste_kleur: string;
  tweede_kleur?: string;
  catalogusprijs: string;
  massa_rijklaar: string;
  massa_ledig_voertuig?: string;
  aantal_zitplaatsen: string;
  aantal_deuren: string;
  aantal_wielen?: string;
  brandstof_omschrijving?: string;
  brandstof_omschrijving_2?: string;
  zuinigheidsclassificatie: string;
  datum_eerste_toelating: string;
  datum_eerste_afgifte_nederland?: string;
  datum_eerste_tenaamstelling?: string;
  wielbasis: string;
  export_indicator: string;
  wam_verzekerd: string;
  aantal_cilinders: string;
  cilinderinhoud: string;
  nettomaximumvermogen?: string;
  toerental_geregistreerd?: string;
  breedte: string;
  lengte: string;
  hoogte_voertuig?: string;
  maximum_massa_trekken_ongeremd?: string;
  maximum_massa_trekken_geremd?: string;
  apk_vervaldatum?: string;
  vervaldatum_apk?: string;
  aantal_rolstoelplaatsen?: string;
  snelheidsbegrenzer?: string;
  laadvermogen?: string;
  voertuigklasse?: string;
  inrichting?: string;
  uitvoering?: string;
}

// RDW API Service
// Fetch Vehicle Image from CarQuery API (free)
async function fetchVehicleImage(merk: string, model: string): Promise<string | null> {
  try {
    // Use Wikipedia API for car images
    const searchQuery = `${merk} ${model}`.replace(/\s+/g, '_');
    const wikiResponse = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(merk + ' ' + model)}&format=json&origin=*`
    );
    
    if (wikiResponse.ok) {
      const wikiData = await wikiResponse.json();
      if (wikiData.query?.search?.length > 0) {
        const pageTitle = wikiData.query.search[0].title;
        const imageResponse = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(pageTitle)}&prop=pageimages&format=json&pithumbsize=500&origin=*`
        );
        
        if (imageResponse.ok) {
          const imageData = await imageResponse.json();
          const pages = imageData.query?.pages;
          if (pages) {
            const pageId = Object.keys(pages)[0];
            if (pages[pageId]?.thumbnail?.source) {
              return pages[pageId].thumbnail.source;
            }
          }
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error("Image fetch error:", error);
    return null;
  }
}

async function fetchRDWVehicleData(kenteken: string): Promise<{ vehicle: RDWVehicleData | null; image: string | null }> {
  try {
    const formattedKenteken = kenteken.replace(/-/g, "").toUpperCase();
    
    // Haal voertuiggegevens op
    const response = await fetch(
      `https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=${formattedKenteken}`
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch vehicle data");
    }
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      const vehicle = data[0] as RDWVehicleData;
      
      // Haal afbeelding op
      const image = await fetchVehicleImage(vehicle.merk, vehicle.handelsbenaming);
      
      return { vehicle, image };
    }
    
    return { vehicle: null, image: null };
  } catch (error) {
    console.error("RDW API Error:", error);
    return { vehicle: null, image: null };
  }
}

function LicensePlateInput({ onSubmit }: { onSubmit: (plate: string) => void }) {
  const [plate, setPlate] = useState("");
  const isValid = plate.replace(/-/g, "").length >= 6;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (isValid) onSubmit(plate);
      }}
      className="w-full max-w-md"
    >
      <label htmlFor="kenteken" className="block text-sm font-medium text-stone-300">
        Uw kenteken
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 overflow-hidden rounded-md border-2 border-stone-900 bg-[#FFCC00]">
          <span className="flex w-10 items-end justify-center bg-[#003DA5] pb-1.5 text-xs font-bold text-white">NL</span>
          <input
            id="kenteken"
            type="text"
            value={plate}
            onChange={(e) => setPlate(e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, ""))}
            placeholder="AB-123-C"
            maxLength={8}
            autoComplete="off"
            className="w-full bg-transparent px-3 py-3 text-center text-2xl font-bold uppercase tracking-widest text-black placeholder-black/30 outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={!isValid}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-stone-600 disabled:text-stone-300"
        >
          <Search className="h-5 w-5" />
          Opzoeken
        </button>
      </div>
    </form>
  );
}

function VehicleInfoPopup({ plate, onClose }: { plate: string; onClose: () => void }) {
  const [loading, setLoading] = useState(true);
  const [vehicleData, setVehicleData] = useState<RDWVehicleData | null>(null);
  const [vehicleImage, setVehicleImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchRDWVehicleData(plate);
        if (result.vehicle) {
          setVehicleData(result.vehicle);
          setVehicleImage(result.image);
        } else {
          setError("We vinden geen auto bij dit kenteken. Controleer of u het goed heeft ingevuld.");
        }
      } catch {
        setError("Het opzoeken is niet gelukt. Probeer het nog eens of stuur ons uw kenteken via WhatsApp.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [plate]);

  const formatDate = (dateStr: string) => {
    if (!dateStr || dateStr.length !== 8) return "Onbekend";
    return `${dateStr.substring(6, 8)}-${dateStr.substring(4, 6)}-${dateStr.substring(0, 4)}`;
  };

  const getBrandstof = () => {
    if (vehicleData?.brandstof_omschrijving && vehicleData.brandstof_omschrijving !== "Niet geregistreerd") {
      return vehicleData.brandstof_omschrijving;
    }
    if (vehicleData?.brandstof_omschrijving_2 && vehicleData.brandstof_omschrijving_2 !== "Niet geregistreerd") {
      return vehicleData.brandstof_omschrijving_2;
    }
    return "Onbekend";
  };

  const details: [string, string][] = vehicleData
    ? [
        ["Voertuigsoort", vehicleData.voertuigsoort || "Onbekend"],
        ["Kleur", vehicleData.eerste_kleur || "Onbekend"],
        ["Brandstof", getBrandstof()],
        [
          "Vermogen",
          vehicleData.nettomaximumvermogen
            ? `${Math.round(parseInt(vehicleData.nettomaximumvermogen) / 1.36)} pk`
            : "Onbekend",
        ],
        ["Cilinderinhoud", vehicleData.cilinderinhoud ? `${vehicleData.cilinderinhoud} cc` : "Onbekend"],
        ["Gewicht", vehicleData.massa_rijklaar ? `${vehicleData.massa_rijklaar} kg` : "Onbekend"],
        ["Deuren", vehicleData.aantal_deuren || "Onbekend"],
        ["Zitplaatsen", vehicleData.aantal_zitplaatsen || "Onbekend"],
        ["Eerste toelating", formatDate(vehicleData.datum_eerste_toelating)],
        ...(vehicleData.apk_vervaldatum
          ? ([["APK geldig tot", formatDate(vehicleData.apk_vervaldatum)]] as [string, string][])
          : []),
      ]
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div
        className="relative max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Sluiten"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-stone-900 hover:bg-stone-200"
        >
          <X className="h-5 w-5" />
        </button>

        {loading ? (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-orange-600 border-t-transparent" />
            <p className="text-stone-600">Gegevens van {plate} opzoeken bij de RDW…</p>
          </div>
        ) : error ? (
          <div className="py-10 text-center">
            <AlertCircle className="mx-auto h-10 w-10 text-orange-600" />
            <p className="mx-auto mt-4 max-w-sm text-stone-700">{error}</p>
            <button
              onClick={onClose}
              className="mt-6 rounded-md bg-stone-100 px-6 py-2.5 font-semibold text-stone-900 hover:bg-stone-200"
            >
              Sluiten
            </button>
          </div>
        ) : vehicleData ? (
          <div>
            <div className="relative mb-6 h-48 w-full overflow-hidden rounded-md bg-stone-100 sm:h-64">
              {vehicleImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={vehicleImage}
                  alt={`${vehicleData.merk} ${vehicleData.handelsbenaming}`}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Car className="h-16 w-16 text-stone-300" />
                </div>
              )}
            </div>

            <p className="text-sm text-stone-500">Kenteken {plate.toUpperCase()}</p>
            <h2 className="text-2xl font-bold text-stone-900">
              {vehicleData.merk} {vehicleData.handelsbenaming}
            </h2>

            <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-stone-200 pt-5 text-sm sm:grid-cols-3">
              {details.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-stone-500">{label}</dt>
                  <dd className="font-medium text-stone-900">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/verkoop?kenteken=${plate.toUpperCase()}&merk=${encodeURIComponent(vehicleData.merk)}&model=${encodeURIComponent(vehicleData.handelsbenaming)}&kleur=${encodeURIComponent(vehicleData.eerste_kleur)}&brandstof=${encodeURIComponent(vehicleData.brandstof_omschrijving || "")}&prijs=${vehicleData.catalogusprijs || ""}&image=${encodeURIComponent(vehicleImage || "")}`}
                className="flex-1 rounded-md bg-orange-600 py-3 text-center font-semibold text-white hover:bg-orange-700"
              >
                Dit is mijn auto, ga verder
              </Link>
              <button
                onClick={onClose}
                className="flex-1 rounded-md border border-stone-300 py-3 font-semibold text-stone-700 hover:bg-stone-50"
              >
                Ander kenteken
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-stone-400">Voertuiggegevens: RDW · Foto: Wikipedia</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function InkoopPage() {
  const [submittedPlate, setSubmittedPlate] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white text-stone-900">
      <SiteHeader />

      <section id="kenteken-check" className="relative overflow-hidden bg-stone-950">
        <Image
          src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1920&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/85 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">Auto verkopen</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            Verkoop uw auto zonder gedoe.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-300">
            Vul uw kenteken in en vertel ons iets over de staat van de auto. U krijgt binnen 1 à 2 uur een bod. Akkoord?
            Dan halen we de auto op en krijgt u direct uw geld.
          </p>
          <div className="mt-10">
            <LicensePlateInput onSubmit={setSubmittedPlate} />
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-300">
            {["Gratis en vrijblijvend", "Ook schade- en sloopauto's", "Papierwerk geregeld"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-orange-500" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Zo werkt het</h2>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Kenteken invullen", "We halen de gegevens van uw auto op bij de RDW."],
              ["Staat doorgeven", "Kilometerstand, eventuele schade en een paar foto's."],
              ["Bod ontvangen", "Binnen 1 à 2 uur hoort u wat wij voor de auto willen betalen."],
              ["Ophalen en betalen", "We halen de auto op, regelen de overschrijving en betalen direct uit."],
            ].map(([title, text], i) => (
              <li key={title}>
                <span className="text-sm font-semibold text-orange-600">Stap {i + 1}</span>
                <h3 className="mt-2 text-lg font-semibold">{title}</h3>
                <p className="mt-2 leading-relaxed text-stone-600">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-stone-50 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Welke auto&apos;s kopen we?</h2>
          <p className="mt-3 max-w-2xl text-lg text-stone-600">
            Eigenlijk alles. Of de auto nu nieuw is, een hoge kilometerstand heeft of niet meer rijdt.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              ["Gebruikte auto's", "Alle merken en modellen, ook met een hoge kilometerstand."],
              ["Luxe en sport", "Mercedes-Benz, BMW, Audi, Porsche en andere premium merken."],
              ["Schade en sloop", "Motorschade, total loss of gewoon op. Ook die halen we op."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-lg border border-stone-200 bg-white p-6">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 leading-relaxed text-stone-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-x-12 gap-y-10 px-4 sm:grid-cols-3 sm:px-6">
          {[
            ["Eerlijk bod", "Een marktconforme prijs, zonder verborgen kosten of afslag achteraf."],
            ["Gratis ophalen", "We halen de auto op waar hij staat, in heel Nederland."],
            ["Direct betaald", "Na akkoord staat het geld direct op uw rekening. De overschrijving regelen wij."],
          ].map(([title, text]) => (
            <div key={title} className="border-l-2 border-orange-600 pl-5">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 leading-relaxed text-stone-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-stone-900 py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Liever direct contact?</h2>
          <p className="mt-4 max-w-xl text-lg text-stone-300">
            Stuur uw kenteken en een paar foto&apos;s via WhatsApp. Dan krijgt u zo snel mogelijk een bod.
          </p>
          <div className="mt-8">
            <ContactButtons dark waText={WA_TEXT} />
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat text={WA_TEXT} />

      {submittedPlate && <VehicleInfoPopup plate={submittedPlate} onClose={() => setSubmittedPlate(null)} />}
    </div>
  );
}
