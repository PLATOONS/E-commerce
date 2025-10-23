'use client';

import React, { useEffect, useMemo, useState } from 'react';

/* --- API root (defensive) --- */
const API_ROOT: string = (() => {
  const raw = (process.env.NEXT_PUBLIC_API_URL || '').trim().replace(/\/+$/, '');
  if (!raw) return '/api/v1';
  return raw.endsWith('/api/v1') ? raw : `${raw}/api/v1`;
})();

/* --- Auth headers from storage --- */
function authHeaders(): Record<string, string> {
  const token =
    (typeof window !== 'undefined' &&
      (sessionStorage.getItem('token') || localStorage.getItem('token'))) ||
    '';
  return token
    ? { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${token}`, Authentication: `Bearer ${token}` }
    : { 'Content-Type': 'application/json', Accept: 'application/json' };
}

/* --- Helpers (very lenient) --- */
function asArray(v: any): any[] {
  if (!v) return [];
  if (Array.isArray(v)) return v;
  if (Array.isArray(v?.content)) return v.content;
  if (Array.isArray(v?.items)) return v.items;
  if (Array.isArray(v?.results)) return v.results;
  if (v?.data) return asArray(v.data);
  return [];
}

function money(n: number): string {
  const v = Number(n) || 0;
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);
  } catch {
    return `$${v.toFixed(2)}`;
  }
}

/* --- Types kept very soft to avoid TS noise --- */
type OrderItem = {
  name: string;
  quantity: number;
  unitPrice: number;
};

type Order = {
  id: string;
  number: string;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
};

function normalizeItem(r: any): OrderItem {
  return {
    name: String(r?.productName ?? r?.name ?? 'Product'),
    quantity: Number(r?.quantity ?? r?.qty ?? 1) || 1,
    unitPrice: Number(r?.unitPrice ?? r?.price ?? 0) || 0,
  };
}

function normalizeOrder(r: any): Order {
  const id = String(r?.id ?? r?.orderId ?? r?.number ?? r?.code ?? Math.random().toString(36).slice(2));
  const items = asArray(r?.items ?? r?.orderItems ?? r?.lines ?? r?.products).map(normalizeItem);
  return {
    id,
    number: String(r?.number ?? r?.code ?? `#${id}`),
    date: String(r?.createdAt ?? r?.date ?? r?.placedAt ?? new Date().toISOString()),
    status: String(r?.status ?? r?.state ?? '—'),
    total: Number(r?.total ?? r?.totalPrice ?? r?.amount ?? r?.price ?? 0) || 0,
    items,
  };
}

/* --- Component --- */
export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const toggle = (id: string) => setExpanded((s) => ({ ...s, [id]: !s[id] }));

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setErr('');
      try {
        const res = await fetch(`${API_ROOT}/order`, {
          method: 'GET',
          headers: authHeaders(),
          cache: 'no-store',
        });
        if (!res.ok) {
          const txt = await res.text().catch(() => '');
          if (!cancelled) setErr(`Request failed (${res.status}) ${txt}`);
          if (!cancelled) setOrders([]);
          return;
        }
        const json = await res.json().catch(() => null);
        const list = asArray(json).map(normalizeOrder);
        if (!cancelled) setOrders(list);
      } catch (e: any) {
        if (!cancelled) {
          setErr(e?.message || 'Unknown error');
          setOrders([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const grandTotal = useMemo(() => orders.reduce((a, o) => a + (Number(o.total) || 0), 0), [orders]);

  return (
    <section className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Orders History</h2>
        <span className="text-sm text-gray-500">{orders.length} rows</span>
      </div>

      {err && <div className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{err}</div>}
      {loading && <p className="text-gray-500">Loading…</p>}

      {!loading && orders.length === 0 ? (
        <p className="text-gray-600">You do not have orders yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="text-left text-sm font-medium text-gray-700">
                <th className="px-4 py-3">Number ID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Price</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {orders.map((o) => {
                const isOpen = !!expanded[o.id];
                return (
                  <React.Fragment key={o.id}>
                    <tr className="text-sm">
                      <td className="px-4 py-3 font-medium text-gray-900">{o.number}</td>
                      <td className="px-4 py-3 text-gray-700">
                        {new Date(o.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })}
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">{o.status}</span>
                      </td>
                      <td className="px-4 py-3 text-right font-medium">{money(o.totalPrice)}</td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => toggle(o.id)} className="rounded border px-3 py-1 text-sm hover:bg-gray-50">
                          {isOpen ? 'Hide details' : 'Details'}
                        </button>
                      </td>
                    </tr>

                    {isOpen && (
                      <tr className="bg-gray-50">
                        <td colSpan={5} className="px-4 py-4">
                          {o.items.length === 0 ? (
                            <p className="text-sm text-gray-600">No products for this order.</p>
                          ) : (
                            <ul className="space-y-2">
                              {o.items.map((it, i) => {
                                const subtotal = (Number(it.unitPrice) || 0) * (Number(it.quantity) || 0);
                                return (
                                  <li key={`${o.id}-${i}`} className="flex items-center justify-between rounded border bg-white px-3 py-2 text-sm">
                                    <div className="flex-1">
                                      <div className="font-medium text-gray-900">{it.name}</div>
                                      <div className="text-xs text-gray-500">
                                        Qty: {it.quantity} · Unit: {money(Number(it.unitPrice) || 0)}
                                      </div>
                                    </div>
                                    <div className="w-24 text-right font-semibold">{money(subtotal)}</div>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
            {orders.length > 0 && (
              <tfoot className="bg-gray-50">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-600" colSpan={3}>
                    {orders.length} order{orders.length > 1 ? 's' : ''}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold" colSpan={2}>
                    Total: {money(grandTotal)}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      )}
    </section>
  );
}
