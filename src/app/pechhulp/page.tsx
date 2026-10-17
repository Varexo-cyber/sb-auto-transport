import Image from "next/image";
import { Battery, Fuel, CircleDot, AlertTriangle, Truck, Wrench } from "lucide-react";
import { SiteHeader, SiteFooter, WhatsAppFloat, ContactButtons } from "@/components/site";

const WA_TEXT = "Hallo, ik sta met pech. Mijn locatie is: ";

const services = [
  { icon: Battery, title: "Auto start niet", text: "Lege accu of startproblemen. We starten de auto ter plekke of nemen hem mee." },
  { icon: CircleDot, title: "Lekke band", text: "We wisselen het wiel, of brengen de auto weg als dat ter plekke niet lukt." },
  { icon: Fuel, title: "Brandstof op", text: "We brengen brandstof, zodat u zelf verder kunt rijden." },
  { icon: Truck, title: "Wegslepen", text: "Kan de auto niet meer rijden? We slepen hem naar uw garage, uw huis of een ander adres." },
  { icon: AlertTriangle, title: "Na een ongeval", text: "We halen de beschadigde auto weg en helpen u met wat er daarna geregeld moet worden." },
  { icon: Wrench, title: "Kleine reparaties", text: "Veel storingen zijn langs de kant van de weg te verhelpen. Dan kunt u gewoon door." },
];

export default function PechhulpPage() {
  return (
    <div className="min-h-screen bg-white text-stone-900">
      <SiteHeader />

      <section className="relative overflow-hidden bg-stone-950">
        <Image
          src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1920&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">Pechhulp & sleepdienst</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            Pech onderweg? We komen naar u toe.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-300">
            Dag en nacht bereikbaar, zonder lidmaatschap. Stuur uw locatie via WhatsApp en we laten direct weten hoe
            snel we er kunnen zijn.
          </p>
          <div className="mt-10">
            <ContactButtons dark waText={WA_TEXT} />
          </div>
        </div>
      </section>

      <section className="border-b border-orange-200 bg-orange-50">
        <div className="mx-auto max-w-6xl px-4 py-5 text-sm text-orange-900 sm:px-6">
          <strong>Staat u op de snelweg?</strong> Ga achter de vangrail staan, trek een veiligheidshesje aan en zet de
          gevarendriehoek neer als dat veilig kan. Neem daarna contact op.
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Waarmee we helpen</h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-stone-200 bg-stone-200 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="bg-white p-6">
                <s.icon className="h-6 w-6 text-orange-600" />
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-stone-600">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Wat kost het?</h2>
            <p className="mt-4 text-lg leading-relaxed text-stone-600">
              U heeft geen abonnement nodig. De prijs hangt af van de situatie: waar u staat, wat er mis is en of de
              auto weggesleept moet worden. U hoort de prijs voordat we vertrekken.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-stone-200 bg-white p-6">
              <h3 className="font-semibold">Standaard</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                Voor pech zonder haast, bijvoorbeeld een auto die thuis niet start.
              </p>
            </div>
            <div className="rounded-lg border border-stone-200 bg-white p-6">
              <h3 className="font-semibold">Spoed</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                U staat langs de weg en moet zo snel mogelijk geholpen worden. Krijgt voorrang.
              </p>
            </div>
            <p className="text-sm text-stone-500 sm:col-span-2">Afrekenen gebeurt ter plaatse.</p>
          </div>
        </div>
      </section>

      <section className="bg-stone-900 py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Staat u nu stil?</h2>
          <p className="mt-4 max-w-xl text-lg text-stone-300">
            Stuur uw locatie via WhatsApp of bel ons. We zijn dag en nacht bereikbaar.
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
