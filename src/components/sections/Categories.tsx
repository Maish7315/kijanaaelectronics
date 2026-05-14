import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/products";

export const Categories = () => (
  <section className="container py-16 lg:py-24">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
      <div>
        <p className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-3">Shop by Category</p>
        <h2 className="text-3xl lg:text-5xl font-display font-bold tracking-tight">
          Everything tech, <span className="text-plasma">in one place</span>
        </h2>
      </div>
      <Link to="/shop" className="text-sm font-bold text-primary border-b border-primary/30 pb-1 hover:border-primary self-start md:self-auto">
        View all →
      </Link>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((c, i) => (
        <Link
          key={c.name}
          to={c.href}
          className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/40 transition-smooth animate-fade-up"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <img
            src={c.image}
            alt={c.name}
            loading="lazy"
            width={400}
            height={533}
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-spring"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 p-4 flex flex-col justify-between">
            <div className="self-end size-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
              <ArrowUpRight className="size-4 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base lg:text-lg leading-tight">{c.name}</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">{c.tag}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </section>
);
