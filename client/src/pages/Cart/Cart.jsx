import { Link } from "react-router-dom";

// ⭐ ADDED: Cart hook
import { useCart } from "../../context/CartContext";

function Cart() {
  // ⭐ ADDED: Get cart items
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  // ⭐ ADDED: Empty cart state
  if (cartItems.length === 0) {
    return (
      <main className="section">
        <div className="container">
          <div className="mx-auto max-w-lg py-20 text-center">
            <div className="text-6xl">🛍️</div>

            <h1 className="mt-6 text-2xl font-bold text-gray-900">
              Your Cart is Empty
            </h1>

            <p className="mt-3 text-gray-500">
              Looks like you haven't added anything to your cart yet.
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

  // ⭐ ADDED: Calculate cart subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.discountPrice * item.quantity,
    0,
  );

  // ⭐ ADDED: Calculate original price
  const originalTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  // ⭐ ADDED: Calculate discount
  const totalDiscount = originalTotal - subtotal;

  // ⭐ ADDED: Delivery fee
  const deliveryFee = subtotal >= 999 ? 0 : 99;

  // ⭐ ADDED: Final total
  const totalAmount = subtotal + deliveryFee;

  // ⭐ ADDED: Total quantity
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <main className="section">
      <div className="container">
        {/* Page Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-500">
            Shopping Bag
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            Your Cart
          </h1>

          <p className="mt-3 text-gray-500">
            Review the products you've selected.
          </p>
        </div>

        {/* ⭐ CHANGED: Cart + Summary Layout */}
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* ⭐ ADDED: Cart Items */}
          <div className="space-y-5">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-5 rounded-xl border border-gray-200 bg-white p-5 sm:flex-row"
              >
                {/* Product Image */}
                <div className="h-40 w-full shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:w-32">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Product Information */}
                <div className="flex-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-pink-500">
                    {item.product.category}
                  </p>

                  <h2 className="mt-2 text-lg font-semibold text-gray-900">
                    {item.product.name}
                  </h2>

                  {/* Price */}
                  <div className="mt-3 flex items-center gap-3">
                    <span className="font-semibold text-gray-900">
                      ₹{item.product.discountPrice}
                    </span>

                    <span className="text-sm text-gray-400 line-through">
                      ₹{item.product.price}
                    </span>
                  </div>

                  {/* ⭐ ADDED: Selected Variants */}
                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                    <span>
                      Size:{" "}
                      <strong className="text-gray-700">
                        {item.size || "Not selected"}
                      </strong>
                    </span>

                    <span>
                      Color:{" "}
                      <strong className="text-gray-700">
                        {item.color || "Not selected"}
                      </strong>
                    </span>

                    {/* ⭐ CHANGED: Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">Quantity:</span>

                      <div className="flex items-center overflow-hidden rounded-md border border-gray-300">
                        {/* ⭐ ADDED: Decrease */}
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="flex h-9 w-9 items-center justify-center text-gray-700 transition hover:bg-gray-100"
                        >
                          −
                        </button>

                        {/* Quantity */}
                        <span className="flex h-9 w-10 items-center justify-center border-x border-gray-300 text-sm font-medium">
                          {item.quantity}
                        </span>

                        {/* ⭐ ADDED: Increase */}
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="flex h-9 w-9 items-center justify-center text-gray-700 transition hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* ⭐ ADDED: Remove Button */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm font-medium text-pink-500 transition hover:text-pink-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* ⭐ ADDED: Order Summary */}
          <div className="h-fit rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Price Details
            </h2>

            <div className="mt-6 space-y-4">
              {/* Total Items */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>
                  Price ({totalItems} {totalItems === 1 ? "item" : "items"})
                </span>

                <span>₹{originalTotal}</span>
              </div>

              {/* Discount */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Discount</span>

                <span className="text-green-600">− ₹{totalDiscount}</span>
              </div>

              {/* Delivery */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Delivery Fee</span>

                <span>
                  {deliveryFee === 0 ? (
                    <span className="font-medium text-green-600">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="my-5 border-t border-dashed border-gray-300" />

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

            {/* ⭐ CHANGED: Proceed to Checkout */}
            <Link
              to="/checkout"
              className="mt-6 flex w-full items-center justify-center rounded-md bg-pink-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cart;
