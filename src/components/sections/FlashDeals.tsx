import { products } from "@/data/products";
import { ProductCard } from "../ProductCard";
import { Flame } from "lucide-react";
import { Link } from "react-router-dom";

export const FlashDeals = () => {
  const deals = products.filter((p) => p.badge).slice(0, 8);

  return (
    <section className="container py-16 lg:py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-destructive text-xs font-bold uppercase tracking-[0.25em] mb-3 inline-flex items-center gap-2">
            <Flame className="size-4" /> Flash Deals
          </p>
          <h2 className="text-3xl lg:text-5xl font-display font-bold tracking-tight">
            Trending now in Mwingi
          </h2>
        </div>
        <Link to="/shop" className="text-sm font-bold text-primary border-b border-primary/30 pb-1 hover:border-primary self-start md:self-auto">
          See all deals →
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {deals.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};
