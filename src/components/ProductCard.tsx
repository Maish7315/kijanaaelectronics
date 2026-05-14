import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { Product, formatKES } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

export const ProductCard = ({ product, wholesale = false }: { product: Product; wholesale?: boolean }) => {
  const { add, setOpen } = useCart();
  const price = product.category === "Accessories" ? product.wholesalePrice : product.retailPrice;
  const inStock = product.stock > 0;

  return (
    <article className="group relative flex flex-col rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/40 hover:shadow-elegant transition-smooth">
      <Link to={`/product/${product.id}`} className="relative aspect-square bg-secondary overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          width={400}
          height={400}
          className="w-full h-full object-cover group-hover:scale-105 transition-spring"
        />
        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              product.badge === "Hot"
                ? "bg-destructive text-destructive-foreground"
                : product.badge === "New"
                ? "bg-primary text-primary-foreground"
                : "bg-warning text-warning-foreground"
            }`}
          >
            {product.badge}
          </span>
        )}
        {product.category === "Accessories" && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-success text-success-foreground">
            Wholesale
          </span>
        )}
        {!inStock && (
          <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-foreground text-background">
            Out of stock
          </span>
        )}
      </Link>

      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-semibold">{product.brand}</span>
          <span className="flex items-center gap-1">
            <Star className="size-3 fill-warning text-warning" />
            {product.rating} <span className="opacity-60">({product.reviews})</span>
          </span>
        </div>
        <Link to={`/product/${product.id}`} className="font-semibold leading-snug line-clamp-2 hover:text-primary transition-smooth">
          {product.name}
        </Link>

        <div className="mt-auto pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-display font-bold text-primary">
              {formatKES(price)}
            </span>
          </div>
          {product.category !== "Accessories" && (
            <div className="text-[11px] text-muted-foreground">
              Wholesale: {formatKES(product.wholesalePrice)}
            </div>
          )}

          <Button
            variant="plasma"
            size="sm"
            className="w-full mt-3"
            disabled={!inStock}
            onClick={() => {
              add(product, { wholesale: product.category === "Accessories" });
              toast.success(`${product.name} added to cart`, {
                action: { label: "View", onClick: () => setOpen(true) },
              });
            }}
          >
            <ShoppingCart className="size-4" /> Add to Cart
          </Button>
        </div>
      </div>
    </article>
  );
};
