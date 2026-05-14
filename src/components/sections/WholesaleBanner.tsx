import { Link } from "react-router-dom";
import { Building2, Percent, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WholesaleBanner = () => (
  <section className="container py-16 lg:py-24">
    <div className="relative overflow-hidden rounded-3xl bg-plasma p-8 lg:p-14 shadow-glow">
      <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{
        backgroundImage: "radial-gradient(circle at 20% 20%, white 0, transparent 40%), radial-gradient(circle at 80% 80%, white 0, transparent 40%)",
      }} />

      <div className="relative grid lg:grid-cols-2 gap-8 items-center text-primary-foreground">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/20 backdrop-blur text-primary-foreground text-[11px] font-bold uppercase tracking-widest mb-5">
            For Resellers & Businesses
          </div>
          <h2 className="text-3xl lg:text-5xl font-display font-bold tracking-tight mb-4">
            Wholesale prices that grow your margins
          </h2>
          <p className="text-primary-foreground/90 max-w-lg mb-6">
            Stocking your shop or office? Get bulk pricing on every category — phones, accessories,
            TVs and home electronics. Order from anywhere in Kenya.
          </p>
          <Button asChild size="xl" className="bg-background text-primary hover:bg-background/90">
            <Link to="/wholesale">View Wholesale Catalog</Link>
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Percent, label: "Up to 25% off retail" },
            { icon: TrendingUp, label: "Volume discounts" },
            { icon: Building2, label: "Business accounts" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="rounded-2xl bg-background/10 backdrop-blur p-5 border border-background/20">
              <Icon className="size-6 mb-3" />
              <div className="text-sm font-semibold leading-tight">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
