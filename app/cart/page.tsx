"use client";

import { useEffect, useState } from "react";
import CartItem from "@/components/CartItem";

type CartRow = {
  id: string;                // id del ítem en el carrito (orderProduct id)
  productName: string;
  price: number;             // precio unitario (con descuento)
  color: string;
  quantity: number;
  imageUrl?: string;
};

async function fetchCart(): Promise<CartRow[]> {
  try {
    const res = await fetch("/api/v1/orderProduct", {
      cache: "no-store",
      // credentials: "include", // descomenta si tu API usa sesión/cookies
    });
    if (!res.ok) return [];

    const data = await res.json();
    const list: any[] = Array.isArray(data) ? data : (data?.content ?? []);

    return list
      .map((r: any) => ({
        id: r.id,
        productName: r.productName ?? r.product?.name ?? "Producto",
        price: r.price ?? r.unitPrice ?? r.product?.finalPrice ?? 0,
        color: r.color ?? r.selectedColor ?? "—",
        quantity: r.quantity ?? r.qty ?? 1,
        imageUrl:
          r.imageUrl ??
          r.product?.imageUrl ??
          r.product?.mainImageUrl ??
          r.product?.images?.[0]?.url,
      }))
      .filter((x: CartRow) => !!x.id);
  } catch {
    return [];
  }
}

export default function CartPage() {
  const [items, setItems] = useState<CartRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart().then(setItems).finally(() => setLoading(false));
  }, []);

  const onQty = (id: string, q: number) =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, quantity: q } : it)));

  const onRemove = (id: string) =>
    setItems((prev) => prev.filter((it) => it.id !== id));

  if (loading) return <main className="p-6 text-sm text-gray-500">Cargando carrito…</main>;
  if (items.length === 0) return <main className="p-6 text-gray-600">Tu carrito está vacío.</main>;

  return (
    <main className="mx-auto max-w-5xl p-4 space-y-4">
      {/* Versión small/mobile */}
      <section className="lg:hidden space-y-3">
        {items.map((it) => (
          <CartItem
            key={it.id}
            orderItemId={it.id}              // 👈 id del orderProduct
            productName={it.productName}
            price={it.price}
            color={it.color}
            quantity={it.quantity}
            isSmall
            imageUrl={it.imageUrl}
            onQuantityChange={(q) => onQty(it.id, q)}
            onRemoved={() => onRemove(it.id)}
          />
        ))}
      </section>

      {/* Versión big/desktop */}
      <section className="hidden lg:block space-y-3">
        {items.map((it) => (
          <CartItem
            key={it.id}
            orderItemId={it.id}
            productName={it.productName}
            price={it.price}
            color={it.color}
            quantity={it.quantity}
            isSmall={false}
            imageUrl={it.imageUrl}
            onQuantityChange={(q) => onQty(it.id, q)}
            onRemoved={() => onRemove(it.id)}
          />
        ))}
      </section>
    </main>
  );
}
