import { Button } from "@/components/ui/button";
import { services } from "@/data/products";
import { ArrowRight, Printer } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Services = () => {
  useEffect(() => { document.title = "Cyber Services — Kijanaa Electronics"; }, []);

  return (
    <>
      <section className="container py-12 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-3">Cyber Services</p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold tracking-tight mb-5">
            All your <span className="text-plasma">digital paperwork</span>, sorted
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            From KRA returns and passport applications to printing and design — our Mwingi cyber desk is fast,
            friendly and affordable.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="plasma" size="xl">
              <a href="https://wa.me/254769964404?text=Hi%2C%20I%27d%20like%20to%20request%20a%20cyber%20service">
                Request Service
              </a>
            </Button>
            <Button asChild variant="outline" size="xl"><Link to="/contact">Visit Store</Link></Button>
          </div>
        </div>
      </section>

      <section className="container pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <div
              key={s.name}
              className="group rounded-2xl bg-card border border-border p-6 hover:border-primary/40 hover:shadow-elegant transition-smooth animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="size-12 rounded-xl bg-accent text-primary flex items-center justify-center mb-4 group-hover:bg-plasma group-hover:text-primary-foreground transition-smooth">
                <Printer className="size-5" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{s.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{s.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-sm font-bold text-primary">{s.price}</span>
                <a
                  href="https://wa.me/254769964404"
                  className="text-xs font-bold inline-flex items-center gap-1 text-foreground hover:text-primary"
                >
                  Request <ArrowRight className="size-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Services;
