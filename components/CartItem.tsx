'use client';

import { updateQuantityInCart } from '@/services/productService';
import { useState } from 'react';

/* ============ API base + headers ============ */
const API_ROOT: string | undefined = process.env.NEXT_PUBLIC_API_URL

function getAuthHeaders(): Record<string, string> {
  const token =
    (typeof window !== 'undefined' &&
      (sessionStorage.getItem('token') || localStorage.getItem('token'))) ||
    '';
  const base = { 'Content-Type': 'application/json', Accept: 'application/json' };
  if (!token) return base;
  return {
    ...base,
    Authorization: ` Bearer ${token}` 
  };
}

/* ============ llamadas a la API del ítem ============ */
async function apiPatchQty(productId: string, nextQty: number): Promise<boolean> {
  // Variante 1: query param (?quantity=Q)
  const token = sessionStorage.getItem('token')
  const urlQP = `${API_ROOT}/orderProduct/quantity`;
  const resQP = await fetch(urlQP, { method: 'PATCH', headers: {'Content-Type': "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({productId: productId, quantity: nextQty}) });
  return resQP.ok
}

async function apiDelete(productId: string): Promise<boolean> {
  const url = `${API_ROOT}/orderProduct/${encodeURIComponent(productId)}`;
  const res = await fetch(url, { method: 'DELETE', headers: getAuthHeaders() });
  return res.ok;
}

/* ============ tipos + componente ============ */
type Props = {
  productId: string;
  productName: string;
  price: number;          // unitario
  color?: string | null;
  quantity: number;
  isSmall?: boolean;
  imageUrl?: string | null;
  onChanged?: (q: number) => void;
  onRemoved?: () => void;
};

export default function CartItem({
  productId,
  productName,
  price,
  color,
  quantity,
  isSmall = false,
  imageUrl,
  onChanged,
  onRemoved,
}: Props) {
  const [qty, setQty] = useState<number>(quantity);
  const [pending, setPending] = useState<boolean>(false);

  const unit = Number.isFinite(price) ? price : 0;
  const subtotal = unit * qty;

  const change = async (next: number) => {
    if (next === qty) return;
    setPending(true);
    try {
      const ok = await updateQuantityInCart(productId, next);
      if (!ok) {
        alert('No se pudo actualizar la cantidad.');
        return;
      }
      setQty(next);
      onChanged?.(next);
    } finally {
      setPending(false);
    }
  };

  const remove = async () => {
    setPending(true);
    try {
      const ok = await apiDelete(productId);
      if (!ok) {
        alert('No se pudo eliminar el producto.');
        return;
      }
      onRemoved?.();
    } finally {
      setPending(false);
    }
  };

  const Qty = (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => change(Math.max(1, qty - 1))}
        disabled={pending || qty <= 1}
        className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
        aria-label="Reducir cantidad"
      >
        −
      </button>
      <span className="w-8 text-center">{qty}</span>
      <button
        type="button"
        onClick={() => change(Math.min(99, qty + 1))}
        disabled={pending || qty >= 99}
        className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
        aria-label="Aumentar cantidad"
      >
        +
      </button>
    </div>
  );

  if (isSmall) {
    // Small / mobile
    return (
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="flex items-center gap-3">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt={productName} className="w-16 h-16 object-cover rounded-md border" />
          ) : (
            <div className="w-16 h-16 rounded-md bg-gray-100 border grid place-items-center text-xs text-gray-400">No Image</div>
          )}
          <div>
            <p className="font-medium">{productName}</p>
            {color ? <p className="text-sm text-gray-500">Color: {color}</p> : null}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-medium">${unit.toFixed(2)}</span>
          {Qty}
          <button
            type="button"
            onClick={remove}
            disabled={pending}
            className="ml-2 text-gray-400 hover:text-red-600 disabled:opacity-50"
            aria-label="Eliminar"
            title="Eliminar"
          >
            ×
          </button>
        </div>
      </div>
    );
  }

  // Big / desktop
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="flex items-center gap-4">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={productName} className="w-16 h-16 object-cover rounded-md border" />
        ) : (
          <div className="w-16 h-16 rounded-md bg-gray-100 border grid place-items-center text-xs text-gray-400">No Image</div>
        )}
        <div>
          <p className="font-medium">{productName}</p>
          {color ? <p className="text-sm text-gray-500">Color: {color}</p> : null}
          <button
            type="button"
            onClick={remove}
            disabled={pending}
            className="mt-1 text-sm text-gray-500 hover:text-red-600 disabled:opacity-50"
          >
            × Remove
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {Qty}
        <div className="w-20 text-right text-gray-700">${unit.toFixed(2)}</div>
        <div className="w-24 text-right font-semibold">${subtotal.toFixed(2)}</div>
      </div>
    </div>
  );
}