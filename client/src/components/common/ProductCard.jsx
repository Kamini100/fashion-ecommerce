import { useState } from "react"; // ⭐ ADDED
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react"; // ⭐ CHANGED
import { useCart } from "../../context/CartContext"; // ⭐ ADDED
import { useWishlist } from "../../context/WishlistContext";

function ProductCard({ product }) {
  const [isAdded, setIsAdded] = useState(false); // ⭐ ADDED
  const { addToCart } = useCart();
  const {addToWishlist, removeFromWishlist, isInWishlist,} = useWishlist();
  const navigate = useNavigate();

  // ⭐ ADDED: Cart handler
  const handleAddToCart = () => {
  navigate(`/products/${product.id}`);
};
 
  // ⭐ wishlist context
  const handleWishlist = () => {
  if (isInWishlist(product.id)) {
    removeFromWishlist(product.id);
  } else {
    addToWishlist(product);
  }
};

  return (
    <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

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

        {/* ⭐ ADDED: Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={
            isInWishlist(product.id)
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110"
        >
          <Heart
            size={19}
            className={
              isInWishlist(product.id)
                ? "fill-pink-500 text-pink-500"
                : "text-gray-700"
            }
          />
        </button>

        {/* Discount Badge */}
        {product.discount > 0 && (
          <span className="absolute left-3 top-3 rounded-md bg-pink-500 px-2 py-1 text-xs font-semibold text-white">
            {product.discount}% OFF
          </span>
        )}
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

        {/* Rating */}
        <div className="mt-3 flex items-center gap-1 text-sm">
          <Star
            size={15}
            fill="currentColor"
            className="text-yellow-500"
          />

          <span className="font-medium text-gray-700">
            {product.rating}
          </span>

          <span className="text-gray-400">
            ({product.reviews})
          </span>
        </div>

        {/* ⭐ ADDED: Add to Cart Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-pink-500"
        >
          <ShoppingBag size={17} />

          {isAdded ? "Added to Cart ✓" : "Add to Cart"}
        </button>

      </div>
    </article>
  );
}

export default ProductCard;