import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FormEvent } from "react";

export const Footer = () => {
  const onSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (new FormData(e.currentTarget).get("email") as string)?.trim();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success("Subscribed! Watch out for our deals.");
    e.currentTarget.reset();
  };

  return (
    <footer className="mt-24 border-t border-border bg-surface-elevated">
      <div className="container py-16">
        {/* Newsletter */}
        <div className="rounded-3xl bg-plasma p-1 shadow-glow mb-16">
          <div className="rounded-[calc(1.5rem-2px)] bg-background p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-md text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-display font-bold mb-2">
                Get Mwingi's best tech deals
              </h3>
              <p className="text-muted-foreground">
                Flash sales, new arrivals & wholesale offers — once a week, no spam.
              </p>
            </div>
            <form onSubmit={onSubscribe} className="w-full lg:w-auto flex flex-col lg:flex-row gap-2">
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                aria-label="Email"
                maxLength={120}
                className="w-full lg:w-72 h-12 px-4 rounded-xl bg-secondary border border-border focus:border-primary outline-none text-sm"
              />
              <Button type="submit" variant="plasma" size="lg" className="w-full lg:w-auto">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div>
            <Logo className="h-12" />
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Your trusted electronics & cyber hub serving Mwingi, Kitui County serving customers across Kenya.
            </p>
            <div className="flex gap-2 mt-5">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="size-9 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-smooth"
                  aria-label="Social"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/shop?category=Smartphones" className="hover:text-primary">Smartphones</Link></li>
              <li><Link to="/shop?category=TVs" className="hover:text-primary">Televisions</Link></li>
              <li><Link to="/shop?category=Laptops" className="hover:text-primary">Laptops</Link></li>
              <li><Link to="/shop?category=Accessories" className="hover:text-primary">Accessories</Link></li>
              <li><Link to="/wholesale" className="hover:text-primary">Wholesale</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/services" className="hover:text-primary">Cyber Services</Link></li>    
              <li><Link to="/contact" className="hover:text-primary">Contact us</Link></li>
              <li><a href="#" className="hover:text-primary">Delivery info</a></li>
              <li><a href="#" className="hover:text-primary">Warranty & returns</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">Visit us</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="size-4 mt-0.5 text-primary shrink-0" />
                <span>Mwingi Town, Kitui County, Kenya</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="size-4 mt-0.5 text-primary shrink-0" />
                <a href="tel:+254769964404" className="hover:text-primary">+254769964404</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="size-4 mt-0.5 text-primary shrink-0" />
                <a href="mailto:kijanaacyber@gmail.com" className="hover:text-primary">kijanaacyber@gmail.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider">Policies</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><strong>Warranty:</strong> Retail items come with warranty. Wholesale items do not.</li>
              <li><strong>Returns:</strong> 5-7 days return policy.</li>
              <li><strong>Delivery:</strong> Nationwide. Contact agent via WhatsApp for details.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Kijanaa Electronics. All rights reserved.</p>
          <p>proudly made by <a href="https://roy-tecxpro.netlify.app" target="_blank" rel="noopener noreferrer" className="hover:text-primary">roy-tecxpro.netlify.app</a> · Serving Africa nationwide</p>
        </div>
      </div>
    </footer>
  );
};
