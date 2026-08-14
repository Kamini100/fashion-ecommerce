import { useEffect, useState } from "react";
import {
  Package,
  ShoppingBag,
  IndianRupee,
  Clock,
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  Eye,
} from "lucide-react";

import productsData from "../../constants/products";

function Admin() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Product management state
  const [products, setProducts] = useState(productsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // New product form
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    discountPrice: "",
    discount: "",
    rating: "",
    image: "",
    description: "",
  });

  // Get saved orders
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");

    setOrders(savedOrders);
  }, []);

  // -----------------------------
  // Product Form
  // -----------------------------

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      price: "",
      discountPrice: "",
      discount: "",
      rating: "",
      image: "",
      description: "",
    });

    setEditingProduct(null);
    setShowForm(false);
  };

  // Add / Update product
  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingProduct) {
      setProducts((previousProducts) =>
        previousProducts.map((product) =>
          product.id === editingProduct.id
            ? {
                ...product,
                ...formData,
                price: Number(formData.price),
                discountPrice: Number(formData.discountPrice),
                discount: Number(formData.discount),
                rating: Number(formData.rating),
              }
            : product,
        ),
      );
    } else {
      const newProduct = {
        id: Date.now(),
        ...formData,
        price: Number(formData.price),
        discountPrice: Number(formData.discountPrice),
        discount: Number(formData.discount),
        rating: Number(formData.rating),
      };

      setProducts((previousProducts) => [newProduct, ...previousProducts]);
    }

    resetForm();
  };

  // Edit product
  const handleEdit = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      discountPrice: product.discountPrice,
      discount: product.discount,
      rating: product.rating,
      image: product.image,
      description: product.description,
    });

    setShowForm(true);
  };

  // Delete product
  const handleDelete = (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;

    setProducts((previousProducts) =>
      previousProducts.filter((product) => product.id !== productId),
    );
  };

  // ⭐ ADDED: Update order status
  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            status: newStatus,
          }
        : order,
    );

    setOrders(updatedOrders);

    // Save updated orders
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    // Update currently opened order
    setSelectedOrder((previous) =>
      previous
        ? {
            ...previous,
            status: newStatus,
          }
        : previous,
    );
  };

  // Search products
  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase();

    return (
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)
    );
  });

  // -----------------------------
  // Dashboard Statistics
  // -----------------------------

  const totalProducts = products.length;

  const totalOrders = orders.length;

  const totalSales = orders.reduce(
    (total, order) => total + (order.totalAmount || 0),
    0,
  );

  const placedOrders = orders.filter(
    (order) => order.status === "Placed",
  ).length;

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
    },
    {
      title: "Total Sales",
      value: `₹${totalSales}`,
      icon: IndianRupee,
    },
    {
      title: "Placed Orders",
      value: placedOrders,
      icon: Clock,
    },
  ];

  return (
    <main className="section">
      <div className="container">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-500">
            Admin Panel
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            Dashboard
          </h1>

          <p className="mt-3 text-gray-500">
            Manage your store and monitor your latest activity.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-xl border border-gray-200 bg-white p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>

                    <p className="mt-2 text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-pink-50 text-pink-500">
                    <Icon size={22} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Product Management */}
        <div className="mt-10 rounded-xl border border-gray-200 bg-white">
          {/* Product Header */}
          <div className="flex flex-col gap-5 border-b border-gray-200 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Manage Products
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add, edit, search and remove products.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setEditingProduct(null);
                setFormData({
                  name: "",
                  category: "",
                  price: "",
                  discountPrice: "",
                  discount: "",
                  rating: "",
                  image: "",
                  description: "",
                });
                setShowForm(true);
              }}
              className="flex w-fit items-center gap-2 rounded-md bg-pink-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
            >
              <Plus size={18} />
              Add Product
            </button>
          </div>

          {/* Search */}
          <div className="border-b border-gray-200 p-6">
            <div className="relative max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search products..."
                className="w-full rounded-md border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-pink-500"
              />
            </div>
          </div>

          {/* Product List */}
          <div className="p-6">
            {filteredProducts.length === 0 ? (
              <div className="py-10 text-center text-gray-500">
                No products found.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col gap-5 rounded-lg border border-gray-200 p-4 md:flex-row md:items-center"
                  >
                    {/* Image */}
                    <div className="h-24 w-20 shrink-0 overflow-hidden rounded-md bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium uppercase tracking-wider text-pink-500">
                        {product.category}
                      </p>

                      <h3 className="mt-1 font-semibold text-gray-900">
                        {product.name}
                      </h3>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                        <span className="font-semibold text-gray-900">
                          ₹{product.discountPrice}
                        </span>

                        <span className="text-gray-400 line-through">
                          ₹{product.price}
                        </span>

                        <span className="text-green-600">
                          {product.discount}% OFF
                        </span>

                        <span className="text-gray-500">
                          ⭐ {product.rating}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(product)}
                        className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-pink-500 hover:text-pink-500"
                      >
                        <Pencil size={16} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(product.id)}
                        className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-red-500 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Add / Edit Product Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-gray-200 p-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {editingProduct ? "Edit Product" : "Add Product"}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Enter product information below.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5 p-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Product Name
                    </label>

                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none focus:border-pink-500"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Category
                    </label>

                    <input
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none focus:border-pink-500"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Original Price
                    </label>

                    <input
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none focus:border-pink-500"
                    />
                  </div>

                  {/* Discount Price */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Discount Price
                    </label>

                    <input
                      name="discountPrice"
                      type="number"
                      value={formData.discountPrice}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none focus:border-pink-500"
                    />
                  </div>

                  {/* Discount */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Discount %
                    </label>

                    <input
                      name="discount"
                      type="number"
                      value={formData.discount}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none focus:border-pink-500"
                    />
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Rating
                    </label>

                    <input
                      name="rating"
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={formData.rating}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none focus:border-pink-500"
                    />
                  </div>
                </div>

                {/* Image */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Image URL
                  </label>

                  <input
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none focus:border-pink-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    required
                    className="mt-2 w-full resize-none rounded-md border border-gray-300 px-4 py-3 text-sm outline-none focus:border-pink-500"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:border-pink-500 hover:text-pink-500"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-md bg-pink-500 px-5 py-3 text-sm font-semibold text-white hover:bg-pink-600"
                  >
                    {editingProduct ? "Update Product" : "Add Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Recent Orders */}
        <div className="mt-10 rounded-xl border border-gray-200 bg-white">
          {/* Header */}
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Orders
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              View and manage your latest customer orders.
            </p>
          </div>

          {/* Empty State */}
          {orders.length === 0 ? (
            <div className="p-10 text-center">
              <ShoppingBag size={32} className="mx-auto text-gray-400" />

              <p className="mt-3 font-medium text-gray-900">No orders yet</p>

              <p className="mt-1 text-sm text-gray-500">
                Orders will appear here after customers place them.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {orders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"
                >
                  {/* Order Information */}
                  <div>
                    <p className="font-semibold text-gray-900">{order.id}</p>

                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {order.items.length}{" "}
                      {order.items.length === 1 ? "product" : "products"}
                    </p>
                  </div>

                  {/* Order Actions */}
                  <div className="flex flex-wrap items-center gap-4">
                    {/* Status */}
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-50 text-green-700"
                          : order.status === "Cancelled"
                            ? "bg-red-50 text-red-700"
                            : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>

                    {/* Total */}
                    <span className="font-semibold text-gray-900">
                      ₹{order.totalAmount}
                    </span>

                    {/* View Details */}
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(order)}
                      className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-pink-500 hover:text-pink-500"
                    >
                      <Eye size={16} />
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ⭐ ADDED: Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-gray-200 p-6">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-pink-500">
                    Order Details
                  </p>

                  <h2 className="mt-1 text-lg font-semibold text-gray-900">
                    {selectedOrder.id}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6 p-6">
                {/* Order Status */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Order Status
                  </label>

                  <select
                    value={selectedOrder.status}
                    onChange={(event) =>
                      handleStatusChange(selectedOrder.id, event.target.value)
                    }
                    className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none focus:border-pink-500"
                  >
                    <option value="Placed">Placed</option>

                    <option value="Processing">Processing</option>

                    <option value="Shipped">Shipped</option>

                    <option value="Delivered">Delivered</option>

                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Customer Information */}
                <div className="rounded-lg border border-gray-200 p-5">
                  <h3 className="font-semibold text-gray-900">
                    Delivery Information
                  </h3>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-gray-500">Name</p>

                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {selectedOrder.address?.fullName || "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Phone</p>

                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {selectedOrder.address?.phone || "N/A"}
                      </p>
                    </div>

                    <div className="sm:col-span-2">
                      <p className="text-xs text-gray-500">Address</p>

                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {selectedOrder.address?.addressLine || "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">City</p>

                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {selectedOrder.address?.city || "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">State</p>

                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {selectedOrder.address?.state || "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Pincode</p>

                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {selectedOrder.address?.pincode || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="rounded-lg border border-gray-200 p-5">
                  <h3 className="font-semibold text-gray-900">Payment</h3>

                  <p className="mt-3 text-sm text-gray-600">
                    {selectedOrder.paymentMethod === "cod"
                      ? "Cash on Delivery"
                      : "Online Payment"}
                  </p>
                </div>

                {/* Products */}
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Ordered Products
                  </h3>

                  <div className="mt-4 space-y-4">
                    {selectedOrder.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 rounded-lg border border-gray-200 p-4"
                      >
                        {/* Image */}
                        <div className="h-20 w-16 shrink-0 overflow-hidden rounded-md bg-gray-100">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="min-w-0 flex-1">
                          <h4 className="font-medium text-gray-900">
                            {item.product.name}
                          </h4>

                          <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-500">
                            <span>Qty: {item.quantity}</span>

                            <span>Size: {item.size || "N/A"}</span>

                            <span>Color: {item.color || "N/A"}</span>
                          </div>
                        </div>

                        {/* Price */}
                        <p className="font-semibold text-gray-900">
                          ₹{item.product.discountPrice * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Summary */}
                <div className="border-t border-gray-200 pt-5">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Original Price</span>
                      <span>₹{selectedOrder.originalTotal}</span>
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
                        {selectedOrder.deliveryFee === 0
                          ? "FREE"
                          : `₹${selectedOrder.deliveryFee}`}
                      </span>
                    </div>

                    <div className="flex justify-between border-t border-gray-200 pt-4 text-base font-bold text-gray-900">
                      <span>Total Amount</span>
                      <span>₹{selectedOrder.totalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Admin;
