import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import {
  SiteHeader,
  SiteFooter,
  WhatsAppFloat,
  ContactButtons,
} from "@/components/site";
import { PHONE_TEL, PHONE_DISPLAY, EMAIL, ADDRESS, MAPS_URL } from "@/components/contact";

const services = [
  {
    href: "/pechhulp",
    title: "Pechhulp & sleepdienst",
    text: "Auto start niet, lekke band of een ongeluk gehad? We komen naar u toe en slepen de auto weg als het ter plekke niet op te lossen is.",
    points: ["Dag en nacht bereikbaar", "Geen lidmaatschap nodig", "Alle merken en modellen"],
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1200&q=80",
  },
  {
    href: "/transport",
    title: "Autotransport",
    text: "Een auto van A naar B, binnen Nederland of naar het buitenland. Opgehaald en afgeleverd op het adres dat u opgeeft.",
    points: ["NIWO-vergunning", "All-risk verzekerd", "Heel Europa"],
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=80",
  },
  {
    href: "/inkoop",
    title: "Auto verkopen",
    text: "Vul uw kenteken in, stuur een paar foto's en u krijgt een bod. Akkoord? Dan halen we de auto op en betalen direct.",
    points: ["Bod binnen 1 à 2 uur", "Ook schade- en sloopauto's", "Papierwerk geregeld"],
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=80",
  },
];

const facts = [
  { label: "Bereikbaar", value: "24/7" },
  { label: "Vergunning", value: "NIWO" },
  { label: "Verzekering", value: "All-risk" },
  { label: "Werkgebied", value: "NL & EU" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-stone-900">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-stone-950">
        <Image
          src="https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1920&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
            Rotterdam · dag en nacht bereikbaar
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Pech, transport of uw auto verkopen? Eén nummer.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-300">
            DirectAutoHulp helpt bij pech langs de weg, sleept uw auto weg, vervoert auto&apos;s door heel Europa en
            koopt uw auto in. Stuur een WhatsApp en u hoort snel van ons.
          </p>
          <div className="mt-10">
            <ContactButtons dark />
          </div>
        </div>
      </section>

      {/* Facts bar */}
      <section className="border-b border-stone-200 bg-stone-50">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 divide-stone-200 px-4 sm:px-6 md:grid-cols-4 md:divide-x">
          {facts.map((f) => (
            <div key={f.label} className="py-6 md:px-6 md:first:pl-0">
              <dt className="text-sm text-stone-500">{f.label}</dt>
              <dd className="mt-1 text-2xl font-bold">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Services */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Waar we mee helpen</h2>
          <p className="mt-3 max-w-2xl text-lg text-stone-600">
            Drie diensten, één aanspreekpunt. U belt of appt ons en wij regelen de rest.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] bg-stone-200">
                  <Image src={s.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-stone-600">{s.text}</p>
                  <ul className="mt-5 space-y-2 text-sm text-stone-700">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2">
                        <Check className="h-4 w-4 flex-shrink-0 text-orange-600" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-orange-600">
                    Meer informatie
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-stone-50 py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Zo werkt het</h2>
            <p className="mt-3 text-lg text-stone-600">
              Geen formulieren met tien stappen. Een bericht of telefoontje is genoeg.
            </p>
          </div>
          <ol className="space-y-8">
            {[
              {
                title: "Stuur een WhatsApp of bel",
                text: "Vertel waar u bent en wat er aan de hand is. Een foto of uw kenteken helpt ons om meteen goed te kunnen inschatten.",
              },
              {
                title: "U krijgt een prijs vooraf",
                text: "We zeggen eerlijk wat het kost en hoe snel we er kunnen zijn. Pas als u akkoord geeft, gaan we rijden.",
              },
              {
                title: "Wij komen in actie",
                text: "Pechhulp ter plaatse, de auto op de wagen of het bod uitbetaald. U wordt onderweg op de hoogte gehouden.",
              },
            ].map((step, i) => (
              <li key={step.title} className="flex gap-5">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-stone-900 font-semibold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-1 leading-relaxed text-stone-600">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Waarom DirectAutoHulp</h2>
          <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {[
              {
                title: "Erkend en verzekerd",
                text: "We hebben een NIWO-vergunning voor beroepsvervoer en alle transporten zijn all-risk verzekerd. Ingeschreven bij de KvK onder 87769743.",
              },
              {
                title: "Altijd iemand aan de lijn",
                text: "Pech houdt zich niet aan kantoortijden. U bereikt ons dag en nacht, ook in het weekend, via telefoon en WhatsApp.",
              },
              {
                title: "Duidelijke prijzen",
                text: "U hoort vooraf wat het kost. Geen abonnement, geen verrassingen achteraf op de factuur.",
              },
              {
                title: "Alles onder één dak",
                text: "Is de auto na de pech niet meer de moeite waard? Dan kunnen we u meteen een bod doen. Eén partij, één afspraak.",
              },
            ].map((item) => (
              <div key={item.title} className="border-l-2 border-orange-600 pl-5">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-stone-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-stone-900 py-20 text-white sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Hulp nodig? Neem direct contact op.</h2>
            <p className="mt-4 text-lg text-stone-300">
              Via WhatsApp krijgt u het snelst antwoord. Liever bellen kan natuurlijk ook.
            </p>
            <div className="mt-8">
              <ContactButtons dark />
            </div>
          </div>
          <dl className="grid gap-6 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-stone-400">Telefoon</dt>
              <dd className="mt-1 text-base font-medium"><a href={PHONE_TEL} className="hover:text-orange-400">{PHONE_DISPLAY}</a></dd>
            </div>
            <div>
              <dt className="text-stone-400">E-mail</dt>
              <dd className="mt-1 text-base font-medium"><a href={`mailto:${EMAIL}`} className="hover:text-orange-400">{EMAIL}</a></dd>
            </div>
            <div>
              <dt className="text-stone-400">Adres</dt>
              <dd className="mt-1 text-base font-medium">
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-orange-400">{ADDRESS}</a>
              </dd>
            </div>
            <div>
              <dt className="text-stone-400">Openingstijden</dt>
              <dd className="mt-1 text-base font-medium">24 uur per dag, 7 dagen per week</dd>
            </div>
          </dl>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
