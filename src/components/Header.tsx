import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, Moon, ShoppingBag, Sun, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";
import { useTheme } from "@/contexts/ThemeContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

const nav = [
  { label: "Shop", href: "/shop" },
  { label: "Wholesale", href: "/wholesale" },
  { label: "Cyber Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export const Header = () => {
  const { theme, toggle } = useTheme();
  const { count, setOpen } = useCart();
  const [mobile, setMobile] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="container flex items-center gap-4 h-16 lg:h-20">
        <Logo />

        <nav className="hidden lg:flex items-center gap-1 ml-6">
          {nav.map((n) => (
            <NavLink
              key={n.href}
              to={n.href}
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-lg text-sm font-semibold transition-smooth ${
                  isActive
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block flex-1 max-w-md ml-auto">
          <SearchBar />
        </div>

        <div className="flex items-center gap-1 ml-auto md:ml-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="size-10 rounded-lg flex items-center justify-center hover:bg-accent transition-smooth"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>

          <button
            onClick={() => setOpen(true)}
            aria-label={`Open cart, ${count} items`}
            className="relative size-10 rounded-lg flex items-center justify-center hover:bg-accent transition-smooth"
          >
            <ShoppingBag className="size-4" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 size-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-glow">
                {count}
              </span>
            )}
          </button>

          <Button
            variant="plasma"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => navigate("/shop")}
          >
            Shop Now
          </Button>

          <button
            className="lg:hidden size-10 rounded-lg flex items-center justify-center hover:bg-accent"
            onClick={() => setMobile((m) => !m)}
            aria-label="Toggle menu"
          >
            {mobile ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div className="md:hidden container pb-3">
        <SearchBar />
      </div>

      {mobile && (
        <div className="lg:hidden border-t border-border bg-background animate-fade-up">
          <nav className="container py-4 flex flex-col gap-1">
            {nav.map((n) => (
              <NavLink
                key={n.href}
                to={n.href}
                onClick={() => setMobile(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-sm font-semibold ${
                    isActive ? "text-primary bg-accent" : "text-foreground hover:bg-accent"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
