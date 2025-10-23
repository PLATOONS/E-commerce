// app/account/page.tsx
import OrderHistory from "@/components/OrderHistory";

export default function AccountPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">My Account</h1>

      {/* Orders section */}
      <section className="mt-4">
        <OrderHistory />
      </section>
    </main>
  );
}
