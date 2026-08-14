import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Orders() {
  const { orderId } = useParams(); // ⭐ ADDED

  const [orders, setOrders] = useState([]);

  // ⭐ Get all saved orders
  useEffect(() => {
    const savedOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    setOrders(savedOrders);
  }, []);

  // ⭐ Find specific order when orderId exists
  const selectedOrder = orderId
    ? orders.find((order) => order.id === orderId)
    : null;

  // =====================================================
  // ⭐ SPECIFIC ORDER DETAILS
  // =====================================================

  if (orderId) {
    // Order doesn't exist
    if (!selectedOrder) {
      return (
        <main className="section">
          <div className="container">
            <div className="mx-auto max-w-lg py-20 text-center">

              <div className="text-5xl">📦</div>

              <h1 className="mt-6 text-2xl font-bold text-gray-900">
                Order Not Found
              </h1>

              <p className="mt-3 text-gray-500">
                We couldn't find the order you're looking for.
              </p>

              <Link
                to="/orders"
                className="mt-8 inline-flex rounded-md bg-pink-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
              >
                Back to My Orders
              </Link>

            </div>
          </div>
        </main>
      );
    }

    const orderDate = new Date(
      selectedOrder.date
    ).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return (
      <main className="section">
        <div className="container">

          {/* Page Header */}
          <div className="mb-10">

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-500">
              Order Details
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
              Order Details
            </h1>

            <p className="mt-3 text-gray-500">
              View the details of your order.
            </p>

          </div>

          {/* Order Details Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">

            {/* Order Header */}
            <div className="flex flex-col gap-5 border-b border-gray-200 pb-6 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Order ID
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {selectedOrder.id}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Order Date
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {orderDate}
                </p>
              </div>

              <span className="w-fit rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                {selectedOrder.status}
              </span>

            </div>

            {/* Ordered Products */}
            <div className="py-6">

              <h2 className="text-lg font-semibold text-gray-900">
                Ordered Products
              </h2>

              <div className="mt-5 space-y-5">

                {selectedOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b border-gray-100 pb-5 last:border-0 last:pb-0"
                  >

                    {/* Product Image */}
                    <div className="h-24 w-20 shrink-0 overflow-hidden rounded-md bg-gray-100">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Product Information */}
                    <div className="flex-1">

                      <h3 className="font-medium text-gray-900">
                        {item.product.name}
                      </h3>

                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">

                        <span>
                          Qty:{" "}
                          <strong className="text-gray-700">
                            {item.quantity}
                          </strong>
                        </span>

                        <span>
                          Size:{" "}
                          <strong className="text-gray-700">
                            {item.size || "N/A"}
                          </strong>
                        </span>

                        <span>
                          Color:{" "}
                          <strong className="text-gray-700">
                            {item.color || "N/A"}
                          </strong>
                        </span>

                      </div>

                      <p className="mt-2 font-semibold text-gray-900">
                        ₹
                        {item.product.discountPrice *
                          item.quantity}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

            </div>

            {/* Delivery + Payment */}
            <div className="grid gap-6 border-t border-gray-200 pt-6 md:grid-cols-2">

              {/* Delivery Address */}
              <div>

                <h2 className="font-semibold text-gray-900">
                  Delivery Address
                </h2>

                <div className="mt-3 text-sm leading-6 text-gray-500">

                  <p className="font-medium text-gray-700">
                    {selectedOrder.address.fullName}
                  </p>

                  <p>
                    {selectedOrder.address.addressLine}
                  </p>

                  <p>
                    {selectedOrder.address.city},{" "}
                    {selectedOrder.address.state} -{" "}
                    {selectedOrder.address.pincode}
                  </p>

                  <p>
                    Phone: {selectedOrder.address.phone}
                  </p>

                </div>

              </div>

              {/* Payment */}
              <div>

                <h2 className="font-semibold text-gray-900">
                  Payment Method
                </h2>

                <p className="mt-3 text-sm text-gray-500">
                  {selectedOrder.paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : "Online Payment"}
                </p>

              </div>

            </div>

            {/* Price Details */}
            <div className="mt-6 border-t border-gray-200 pt-6">

              <h2 className="font-semibold text-gray-900">
                Price Details
              </h2>

              <div className="mt-4 max-w-sm space-y-3 text-sm">

                <div className="flex justify-between text-gray-600">
                  <span>Price</span>
                  <span>
                    ₹{selectedOrder.originalTotal}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Discount</span>

                  <span className="text-green-600">
                    − ₹{selectedOrder.totalDiscount}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>

                  <span>
                    {selectedOrder.deliveryFee === 0 ? (
                      <span className="text-green-600">
                        FREE
                      </span>
                    ) : (
                      `₹${selectedOrder.deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between border-t border-dashed border-gray-300 pt-3">

                  <span className="font-semibold text-gray-900">
                    Total Amount
                  </span>

                  <span className="text-xl font-bold text-gray-900">
                    ₹{selectedOrder.totalAmount}
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* Back Button */}
          <div className="mt-8">

            <Link
              to="/orders"
              className="inline-flex rounded-md border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-pink-500 hover:text-pink-500"
            >
              ← Back to My Orders
            </Link>

          </div>

        </div>
      </main>
    );
  }

  // =====================================================
  // ⭐ ALL ORDERS
  // =====================================================

  if (orders.length === 0) {
    return (
      <main className="section">
        <div className="container">
          <div className="mx-auto max-w-lg py-20 text-center">

            <div className="text-5xl">📦</div>

            <h1 className="mt-6 text-2xl font-bold text-gray-900">
              No Orders Yet
            </h1>

            <p className="mt-3 text-gray-500">
              You haven't placed any orders yet.
            </p>

            <Link
              to="/products"
              className="mt-8 inline-flex rounded-md bg-pink-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
            >
              Start Shopping
            </Link>

          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="container">

        {/* Page Header */}
        <div className="mb-10">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-500">
            My Account
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            My Orders
          </h1>

          <p className="mt-3 text-gray-500">
            View your previous orders and their details.
          </p>

        </div>

        {/* Orders List */}
        <div className="space-y-6">

          {orders.map((order) => {

            const orderDate = new Date(
              order.date
            ).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });

            return (
              <div
                key={order.id}
                className="rounded-xl border border-gray-200 bg-white p-6"
              >

                {/* Order Header */}
                <div className="flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      Order ID
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {order.id}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      Order Date
                    </p>

                    <p className="mt-1 text-sm text-gray-700">
                      {orderDate}
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                    {order.status}
                  </span>

                </div>

                {/* Order Products */}
                <div className="py-5">

                  <div className="space-y-4">

                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4"
                      >

                        <div className="h-20 w-16 shrink-0 overflow-hidden rounded-md bg-gray-100">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="flex-1">

                          <h2 className="font-medium text-gray-900">
                            {item.product.name}
                          </h2>

                          <div className="mt-1 flex flex-wrap gap-3 text-sm text-gray-500">

                            <span>
                              Qty: {item.quantity}
                            </span>

                            <span>
                              Size: {item.size || "N/A"}
                            </span>

                            <span>
                              Color: {item.color || "N/A"}
                            </span>

                          </div>

                        </div>

                        <p className="font-semibold text-gray-900">
                          ₹
                          {item.product.discountPrice *
                            item.quantity}
                        </p>

                      </div>
                    ))}

                  </div>

                </div>

                {/* Order Footer */}
                <div className="flex flex-col gap-4 border-t border-gray-200 pt-5 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <p className="text-sm text-gray-500">
                      Payment
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-700">
                      {order.paymentMethod === "cod"
                        ? "Cash on Delivery"
                        : "Online Payment"}
                    </p>

                  </div>

                  <div className="flex items-center justify-between gap-6 sm:justify-end">

                    <div>

                      <p className="text-sm text-gray-500">
                        Total
                      </p>

                      <p className="mt-1 text-lg font-bold text-gray-900">
                        ₹{order.totalAmount}
                      </p>

                    </div>

                    <Link
                      to={`/orders/${order.id}`}
                      className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-pink-500 hover:text-pink-500"
                    >
                      View Details
                    </Link>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </main>
  );
}

export default Orders;