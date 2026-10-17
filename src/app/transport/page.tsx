import Image from "next/image";
import { Check } from "lucide-react";
import { SiteHeader, SiteFooter, WhatsAppFloat, ContactButtons } from "@/components/site";

const WA_TEXT = "Hallo, ik wil graag een offerte voor autotransport. Van: ... Naar: ... Auto: ...";

const plans = [
  {
    name: "Standaard",
    price: "vanaf € 0,89",
    unit: "per km",
    features: ["Eén auto", "Binnen 5 werkdagen", "All-risk verzekerd", "Updates per e-mail"],
  },
  {
    name: "Express",
    price: "vanaf € 1,19",
    unit: "per km",
    features: [
      "Voorrang in de planning",
      "Binnen 48 uur",
      "All-risk verzekerd",
      "Live locatie via WhatsApp",
      "Ophalen en afleveren op adres",
    ],
    highlight: true,
  },
  {
    name: "Zakelijk",
    price: "op aanvraag",
    unit: "maatwerk",
    features: ["Meerdere auto's", "Vaste routes", "Eén vast aanspreekpunt", "Maandelijkse facturatie"],
  },
];

const faqs = [
  {
    q: "Hoe snel kan mijn auto worden opgehaald?",
    a: "Meestal zijn we binnen 24 tot 48 uur op locatie. Met Express plannen we uw transport met voorrang in.",
  },
  {
    q: "Is mijn auto verzekerd tijdens het transport?",
    a: "Ja. Alle transporten zijn all-risk verzekerd, van het moment van ophalen tot de aflevering.",
  },
  {
    q: "Kan ik zien waar mijn auto is?",
    a: "Bij Express en Zakelijk delen we de live locatie via WhatsApp, zodat u precies weet wanneer de auto aankomt.",
  },
  {
    q: "Naar welke landen rijden jullie?",
    a: "Binnen heel Nederland en naar alle landen van de Europese Unie, zoals België, Duitsland, Frankrijk, Spanje en Italië.",
  },
  {
    q: "Hoe wordt de prijs berekend?",
    a: "Op basis van de afstand, het type auto en hoe snel het moet. Stuur ons de ophaal- en afleverplaats en u krijgt een vaste prijs.",
  },
];

export default function TransportPage() {
  return (
    <div className="min-h-screen bg-white text-stone-900">
      <SiteHeader />

      <section className="relative overflow-hidden bg-stone-950">
        <Image
          src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">Autotransport</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            Uw auto veilig vervoerd, in Nederland en door heel Europa.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-300">
            Met NIWO-vergunning en all-risk verzekering. Stuur ons waar de auto vandaan komt en waar hij heen moet, dan
            krijgt u een vaste prijs.
          </p>
          <div className="mt-10">
            <ContactButtons dark waText={WA_TEXT} />
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-stone-50">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 px-4 sm:px-6 md:grid-cols-4">
          {[
            ["Vergunning", "NIWO"],
            ["Verzekering", "All-risk"],
            ["Ophalen", "binnen 48 uur"],
            ["Bereik", "heel de EU"],
          ].map(([label, value]) => (
            <div key={label} className="py-6">
              <dt className="text-sm text-stone-500">{label}</dt>
              <dd className="mt-1 text-xl font-bold">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Tarieven</h2>
          <p className="mt-3 max-w-2xl text-lg text-stone-600">
            Indicatieprijzen. De definitieve prijs hoort u vooraf, zonder bijkomende kosten.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`flex flex-col rounded-lg border p-7 ${
                  plan.highlight ? "border-stone-900 ring-1 ring-stone-900" : "border-stone-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  {plan.highlight && (
                    <span className="rounded bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-800">
                      Meest gekozen
                    </span>
                  )}
                </div>
                <p className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>{" "}
                  <span className="text-stone-500">{plan.unit}</span>
                </p>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm text-stone-700">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-600" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Zo verloopt een transport</h2>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Aanvraag", "U stuurt ophaaladres, afleveradres en het type auto via WhatsApp of telefoon."],
              ["Prijs en planning", "U krijgt een vaste prijs en een datum. Akkoord? Dan staat het in de planning."],
              ["Ophalen", "We halen de auto op op de afgesproken plek en tijd."],
              ["Afleveren", "De auto wordt afgeleverd op het adres van uw keuze."],
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

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Veelgestelde vragen</h2>
          <div className="mt-10 divide-y divide-stone-200 border-y border-stone-200">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                  {faq.q}
                  <span className="ml-4 text-xl text-stone-400 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-stone-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-900 py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Vraag een prijs aan</h2>
          <p className="mt-4 max-w-xl text-lg text-stone-300">
            Stuur van waar naar waar, en welke auto. U krijgt meestal binnen 30 minuten antwoord.
          </p>
          <div className="mt-8">
            <ContactButtons dark waText={WA_TEXT} />
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat text={WA_TEXT} />
    </div>
  );
}
