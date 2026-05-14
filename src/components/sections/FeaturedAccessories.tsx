import { products } from "@/data/products";
import { ProductCard } from "../ProductCard";
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

export const FeaturedAccessories = () => {
  // Include both existing and newly requested products for "Latest arrivals in accessories"
  const featuredIds = ["p35", "p36", "p37", "p39", "p40", "p41", "p45", "p46", "p47", "p50", "p51", "p52", "p53", "p54", "p58", "p60", "p63", "p64", "p65", "p66", "p68", "p70", "p69"];
  const featured = products.filter((p) => featuredIds.includes(p.id)).slice(0, 12);

  return (
    <section className="container py-16 lg:py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-destructive text-xs font-bold uppercase tracking-[0.25em] mb-3 inline-flex items-center gap-2">
            <Zap className="size-4" /> Featured Accessories
          </p>
          <h2 className="text-3xl lg:text-5xl font-display font-bold tracking-tight">
            Latest arrivals in accessories
          </h2>
        </div>
        <Link to="/shop?category=Accessories" className="text-sm font-bold text-primary border-b border-primary/30 pb-1 hover:border-primary self-start md:self-auto">
          View all accessories →
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {featured.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};