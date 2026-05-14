import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { products, brands, allCategories, Category } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";

const Shop = () => {
  const [params, setParams] = useSearchParams();
  const initialCat = params.get("category") as Category | null;
  const initialQ = params.get("q") ?? "";

  const [selectedCats, setSelectedCats] = useState<Category[]>(initialCat ? [initialCat] : []);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [q, setQ] = useState(initialQ);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    document.title = "Shop Electronics — Kijanaa";
  }, []);

  useEffect(() => {
    const next = new URLSearchParams(params);
    if (selectedCats.length === 1) next.set("category", selectedCats[0]); else next.delete("category");
    if (q) next.set("q", q); else next.delete("q");
    setParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCats, q]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (selectedCats.length && !selectedCats.includes(p.category)) return false;
      if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
      const price = p.category === "Accessories" ? p.wholesalePrice : p.retailPrice;
      if (price > maxPrice) return false;
      if (q && !`${p.name} ${p.brand}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [selectedCats, selectedBrands, maxPrice, q]);

  const toggle = <T,>(arr: T[], v: T) =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  const FiltersPanel = (
    <aside className="space-y-6">
      <div className="rounded-2xl bg-card border border-border p-5">
        <h3 className="font-display font-semibold mb-3">Category</h3>
        <div className="space-y-2">
          {allCategories.map((c) => (
            <label key={c} className="flex items-center gap-2.5 text-sm cursor-pointer hover:text-primary">
              <input
                type="checkbox"
                checked={selectedCats.includes(c)}
                onChange={() => setSelectedCats((s) => toggle(s, c))}
                className="size-4 rounded border-border text-primary focus:ring-primary"
              />
              {c}
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-card border border-border p-5">
        <h3 className="font-display font-semibold mb-3">Brand</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {brands.map((b) => (
            <label key={b} className="flex items-center gap-2.5 text-sm cursor-pointer hover:text-primary">
              <input
                type="checkbox"
                checked={selectedBrands.includes(b)}
                onChange={() => setSelectedBrands((s) => toggle(s, b))}
                className="size-4 rounded border-border text-primary focus:ring-primary"
              />
              {b}
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-card border border-border p-5">
        <h3 className="font-display font-semibold mb-3">Max price</h3>
        <input
          type="range"
          min={1000}
          max={100000}
          step={1000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
          <span>KES 1,000</span>
          <span className="font-bold text-primary">KES {maxPrice.toLocaleString()}</span>
        </div>
      </div>

      {(selectedCats.length || selectedBrands.length || maxPrice < 100000 || q) ? (
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => {
            setSelectedCats([]);
            setSelectedBrands([]);
            setMaxPrice(100000);
            setQ("");
          }}
        >
          Clear all filters
        </Button>
      ) : null}
    </aside>
  );

  return (
    <div className="container py-10 lg:py-16">
      <header className="mb-8">
        <h1 className="font-display text-3xl lg:text-5xl font-bold tracking-tight">
          Shop <span className="text-plasma">Electronics</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          {filtered.length} products · Retail & wholesale · Nationwide delivery
        </p>
      </header>

      <div className="lg:hidden mb-4 flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search…"
          className="flex-1 h-11 px-4 rounded-xl bg-secondary border border-border outline-none focus:border-primary"
        />
        <Button variant="outline" onClick={() => setShowFilters((s) => !s)}>
          <Filter className="size-4" /> Filters
        </Button>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-8">
        <div className={`${showFilters ? "block" : "hidden"} lg:block`}>{FiltersPanel}</div>

        <div>
          <div className="hidden lg:flex items-center justify-between mb-4">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search within results…"
              className="h-11 px-4 w-72 rounded-xl bg-secondary border border-border outline-none focus:border-primary"
            />
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No products match your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
