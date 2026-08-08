import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";

// ⭐ ADDED: Wishlist Context
import { useWishlist } from "../../context/WishlistContext";

function Wishlist() {
  // ⭐ ADDED: Get wishlist data and actions
  const {
    wishlistItems,
    removeFromWishlist,
  } = useWishlist();

  // ⭐ ADDED: Empty wishlist
  if (wishlistItems.length === 0) {
    return (
      <main className="section">
        <div className="container">

          <div className="mx-auto max-w-lg py-20 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-50">
              <Heart
                size={30}
                className="text-pink-500"
              />
            </div>

            <h1 className="mt-6 text-2xl font-bold text-gray-900">
              Your Wishlist is Empty
            </h1>

            <p className="mt-3 text-gray-500">
              Save your favorite products here and come back to them later.
            </p>

            <Link
              to="/products"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-pink-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
            >
              <ShoppingBag size={17} />
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

        {/* Page Header */}
        <div className="mb-10">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-500">
            Saved For You
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            My Wishlist
          </h1>

          <p className="mt-3 text-gray-500">
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1
              ? "item"
              : "items"}{" "}
            saved in your wishlist.
          </p>

        </div>

        {/* Wishlist Products */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {wishlistItems.map((product) => (

            <div
              key={product.id}
              className="group overflow-hidden rounded-xl border border-gray-200 bg-white"
            >

              {/* Product Image */}
              <div className="relative">

                <Link to={`/products/${product.id}`}>

                  <div className="h-72 overflow-hidden bg-gray-100">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                  </div>

                </Link>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() =>
                    removeFromWishlist(product.id)
                  }
                  aria-label="Remove from wishlist"
                  className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110 hover:text-pink-500"
                >
                  <Trash2 size={18} />
                </button>

              </div>

              {/* Product Information */}
              <div className="p-4">

                <p className="text-sm font-medium text-gray-500">
                  {product.brand}
                </p>

                <Link to={`/products/${product.id}`}>

                  <h3 className="mt-1 truncate font-semibold text-gray-900 transition-colors hover:text-pink-500">
                    {product.name}
                  </h3>

                </Link>

                {/* Price */}
                <div className="mt-3 flex items-center gap-2">

                  <span className="font-bold text-gray-900">
                    ₹{product.discountPrice}
                  </span>

                  <span className="text-sm text-gray-400 line-through">
                    ₹{product.price}
                  </span>

                </div>

                {/* View Product */}
                <Link
                  to={`/products/${product.id}`}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-pink-500 hover:text-pink-500"
                >
                  View Product
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>
    </main>
  );
}

export default Wishlist;