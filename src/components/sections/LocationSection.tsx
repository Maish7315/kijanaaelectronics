import { Clock, MapPin, Phone } from "lucide-react";

export const LocationSection = () => (
  <section className="container py-16 lg:py-24">
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      <div>
        <p className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-3">Visit Our Shop</p>
        <h2 className="text-3xl lg:text-5xl font-display font-bold tracking-tight mb-4">
          Find us in <span className="text-plasma">Mwingi Town</span>
        </h2>
        <p className="text-muted-foreground mb-8 max-w-lg">
          Walk in to see, test and pick up your devices. We're right in the heart of Mwingi, Kitui County.
        </p>

        <ul className="space-y-4">
          <li className="flex items-start gap-4">
            <div className="size-10 rounded-xl bg-accent text-primary flex items-center justify-center shrink-0">
              <MapPin className="size-5" />
            </div>
            <div>
              <div className="font-semibold">Mwingi Town</div>
              <div className="text-sm text-muted-foreground">Kitui County, Kenya</div>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="size-10 rounded-xl bg-accent text-primary flex items-center justify-center shrink-0">
              <Clock className="size-5" />
            </div>
            <div>
              <div className="font-semibold">Open Mon – Sat</div>
              <div className="text-sm text-muted-foreground">8:00 AM – 8:00 PM · Sun 10:00 – 4:00</div>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="size-10 rounded-xl bg-accent text-primary flex items-center justify-center shrink-0">
              <Phone className="size-5" />
            </div>
            <div>
              <div className="font-semibold">+254769964404</div>
              <div className="text-sm text-muted-foreground">Call or WhatsApp anytime</div>
            </div>
          </li>
        </ul>
      </div>

      <div className="rounded-3xl overflow-hidden border border-border shadow-elegant aspect-[4/3] lg:aspect-square">
        <iframe
          title="Kijanaa Electronics location in Mwingi"
          src="https://www.google.com/maps?q=Mwingi,Kitui,Kenya&output=embed"
          className="w-full h-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  </section>
);
