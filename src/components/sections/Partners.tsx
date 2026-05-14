const partners = ["Oraimo", "Amaya", "JBL", "Samsung", "Tecno", "HP", "Hisense"];

export const Partners = () => (
  <section className="border-y border-border bg-surface-elevated">
    <div className="container py-10">
      <p className="text-center text-xs font-bold text-muted-foreground uppercase tracking-[0.3em] mb-6">
        Authorised retailer of trusted brands
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-16">
        {partners.map((p) => (
          <span
            key={p}
            className={`text-xl md:text-2xl font-display font-black tracking-tighter transition-smooth ${
              ["Oraimo", "Amaya", "JBL"].includes(p)
                ? "text-foreground"
                : "text-muted-foreground/60 hover:text-foreground"
            }`}
          >
            {p.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  </section>
);
