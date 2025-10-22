"use client";

import React, { useMemo, useState } from "react";

type Props = {
  /** MUY IMPORTANTE: este NO es el id del producto,
   *  es el id del item en el carrito (productOrder / orderProduct). */
  orderItemId: string;                    // <—— usa este id para PATCH/DELETE
  productName: string;
  price: number;                          // unitario con descuento
  color: string;
  quantity: number;
  isSmall?: boolean;
  imageUrl?: string;
  currency?: string;                      // "USD" por defecto
  onQuantityChange?: (qty: number) => void;
  onRemoved?: () => void;
};

// Si definís NEXT_PUBLIC_API_URL, usa absoluta; si no, va relativa.
const BASE =
  (typeof window !== "undefined" && process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")) || "";
const apiUrl = (path: string) => (BASE ? `${BASE}${path}` : path);

// cambia acá si tu backend usa 'orderProduct' en vez de 'productOrder'
const RESOURCE = process.env.NEXT_PUBLIC_CART_RESOURCE ?? "productOrder";

const money = (v: number, c = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: c }).format(v);

export default function CartItem({
  orderItemId,
  productName,
  price,
  color,
  quantity,
  isSmall = true,
  imageUrl,
  currency = "USD",
  onQuantityChange,
  onRemoved,
}: Props) {
  const [qty, setQty] = useState(quantity);
  const [busy, setBusy] = useState(false);
  const [removing, setRemoving] = useState(false);

  const unit = useMemo(() => money(price, currency), [price, currency]);
  const subtotal = useMemo(() => money(price * qty, currency), [price, qty, currency]);

  async function changeQty(newQty: number) {
    if (newQty < 1 || newQty > 999 || newQty === qty) return;

    const prev = qty;
    setQty(newQty); // optimista
    onQuantityChange?.(newQty);
    setBusy(true);

    try {
      const res = await fetch(apiUrl(`/api/v1/${RESOURCE}/${orderItemId}`), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQty }),
        cache: "no-store",
        // credentials: "include",
      });
      if (!res.ok) throw new Error(`PATCH failed: ${res.status}`);
    } catch (e) {
      console.error(e);
      setQty(prev); // rollback
      onQuantityChange?.(prev);
      alert("No se pudo actualizar la cantidad.");
    } finally {
      setBusy(false);
    }
  }

  async function removeItem() {
    if (!confirm("¿Eliminar este producto del carrito?")) return;

    setRemoving(true);
    try {
      const res = await fetch(apiUrl(`/api/v1/${RESOURCE}/${orderItemId}`), {
        method: "DELETE",
        cache: "no-store",
        // credentials: "include",
      });
      if (!res.ok) throw new Error(`DELETE failed: ${res.status}`);
      onRemoved?.();
    } catch (e) {
      console.error(e);
      alert("No se pudo eliminar el producto.");
    } finally {
      setRemoving(false);
    }
  }

  const btn = "h-8 w-8 rounded border border-gray-300 text-sm disabled:opacity-40 disabled:cursor-not-allowed";
  const box = "min-w-10 h-8 px-2 border border-gray-300 rounded text-sm grid place-items-center";
  const card = "relative w-full rounded-lg border bg-white/80 backdrop-blur-sm shadow-sm";
  const pad = isSmall ? "p-3" : "p-4";
  const row = isSmall ? "flex gap-3 items-start" : "flex gap-4 items-center";

  return (
    <div className={`${card} ${pad}`}>
      {/* Imagen */}
      <div className={isSmall ? "w-14 h-14" : "w-20 h-20"}>
        <div className="w-full h-full overflow-hidden rounded-md border bg-gray-50 grid place-items-center">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt={productName} className="w-full h-full object-cover" />
          ) : (
            <div className="text-xs text-gray-400">No image</div>
          )}
        </div>
      </div>

      {/* Info + controles */}
      <div className={`flex-1 ${row}`}>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <h3 className={`truncate ${isSmall ? "text-sm" : "text-base"} font-semibold`}>{productName}</h3>
              <p className="text-xs text-gray-500">Color: {color}</p>
            </div>
            {isSmall && <span className="ml-3 text-sm font-semibold">{unit}</span>}
          </div>

          {/* Controles small */}
          {isSmall && (
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className={btn} disabled={busy || qty <= 1} onClick={() => changeQty(qty - 1)} aria-label="Disminuir">–</button>
                <div className={box}>{qty}</div>
                <button className={btn} disabled={busy} onClick={() => changeQty(qty + 1)} aria-label="Aumentar">+</button>
              </div>
              <button onClick={removeItem} disabled={removing} aria-label="Quitar" className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-40">✕</button>
            </div>
          )}
        </div>

        {/* Controles big */}
        {!isSmall && (
          <>
            <div className="flex items-center gap-2">
              <button className={btn} disabled={busy || qty <= 1} onClick={() => changeQty(qty - 1)} aria-label="Disminuir">–</button>
              <div className={box}>{qty}</div>
              <button className={btn} disabled={busy} onClick={() => changeQty(qty + 1)} aria-label="Aumentar">+</button>
            </div>
            <div className="w-24 text-center text-sm text-gray-800">{unit}</div>
            <div className="w-24 text-center font-semibold">{subtotal}</div>
            <div className="w-28">
              <button onClick={removeItem} disabled={removing} className="text-sm text-gray-500 hover:text-gray-700 underline disabled:opacity-40">
                Remove
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
