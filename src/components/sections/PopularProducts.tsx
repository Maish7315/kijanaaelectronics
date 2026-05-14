import { products } from "@/data/products";
import { ProductCard } from "../ProductCard";

export const PopularProducts = () => {
  // List of product IDs for the specific products requested
  const popularIds = ["p45", "p51", "p58", "p54", "p52", "p58", "p53", "p63", "p64", "p65", "p70", "p68", "p66", "p69"];
  const popular = products.filter((p) => popularIds.includes(p.id)).slice(0, 12); // Limit to 12 for good arrangement

  return (
    <section className="container py-16 lg:py-24">
      <div className="text-center mb-10">
        <p className="text-destructive text-xs font-bold uppercase tracking-[0.25em] mb-3">
          Popular Products
        </p>
        <h2 className="text-3xl lg:text-5xl font-display font-bold tracking-tight">
          Customer Favorites
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {popular.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};