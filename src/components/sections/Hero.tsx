import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Truck, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-electronics.jpg";

export const Hero = () => (
  <section className="relative overflow-hidden">
    {/* Glow */}
    <div className="absolute inset-0 -z-10 bg-glow" />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full opacity-60" />

    <div className="container pt-12 lg:pt-20 pb-16 lg:pb-24 grid lg:grid-cols-2 gap-12 items-center">
      <div className="text-center lg:text-left animate-fade-up">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-widest mb-6">
          <Sparkles className="size-3" /> Mwingi's Premier Tech Hub
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
          Your Trusted <br />
          <span className="text-plasma text-glow">Electronics & Cyber Hub</span>
          <br />
          <span className="text-foreground">in Mwingi</span>
        </h1>
        <p className="text-base lg:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8">
          Genuine phones, TVs, laptops, accessories and home electronics — wholesale & retail.
          Plus expert cyber services. Nationwide delivery across Kenya.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
          <Button asChild variant="plasma" size="xl">
            <Link to="/shop">
              Shop Now <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="xl">
            <Link to="/services">Explore Services</Link>
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
          {[
            { icon: ShieldCheck, label: "Genuine Products" },
            { icon: Truck, label: "Nationwide Delivery" },
            { icon: Lock, label: "Secure Checkout" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center lg:items-start gap-1.5 text-center lg:text-left">
              <Icon className="size-5 text-primary" />
              <span className="text-xs font-semibold text-foreground/80">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <div className="relative aspect-square max-w-md mx-auto">
          <div className="absolute inset-0 bg-plasma rounded-[2rem] blur-2xl opacity-40 animate-pulse-glow" />
          <div className="relative aspect-square rounded-[2rem] overflow-hidden glass shadow-elegant">
            <img
              src={heroImg}
              alt="Premium electronics: smartphone, smartwatch and earbuds"
              width={1024}
              height={1024}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Floating chip */}
          <div className="absolute -bottom-4 -left-4 glass rounded-2xl px-5 py-3 shadow-elegant animate-float">
            <div className="text-2xl font-display font-bold text-primary">100%</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Genuine Stock</div>
          </div>
          <div className="absolute -top-4 -right-4 glass rounded-2xl px-5 py-3 shadow-elegant animate-float" style={{ animationDelay: "1s" }}>
            <div className="text-2xl font-display font-bold text-primary">4.9★</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Customer Rating</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
