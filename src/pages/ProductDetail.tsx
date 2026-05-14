import { useParams, Link, useNavigate } from "react-router-dom";
import { products, formatKES } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Check, ChevronLeft, ShieldCheck, Star, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "@/components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { add, setOpen } = useCart();
  const [qty, setQty] = useState(1);
  const [wholesale, setWholesale] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = product ? `${product.name} — Kijanaa Electronics` : "Product — Kijanaa";
  }, [product]);

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground mb-4">Product not found.</p>
        <Button asChild variant="plasma"><Link to="/shop">Back to shop</Link></Button>
      </div>
    );
  }

  const price = wholesale ? product.wholesalePrice : product.retailPrice;
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container py-8 lg:py-16">
      <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
        <ChevronLeft className="size-4" /> Back to shop
      </Link>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="space-y-4">
          <div className="rounded-3xl bg-card border border-border overflow-hidden aspect-square">
            <img src={product.images[selectedImageIndex]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`rounded-xl border-2 overflow-hidden aspect-square ${
                    selectedImageIndex === i ? 'border-primary' : 'border-border'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{product.brand} · {product.category}</div>
          <h1 className="font-display text-3xl lg:text-4xl font-bold tracking-tight mb-3">{product.name}</h1>

          <div className="flex items-center gap-3 mb-5 text-sm">
            <span className="flex items-center gap-1">
              <Star className="size-4 fill-warning text-warning" />
              <strong>{product.rating}</strong>
            </span>
            <span className="text-muted-foreground">({product.reviews} reviews)</span>
            <span className={`flex items-center gap-1 ${product.stock > 0 ? "text-success" : "text-destructive"}`}>
              <Check className="size-4" /> {product.stock > 0 ? `In stock (${product.stock})` : "Out of stock"}
            </span>
          </div>

          <div className="rounded-2xl bg-secondary p-5 mb-6">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl font-display font-bold text-primary">{formatKES(price)}</span>
              {wholesale && (
                <span className="text-base text-muted-foreground line-through">{formatKES(product.retailPrice)}</span>
              )}
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={wholesale}
                onChange={(e) => setWholesale(e.target.checked)}
                className="size-4 rounded border-border text-primary"
              />
              <span>Apply wholesale pricing <span className="text-success font-semibold">(save {formatKES(product.retailPrice - product.wholesalePrice)})</span></span>
            </label>
          </div>

          <p className="text-foreground/90 mb-6 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center border border-border rounded-xl">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="size-11 hover:bg-accent">−</button>
              <span className="w-12 text-center font-bold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="size-11 hover:bg-accent">+</button>
            </div>
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              disabled={product.stock === 0}
              onClick={() => {
                add(product, { qty, wholesale });
                toast.success("Added to cart");
                setOpen(true);
              }}
            >
              Add to Cart
            </Button>
            <Button
              variant="plasma"
              size="lg"
              className="flex-1"
              disabled={product.stock === 0}
              onClick={() => {
                add(product, { qty, wholesale });
                navigate("/checkout");
              }}
            >
              Buy Now
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary">
              <Truck className="size-4 text-primary" />
              <span>Nationwide delivery</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary">
              <ShieldCheck className="size-4 text-primary" />
              <span>Genuine + warranty</span>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl lg:text-3xl font-bold tracking-tight mb-6">You might also like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
