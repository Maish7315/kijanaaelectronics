import { Star } from "lucide-react";

const testimonials = [
  {
    name: "James Mutua",
    location: "Mwingi",
    text: "Bought my Tecno Camon from Kijanaa — genuine, well-priced and they even helped set it up. My go-to shop now.",
  },
  {
    name: "Faith Wanjiru",
    location: "Nairobi",
    text: "Ordered a 43\" Amaya TV and it was delivered to Nairobi in 2 days. Packaging was excellent. Highly recommend.",
  },
  {
    name: "Patrick Kioko",
    location: "Kitui",
    text: "Their cyber services saved me hours on KRA returns. Friendly staff and very professional.",
  },
];

export const Testimonials = () => (
  <section className="container py-16 lg:py-24">
    <div className="text-center mb-12">
      <p className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-3">Loved by Customers</p>
      <h2 className="text-3xl lg:text-5xl font-display font-bold tracking-tight">
        Trusted across Kenya
      </h2>
    </div>

    <div className="grid md:grid-cols-3 gap-5">
      {testimonials.map((t, i) => (
        <div
          key={t.name}
          className="rounded-2xl bg-card border border-border p-6 hover:border-primary/40 hover:shadow-elegant transition-smooth animate-fade-up"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="flex gap-0.5 mb-4">
            {[...Array(5)].map((_, j) => (
              <Star key={j} className="size-4 fill-warning text-warning" />
            ))}
          </div>
          <p className="text-foreground/90 leading-relaxed mb-5">"{t.text}"</p>
          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <div className="size-10 rounded-full bg-plasma flex items-center justify-center font-display font-bold text-primary-foreground">
              {t.name[0]}
            </div>
            <div>
              <div className="font-semibold text-sm">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.location}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);
