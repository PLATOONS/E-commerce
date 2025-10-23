"use client";

import { useEffect, useMemo, useState } from "react";

type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  color?: string;
  imageUrl?: string;
};

type Order = {
  id: string;
  number: string;
  createdAt: string; // ISO
  status: string;
  total: number;
  items: OrderItem[];
};

const money = (v: number, c = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: c }).format(v);

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

// Si tenés NEXT_PUBLIC_API_URL, usa absoluta; si no, relativa (rewrite/proxy)
const BASE =
  (typeof window !== "undefined" && (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "")) ||
  "";
const apiUrl = (p: string) => (BASE ? `${BASE}${p}` : p);

// Normaliza distintos shapes comunes del backend
function normalize(raw: any): Order[] {
  const list: any[] = Array.isArray(raw) ? raw : raw?.content ?? raw?.items ?? raw?.data ?? [];
  if (!Array.isArray(list)) return [];

  return list
    .map((r) => {
      const itemsRaw: any[] = r.items ?? r.orderItems ?? r.products ?? [];
      const items: OrderItem[] = itemsRaw.map((it) => ({
        id: String(it.id ?? it.orderItemId ?? cryptoId()),
        name: String(it.productName ?? it.name ?? it.product?.name ?? "Product"),
        quantity: Number(it.quantity ?? it.qty ?? 1),
        unitPrice: Number(it.unitPrice ?? it.price ?? it.product?.finalPrice ?? 0),
        color: it.color ?? it.product?.color ?? undefined,
        imageUrl:
          it.imageUrl ??
          it.product?.imageUrl ??
          it.product?.mainImageUrl ??
          it.product?.images?.[0]?.url,
      }));

      const number =
        r.number ??
        r.orderNumber ??
        r.code ??
        (r.id ? `#${String(r.id).padStart(6, "0")}` : `#${cryptoId().slice(0, 6)}`);

      const total =
        r.total ??
        r.totalPrice ??
        r.amount ??
        items.reduce((s, it) => s + it.unitPrice * it.quantity, 0);

      return {
        id: String(r.id ?? r.orderId ?? cryptoId()),
        number: String(number),
        createdAt: String(r.createdAt ?? r.date ?? r.placedAt ?? new Date().toISOString()),
        status: String(r.status ?? r.state ?? "Delivered"),
        total: Number(total),
        items,
      } as Order;
    })
    .filter((o) => !!o.id);
}

function cryptoId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    // @ts-ignore
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [open, setOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const res = await fetch(apiUrl("/api/v1/orders/all"), {
          cache: "no-store",
          // credentials: "include", // ← descomenta si tu API usa sesión/cookies
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const ct = res.headers.get("content-type") || "";
        if (!ct.includes("application/json")) throw new Error("La API no devolvió JSON");
        const data = await res.json();
        const rows = normalize(data);
        // más recientes primero
        rows.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setOrders(rows);
      } catch (e: any) {
        setErr(e?.message ?? "No se pudo cargar el historial");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const content = useMemo(() => {
    if (loading) {
      return (
        <div className="space-y-2 animate-pulse">
          <div className="h-6 w-40 rounded bg-gray-200" />
          <div className="h-10 w-full rounded bg-gray-100" />
          <div className="h-10 w-full rounded bg-gray-100" />
          <div className="h-10 w-full rounded bg-gray-100" />
        </div>
      );
    }

    if (err) {
      return <div className="text-sm text-red-600">Error: {err}</div>;
    }

    if (!orders.length) {
      return <div className="text-sm text-gray-600">Aún no tienes pedidos.</div>;
    }

    return (
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-xs text-gray-500">
              <th className="px-3 py-2">Number ID</th>
              <th className="px-3 py-2">Dates</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Price</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => {
              const isOpen = !!open[o.id];
              return (
                <tr key={o.id} className="bg-white rounded-lg shadow-sm">
                  <td className="px-3 py-3 font-medium">{o.number}</td>
                  <td className="px-3 py-3">{formatDate(o.createdAt)}</td>
                  <td className="px-3 py-3">{o.status}</td>
                  <td className="px-3 py-3 font-medium">{money(o.total)}</td>
                  <td className="px-3 py-3 text-right">
                    <button
                      onClick={() => setOpen((s) => ({ ...s, [o.id]: !isOpen }))}
                      className="text-sm underline underline-offset-4 hover:text-gray-700"
                      aria-expanded={isOpen}
                    >
                      {isOpen ? "Hide details" : "Details"}
                    </button>

                    {isOpen && (
                      <div className="mt-3 border-t pt-3">
                        {o.items.length === 0 ? (
                          <div className="text-xs text-gray-500">
                            (No hay productos en esta orden)
                          </div>
                        ) : (
                          <ul className="space-y-2">
                            {o.items.map((it) => (
                              <li key={it.id} className="flex items-center gap-3">
                                <div className="h-12 w-12 overflow-hidden rounded border bg-gray-50 grid place-items-center">
                                  {it.imageUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                      src={it.imageUrl}
                                      alt={it.name}
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <span className="text-[10px] text-gray-400">No image</span>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="truncate text-sm font-medium">{it.name}</div>
                                  {it.color && (
                                    <div className="text-xs text-gray-500">Color: {it.color}</div>
                                  )}
                                </div>
                                <div className="text-xs text-gray-600">x{it.quantity}</div>
                                <div className="text-sm font-medium">
                                  {money(it.unitPrice * it.quantity)}
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }, [orders, open, loading, err]);

  return (
    <section className="w-full">
      <h2 className="mb-4 text-lg font-semibold">Orders History</h2>
      {content}
    </section>
  );
}
