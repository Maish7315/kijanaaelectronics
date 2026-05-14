import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, CheckCircle2, Percent, Truck, Users } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useEffect } from "react";

const Wholesale = () => {
  useEffect(() => { document.title = "Wholesale — Kijanaa Electronics"; }, []);

  const featured = products.slice(0, 8);

  return (
    <>
      <section className="container py-12 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-3">Wholesale</p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold tracking-tight mb-5">
            Stock your shop with <span className="text-plasma">trusted electronics</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            We supply phone shops, supermarkets and resellers across Kenya with genuine devices at
            competitive bulk prices. Order online or visit our Mwingi warehouse.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="plasma" size="xl"><Link to="/shop">Browse catalog</Link></Button>
            <Button asChild variant="outline" size="xl">
              <a href="https://wa.me/254769964404?text=Hi%2C%20I%27m%20interested%20in%20wholesale%20pricing">
                Talk to a rep
              </a>
            </Button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
          {[
            { icon: Percent, title: "Up to 25% off", text: "Bulk discounts on every category." },
            { icon: Users, title: "Dedicated rep", text: "A real human handles your account." },
            { icon: Truck, title: "Countrywide logistics", text: "We deliver via SGR, courier or matatu." },
            { icon: Building2, title: "Business invoicing", text: "Proper receipts & invoices for your books." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl bg-card border border-border p-5">
              <div className="size-10 rounded-xl bg-accent text-primary flex items-center justify-center mb-3">
                <Icon className="size-5" />
              </div>
              <h3 className="font-display font-semibold mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container pb-16 lg:pb-24">
        <div className="rounded-3xl bg-surface-elevated border border-border p-8 lg:p-12">
          <h2 className="font-display text-2xl lg:text-3xl font-bold tracking-tight mb-6">How it works</h2>
          <ol className="grid md:grid-cols-3 gap-6">
            {[
              "Browse our catalog or contact us with your list",
              "Get a wholesale quote with bulk pricing",
              "Pay securely & we ship anywhere in Kenya",
            ].map((step, i) => (
              <li key={step} className="flex gap-4">
                <div className="size-9 rounded-full bg-plasma text-primary-foreground font-display font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </div>
                <p className="font-medium pt-1">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container pb-20">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display text-2xl lg:text-3xl font-bold tracking-tight">Popular for resellers</h2>
          <Link to="/shop" className="text-sm font-bold text-primary">View all →</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </>
  );
};

export default Wholesale;
