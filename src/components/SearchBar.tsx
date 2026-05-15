import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { products, formatKES } from "@/data/products";

export const SearchBar = ({ onClose }: { onClose?: () => void }) => {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const results = q.trim().length > 0
    ? products
        .filter((p) =>
          [p.name, p.brand, p.category].join(" ").toLowerCase().includes(q.toLowerCase()),
        )
        .slice(0, 6)
    : [];

  return (
    <div ref={ref} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search phones, TVs, accessories…"
          aria-label="Search products"
          className="w-full h-11 pl-10 pr-10 rounded-xl bg-secondary border border-border focus:border-primary/60 focus:bg-background outline-none transition-smooth text-sm placeholder:text-muted-foreground"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate(`/shop?q=${encodeURIComponent(q)}`);
              setOpen(false);
              onClose?.();
            }
          }}
        />
        {q && (
          <button
            onClick={() => setQ("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
      {open && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 glass rounded-xl shadow-elegant overflow-hidden z-50 animate-fade-up">
          <ul>
            {results.map((p) => (
              <li key={p.id}>
                <Link
                  to={`/product/${p.id}`}
                  onClick={() => {
                    setOpen(false);
                    onClose?.();
                  }}
                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-accent transition-smooth"
                >
                  <img src={p.images[0]} alt="" className="size-10 rounded-lg object-cover bg-muted" loading="lazy" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.brand} · {p.category}</div>
                  </div>
                  <div className="text-sm font-bold text-primary whitespace-nowrap">
                    {formatKES(p.retailPrice)}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
