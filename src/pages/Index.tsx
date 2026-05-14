import { Hero } from "@/components/sections/Hero";
import { Partners } from "@/components/sections/Partners";
import { Categories } from "@/components/sections/Categories";
import { FeaturedAccessories } from "@/components/sections/FeaturedAccessories";
import { FlashDeals } from "@/components/sections/FlashDeals";
import { WholesaleBanner } from "@/components/sections/WholesaleBanner";
import { Testimonials } from "@/components/sections/Testimonials";
import { LocationSection } from "@/components/sections/LocationSection";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Kijanaa Electronics — Mwingi's Trusted Electronics & Cyber Hub";
    const meta = document.querySelector('meta[name="description"]') ?? (() => {
      const m = document.createElement("meta");
      m.name = "description";
      document.head.appendChild(m);
      return m;
    })();
    meta.setAttribute("content", "Shop genuine phones, TVs, laptops, accessories and home electronics. Wholesale & retail with nationwide delivery across Kenya. Cyber services in Mwingi, Kitui.");
  }, []);

  return (
    <>
      <Hero />
      <Partners />
      <Categories />
      <FeaturedAccessories />
      <FlashDeals />
      <WholesaleBanner />
      <Testimonials />
      <LocationSection />
    </>
  );
};

export default Index;
