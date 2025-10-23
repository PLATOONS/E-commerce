"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CheckoutFormData from "@/types/CheckoutFormData";

function CheckoutFormComponent({onSubmit}: {onSubmit: (formData: CheckoutFormData) => Promise<Response>}) {
  const router = useRouter();
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    country: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    paymentMethod: "card",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await onSubmit(formData);

      if(!res.ok)
        throw new Error(await res.text())

      console.log('Payment response:', await res.json())
    } catch (error) {
      console.error('Payment request failed:', error)
    } finally {
      router.push('/checkout?page=2')
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-6 space-y-8"
    >
      {/* Contact Information */}
      <section>
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">
          Contact Information
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="border rounded-md p-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-800"
            required
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border rounded-md p-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-800"
            required
          />
        </div>
        <div className="mt-3 space-y-3">
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="border rounded-md p-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-800"
            required
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Email Address"
            className="border rounded-md p-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-800"
            required
          />
        </div>
      </section>

      {/* Shipping Address */}
      <section>
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">
          Shipping Address
        </h2>
        <div className="space-y-3">
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Street Address"
            className="border rounded-md p-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-800"
            required
          />
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="border rounded-md p-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-800"
            required
          >
            <option value="">Country</option>
            <option value="US">United States</option>
            <option value="GT">Guatemala</option>
            <option value="MX">Mexico</option>
          </select>
          <div className="grid grid-cols-2 gap-3">
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Town / City"
              className="border rounded-md p-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-800"
              required
            />
            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              className="border rounded-md p-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-800"
              required
            />
          </div>
          <input
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            placeholder="ZIP Code"
            className="border rounded-md p-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-800"
            required
          />
        </div>
        <div className="mt-2 flex items-center space-x-2">
          <input type="checkbox" id="differentBilling" className="h-4 w-4" />
          <label htmlFor="differentBilling" className="text-sm text-gray-600">
            Use a different billing address (optional)
          </label>
        </div>
      </section>

      {/* Payment Method */}
      <section>
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">
          Payment Method
        </h2>

        <div className="space-y-3">
          <label className="flex items-center gap-2 border rounded-md p-3 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={formData.paymentMethod === "card"}
              onChange={handleChange}
            />
            <span>Pay by Card Credit</span>
          </label>

          <label className="flex items-center gap-2 border rounded-md p-3 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={formData.paymentMethod === "paypal"}
              onChange={handleChange}
            />
            <span>PayPal</span>
          </label>
        </div>

        {formData.paymentMethod === "card" && (
          <div className="mt-4 space-y-3">
            <input
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 1234 1234 1234"
              className="border rounded-md p-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-800"
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                className="border rounded-md p-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-800"
                required
              />
              <input
                name="cvc"
                value={formData.cvc}
                onChange={handleChange}
                placeholder="CVC code"
                className="border rounded-md p-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-800"
                required
              />
            </div>
          </div>
        )}
      </section>

      <button
        type="submit"
        className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
      >
        Process Payment
      </button>
    </form>
  );
}

export default CheckoutFormComponent;