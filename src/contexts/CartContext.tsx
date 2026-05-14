import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  qty: number;
  wholesale: boolean;
}

interface CartCtx {
  items: CartItem[];
  add: (p: Product, opts?: { qty?: number; wholesale?: boolean }) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (o: boolean) => void;
}

const Ctx = createContext<CartCtx | null>(null);

const STORAGE_KEY = "kijanaa-cart-v1";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const add: CartCtx["add"] = (p, opts) => {
    const qty = opts?.qty ?? 1;
    const wholesale = opts?.wholesale ?? false;
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === p.id && i.wholesale === wholesale);
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, qty: i.qty + qty } : i,
        );
      }
      return [...prev, { product: p, qty, wholesale }];
    });
  };

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.product.id !== id));
  const setQty = (id: string, qty: number) =>
    setItems((prev) =>
      prev.map((i) => (i.product.id === id ? { ...i, qty: Math.max(1, qty) } : i)),
    );
  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);
  const subtotal = useMemo(
    () =>
      items.reduce(
        (s, i) => s + (i.wholesale ? i.product.wholesalePrice : i.product.retailPrice) * i.qty,
        0,
      ),
    [items],
  );

  return (
    <Ctx.Provider value={{ items, add, remove, setQty, clear, count, subtotal, open, setOpen }}>
      {children}
    </Ctx.Provider>
  );
};

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
};
