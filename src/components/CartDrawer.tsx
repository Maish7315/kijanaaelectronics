import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { formatKES } from "@/data/products";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export const CartDrawer = () => {
  const { open, setOpen, items, setQty, remove, subtotal, count } = useCart();
  const navigate = useNavigate();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 py-5 border-b border-border">
          <SheetTitle className="font-display flex items-center gap-2">
            <ShoppingBag className="size-5 text-primary" /> Your Cart ({count})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 gap-4">
            <div className="size-20 rounded-full bg-secondary flex items-center justify-center">
              <ShoppingBag className="size-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground mt-1">Start shopping to add items.</p>
            </div>
            <Button variant="plasma" onClick={() => { setOpen(false); navigate("/shop"); }}>
              Browse Products
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((i) => {
                const price = i.wholesale ? i.product.wholesalePrice : i.product.retailPrice;
                return (
                  <div key={i.product.id + (i.wholesale ? "w" : "r")} className="flex gap-3">
                    <img src={i.product.image} alt="" className="size-20 rounded-xl object-cover bg-muted shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <Link to={`/product/${i.product.id}`} onClick={() => setOpen(false)} className="text-sm font-semibold leading-snug line-clamp-2 hover:text-primary">
                          {i.product.name}
                        </Link>
                        <button onClick={() => remove(i.product.id)} aria-label="Remove" className="text-muted-foreground hover:text-destructive">
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {i.product.brand} {i.wholesale && <span className="ml-1 text-success font-semibold">· Wholesale</span>}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="inline-flex items-center border border-border rounded-lg">
                          <button onClick={() => setQty(i.product.id, i.qty - 1)} className="size-8 flex items-center justify-center hover:bg-accent" aria-label="Decrease">
                            <Minus className="size-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">{i.qty}</span>
                          <button onClick={() => setQty(i.product.id, i.qty + 1)} className="size-8 flex items-center justify-center hover:bg-accent" aria-label="Increase">
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <div className="font-bold text-sm">{formatKES(price * i.qty)}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-border p-6 space-y-4 bg-surface-elevated">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-2xl font-display font-bold text-primary">{formatKES(subtotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground">Delivery calculated at checkout. Nationwide delivery available.</p>
              <Button variant="plasma" size="lg" className="w-full" onClick={() => { setOpen(false); navigate("/checkout"); }}>
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
