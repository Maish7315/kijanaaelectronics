import { Link } from "react-router-dom";
import logo from "@/assets/logo.webp";

export const Logo = ({ className = "" }: { className?: string }) => (
  <Link to="/" className={`flex items-center group ${className}`} aria-label="Kijanaa Electronics home">
    <img
      src={logo}
      alt="Kijanaa Electronics"
      className="h-10 w-auto group-hover:brightness-110 transition-smooth"
    />
  </Link>
);
