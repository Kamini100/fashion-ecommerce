import { Link, useParams } from "react-router-dom"; // ⭐ ADDED
import { useState } from "react";
import products from "../../constants/products"; // ⭐ ADDED
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

function ProductDetails() {
  // ⭐ ADDED: Get product ID from URL
  const { productId } = useParams();

  // ⭐ ADDED: Product variant state
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  // ⭐ ADDED: Wishlist functions
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // ⭐ ADDED
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    if (!selectedColor) {
      alert("Please select a color.");
      return;
    }

    addToCart(product, quantity, selectedSize, selectedColor);
  };

  // ⭐ ADDED: Wishlist handler
  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // ⭐ ADDED: Find matching product
  const product = products.find((item) => String(item.id) === productId);

  // ⭐ ADDED: Handle invalid product ID
  if (!product) {
    return (
      <main className="section">
        <div className="container">
          <div className="py-20 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Product Not Found
            </h1>

            <p className="mt-3 text-gray-500">
              The product you are looking for does not exist.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      {/* ⭐ ADDED: Back to Products */}
      <div className="mb-6">
        <Link
          to="/products"
          className="inline-flex items-center text-sm font-medium text-gray-500 transition hover:text-pink-500"
        >
          ← Back to Products
        </Link>
      </div>
      <div className="container">
        {/* ⭐ ADDED: Product Details Layout */}
        <div className="grid gap-10 lg:grid-cols-2">
          {/* ⭐ ADDED: Product Image */}
          <div className="overflow-hidden rounded-2xl bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="h-full max-h-[650px] w-full object-cover"
            />
          </div>

          {/* ⭐ ADDED: Product Information */}
          <div className="py-4">
            {/* Category */}
            <p className="text-sm font-medium uppercase tracking-wider text-pink-500">
              {product.category}
            </p>

            {/* Product Name */}
            <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-3">
              <span className="rounded-md bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                ⭐ {product.rating}
              </span>

              {/* ⭐ CHANGED: Show review count */}
              <span className="text-sm text-gray-500">
                {product.reviews} Reviews
              </span>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.discountPrice}
              </span>

              <span className="text-lg text-gray-400 line-through">
                ₹{product.price}
              </span>

              <span className="text-sm font-semibold text-pink-500">
                {product.discount}% OFF
              </span>
            </div>

            {/* ⭐ ADDED: Size Selection */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Select Size</h2>

                <button
                  type="button"
                  className="text-sm font-medium text-pink-500 hover:text-pink-600"
                >
                  Size Guide
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`flex h-11 min-w-11 items-center justify-center rounded-md border px-4 text-sm font-medium transition ${
                      selectedSize === size
                        ? "border-pink-500 bg-pink-500 text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:border-pink-500"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* ⭐ ADDED: Color Selection */}
            <div className="mt-6">
              <h2 className="font-semibold text-gray-900">Select Color</h2>

              <div className="mt-4 flex flex-wrap gap-3">
                {[
                  { name: "Black", value: "black" },
                  { name: "White", value: "white" },
                  { name: "Blue", value: "blue" },
                ].map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setSelectedColor(color.name)}
                    className={`rounded-md border px-4 py-2 text-sm transition ${
                      selectedColor === color.name
                        ? "border-pink-500 bg-pink-50 text-pink-600"
                        : "border-gray-300 text-gray-700 hover:border-pink-500"
                    }`}
                  >
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            {/* ⭐ ADDED: Quantity */}
            <div className="mt-6">
              <h2 className="font-semibold text-gray-900">Quantity</h2>

              <div className="mt-4 flex w-fit items-center overflow-hidden rounded-md border border-gray-300">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((previous) => Math.max(1, previous - 1))
                  }
                  className="flex h-11 w-11 items-center justify-center text-lg text-gray-700 transition hover:bg-gray-100"
                >
                  −
                </button>

                <span className="flex h-11 w-12 items-center justify-center border-x border-gray-300 text-sm font-medium">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() => setQuantity((previous) => previous + 1)}
                  className="flex h-11 w-11 items-center justify-center text-lg text-gray-700 transition hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* ⭐ ADDED: Add to Cart Button */}
            {/* ⭐ CHANGED: Add to Cart + Wishlist Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {/* Add to Cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full rounded-md bg-pink-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-600 sm:w-auto"
              >
                Add to Cart
              </button>

              {/* ⭐ ADDED: Wishlist Button */}
              <button
                type="button"
                onClick={handleWishlist}
                className={`flex w-full items-center justify-center gap-2 rounded-md border px-6 py-3 text-sm font-semibold transition sm:w-auto ${
                  isInWishlist(product.id)
                    ? "border-pink-500 bg-pink-50 text-pink-500"
                    : "border-gray-300 text-gray-700 hover:border-pink-500 hover:text-pink-500"
                }`}
              >
                {isInWishlist(product.id)
                  ? "♥ Remove from Wishlist"
                  : "♡ Add to Wishlist"}
              </button>
            </div>

            {/* Description */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h2 className="font-semibold text-gray-900">Description</h2>

              <p className="mt-3 leading-7 text-gray-500">
                {product.description}
              </p>
            </div>
            {/* ⭐ ADDED: Product Highlights */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h2 className="font-semibold text-gray-900">
                Product Highlights
              </h2>

              <ul className="mt-4 space-y-3 text-sm text-gray-600">
                <li>✓ Premium quality material</li>
                <li>✓ Comfortable and stylish design</li>
                <li>✓ Easy to maintain</li>
                <li>✓ Suitable for everyday use</li>
              </ul>
            </div>
            {/* ⭐ ADDED: Delivery & Return Information */}
            <div className="mt-8 grid gap-4 border-t border-gray-200 pt-6 sm:grid-cols-3">
              {/* Free Delivery */}
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="font-semibold text-gray-900">
                  🚚 Free Delivery
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Free delivery on eligible orders.
                </p>
              </div>

              {/* Easy Returns */}
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="font-semibold text-gray-900">↩ Easy Returns</h3>

                <p className="mt-1 text-sm text-gray-500">
                  Easy returns within 7 days.
                </p>
              </div>

              {/* Secure Payment */}
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="font-semibold text-gray-900">
                  🔒 Secure Payment
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Safe and secure checkout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
