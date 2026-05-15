import { useState, FormEvent } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { formatKES } from "@/data/products";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  phone: z.string().trim().regex(/^(?:\+?254|0)?7\d{8}$/, "Enter a valid Kenyan phone number"),
  county: z.string().trim().min(2, "Enter your county/town").max(60),
  address: z.string().trim().min(5, "Enter a delivery address").max(200),
  delivery: z.enum(["home", "pickup"]),
  notes: z.string().trim().max(300).optional(),
});

const Checkout = () => {
  const { items, subtotal, clear } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [delivery, setDelivery] = useState<"home" | "pickup">("home");

  const deliveryFee = delivery === "home" ? (subtotal > 50000 ? 0 : 350) : 0;
  const total = subtotal + deliveryFee;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get("name") as string,
      phone: form.get("phone") as string,
      county: form.get("county") as string,
      address: form.get("address") as string,
      delivery,
      notes: form.get("notes") as string,
    };
    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      toast.error("Please fix the highlighted fields");
      return;
    }
    setErrors({});
    setSubmitted(true);
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (items.length === 0 && !submitted) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-display text-2xl font-bold mb-3">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Add a few items to checkout.</p>
        <Button asChild variant="plasma"><Link to="/shop">Continue shopping</Link></Button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="container py-20 max-w-lg mx-auto text-center">
        <div className="size-20 rounded-full bg-success/15 text-success flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="size-10" />
        </div>
        <h1 className="font-display text-3xl font-bold mb-3">Order received!</h1>
        <p className="text-muted-foreground mb-8">
          Thank you. We'll call you shortly to confirm your order and arrange payment & delivery.
        </p>
        <Button variant="plasma" size="lg" onClick={() => navigate("/")}>Back to home</Button>
      </div>
    );
  }

  const Field = ({ name, label, type = "text", placeholder }: { name: string; label: string; type?: string; placeholder?: string }) => (
    <div>
      <label className="block text-sm font-semibold mb-1.5">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        maxLength={200}
        className={`w-full h-11 px-4 rounded-xl bg-secondary border outline-none transition-smooth ${errors[name] ? "border-destructive" : "border-border focus:border-primary"}`}
      />
      {errors[name] && <p className="text-xs text-destructive mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="container py-10 lg:py-16">
      <h1 className="font-display text-3xl lg:text-4xl font-bold tracking-tight mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        <form onSubmit={onSubmit} className="space-y-6" noValidate>
          <section className="rounded-2xl bg-card border border-border p-6">
            <h2 className="font-display font-semibold text-lg mb-4">Contact & delivery</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field name="name" label="Full name" placeholder="Jane Mutua" />
              <Field name="phone" label="Phone (M-Pesa)" placeholder="07XX XXX XXX" />
              <Field name="county" label="County / Town" placeholder="Nairobi" />
              <Field name="address" label="Delivery address" placeholder="Estate, street, building" />
            </div>
          </section>

          <section className="rounded-2xl bg-card border border-border p-6">
            <h2 className="font-display font-semibold text-lg mb-4">Delivery method</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { id: "home" as const, title: "Home delivery", desc: "Across Kenya · Free over KES 50,000" },
                { id: "pickup" as const, title: "Pickup in Mwingi", desc: "Free · Mon–Sat 8am–8pm" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setDelivery(opt.id)}
                  className={`text-left rounded-xl border-2 p-4 transition-smooth ${
                    delivery === opt.id ? "border-primary bg-accent" : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="font-semibold">{opt.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-card border border-border p-6">
            <h2 className="font-display font-semibold text-lg mb-4">Order notes (optional)</h2>
            <textarea
              name="notes"
              rows={3}
              maxLength={300}
              placeholder="Any specific instructions…"
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border outline-none focus:border-primary"
            />
          </section>

          <Button type="submit" variant="plasma" size="xl" className="w-full lg:w-auto">
            Place order — {formatKES(total)}
          </Button>
        </form>

        <aside className="rounded-2xl bg-card border border-border p-6 h-fit lg:sticky lg:top-24">
          <h2 className="font-display font-semibold text-lg mb-4">Order summary</h2>
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {items.map((i) => {
              const price = i.wholesale ? i.product.wholesalePrice : i.product.retailPrice;
              return (
                <div key={i.product.id + (i.wholesale ? "w" : "r")} className="flex gap-3">
                  <img src={i.product.images[0]} alt={i.product.name} loading="lazy" className="size-12 sm:size-14 rounded-lg object-cover bg-muted shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{i.product.name}</div>
                    <div className="text-xs text-muted-foreground">Qty {i.qty}{i.wholesale && " · Wholesale"}</div>
                  </div>
                  <div className="text-sm font-bold">{formatKES(price * i.qty)}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-5 pt-5 border-t border-border space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold">{formatKES(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="font-semibold">{deliveryFee === 0 ? "Free" : formatKES(deliveryFee)}</span></div>
            <div className="flex justify-between text-base pt-3 border-t border-border">
              <span className="font-semibold">Total</span>
              <span className="font-display font-bold text-primary text-xl">{formatKES(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
