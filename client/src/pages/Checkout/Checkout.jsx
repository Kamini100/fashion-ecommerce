import { useState } from "react"; // ⭐ ADDED
import { Link, useNavigate } from "react-router-dom"; // ⭐ ADDED
import { useCart } from "../../context/CartContext"; // ⭐ ADDED

function Checkout() {
  const navigate = useNavigate();

  // ⭐ ADDED: Get cart items
  const { cartItems, clearCart } = useCart();

  // ⭐ ADDED: Address form state
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  // ⭐ ADDED: Payment method state
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // ⭐ ADDED: Handle form changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setAddress((previous) => ({
      ...previous,
      [name]: value,
    }));
  };
  // ⭐ ADDED: Calculate checkout totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.discountPrice * item.quantity,
    0,
  );

  const originalTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const totalDiscount = originalTotal - subtotal;

  const deliveryFee = subtotal >= 999 ? 0 : 99;

  const totalAmount = subtotal + deliveryFee;

  // ⭐ CHANGED: Create order
  const handleSubmit = (event) => {
    event.preventDefault();

    // ⭐ Create a unique order ID
    const orderId = `ORD-${Date.now()}`;

    // ⭐ Create order object
    const newOrder = {
      id: orderId,

      // Order date
      date: new Date().toISOString(),

      // Order status
      status: "Placed",

      // Delivery information
      address,

      // Payment method
      paymentMethod,

      // Products purchased
      items: cartItems.map((item) => ({
        id: item.id,
        product: item.product,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      })),

      // Price information
      subtotal,
      originalTotal,
      totalDiscount,
      deliveryFee,
      totalAmount,
    };

    // ⭐ Get existing orders
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");

    // ⭐ Add newest order at the beginning
    const updatedOrders = [newOrder, ...existingOrders];

    // ⭐ Save orders
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    // ⭐ Clear cart after successful order
    clearCart();

    // ⭐ Go to order confirmation page
    navigate(`/orders/${orderId}`);
  };

  // ⭐ ADDED: Empty cart protection
  if (cartItems.length === 0) {
    return (
      <main className="section">
        <div className="container">
          <div className="mx-auto max-w-lg py-20 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Your Cart is Empty
            </h1>

            <p className="mt-3 text-gray-500">
              Add some products before proceeding to checkout.
            </p>

            <Link
              to="/products"
              className="mt-8 inline-flex rounded-md bg-pink-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="container">
        {/* ⭐ ADDED: Page Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-500">
            Checkout
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            Delivery Details
          </h1>

          <p className="mt-3 text-gray-500">
            Enter your delivery information to continue.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* ⭐ ADDED: Delivery Address Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-gray-200 bg-white p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              Delivery Address
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={address.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-pink-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={address.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                  className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-pink-500"
                />
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="addressLine"
                  className="text-sm font-medium text-gray-700"
                >
                  Address
                </label>

                <textarea
                  id="addressLine"
                  name="addressLine"
                  value={address.addressLine}
                  onChange={handleChange}
                  placeholder="House number, street, area"
                  rows="3"
                  required
                  className="mt-2 w-full resize-none rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-pink-500"
                />
              </div>

              {/* City */}
              <div>
                <label
                  htmlFor="city"
                  className="text-sm font-medium text-gray-700"
                >
                  City
                </label>

                <input
                  id="city"
                  name="city"
                  type="text"
                  value={address.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  required
                  className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-pink-500"
                />
              </div>

              {/* State */}
              <div>
                <label
                  htmlFor="state"
                  className="text-sm font-medium text-gray-700"
                >
                  State
                </label>

                <input
                  id="state"
                  name="state"
                  type="text"
                  value={address.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                  required
                  className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-pink-500"
                />
              </div>

              {/* Pincode */}
              <div>
                <label
                  htmlFor="pincode"
                  className="text-sm font-medium text-gray-700"
                >
                  Pincode
                </label>

                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  value={address.pincode}
                  onChange={handleChange}
                  placeholder="Enter pincode"
                  required
                  className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-pink-500"
                />
              </div>
            </div>

            {/* ⭐ ADDED: Payment Method */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Payment Method
              </h2>

              <div className="mt-5 space-y-3">
                {/* Cash on Delivery */}
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition ${
                    paymentMethod === "cod"
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                    className="accent-pink-500"
                  />

                  <div>
                    <p className="font-medium text-gray-900">
                      Cash on Delivery
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Pay when your order is delivered.
                    </p>
                  </div>
                </label>

                {/* Online Payment */}
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition ${
                    paymentMethod === "online"
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                    className="accent-pink-500"
                  />

                  <div>
                    <p className="font-medium text-gray-900">Online Payment</p>

                    <p className="mt-1 text-sm text-gray-500">
                      Pay securely using online payment.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* ⭐ ADDED: Continue Button */}
            <button
              type="submit"
              className="mt-8 w-full rounded-md bg-pink-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-600 sm:w-auto"
            >
              Place Order
            </button>
          </form>

          {/* ⭐ CHANGED: Complete Order Summary */}
          <div className="h-fit rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Order Summary
            </h2>

            {/* Products */}
            <div className="mt-6 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 text-sm"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-gray-900">
                      {item.product.name}
                    </p>

                    <p className="mt-1 text-gray-500">Qty: {item.quantity}</p>
                  </div>

                  <span className="shrink-0 font-medium text-gray-900">
                    ₹{item.product.discountPrice * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="my-5 border-t border-dashed border-gray-300" />

            {/* Price Details */}
            <div className="space-y-4 text-sm">
              {/* Original Price */}
              <div className="flex items-center justify-between text-gray-600">
                <span>Price</span>
                <span>₹{originalTotal}</span>
              </div>

              {/* Discount */}
              <div className="flex items-center justify-between text-gray-600">
                <span>Discount</span>

                <span className="text-green-600">− ₹{totalDiscount}</span>
              </div>

              {/* Delivery */}
              <div className="flex items-center justify-between text-gray-600">
                <span>Delivery Fee</span>

                {deliveryFee === 0 ? (
                  <span className="font-medium text-green-600">FREE</span>
                ) : (
                  <span>₹{deliveryFee}</span>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="my-5 border-t border-gray-200" />

            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900">Total Amount</span>

              <span className="text-xl font-bold text-gray-900">
                ₹{totalAmount}
              </span>
            </div>

            {/* Savings */}
            {totalDiscount > 0 && (
              <div className="mt-4 rounded-md bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                You saved ₹{totalDiscount} on this order
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
