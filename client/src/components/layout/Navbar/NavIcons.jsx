import { User, Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../../context/WishlistContext";

// ⭐ ADDED: Cart hook
import { useCart } from "../../../context/CartContext";

function NavIcons() {
  // ⭐ ADDED: Get cart count
  const { cartCount } = useCart();
  const { wishlistItems } = useWishlist();

  return (
    <div className="flex items-center gap-6">
      {/* Profile */}
      <Link
        to="/profile"
        className="flex flex-col items-center text-gray-700 transition-colors duration-200 hover:text-pink-500"
      >
        <User size={22} />
        <span className="mt-1 text-xs">Profile</span>
      </Link>

      {/* Wishlist */}
      <Link
        to="/wishlist"
        className="relative flex flex-col items-center text-gray-700 transition-colors duration-200 hover:text-pink-500"
      >
        <div className="relative">
          <Heart size={22} />

          {/* ⭐ ADDED: Wishlist Count */}
          {wishlistItems.length > 0 && (
            <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-500 px-1 text-[10px] font-bold text-white">
              {wishlistItems.length}
            </span>
          )}
        </div>

        <span className="mt-1 text-xs">Wishlist</span>
      </Link>

      {/* Cart */}
      <Link
        to="/cart"
        className="flex flex-col items-center text-gray-700 transition-colors duration-200 hover:text-pink-500"
      >
        {/* ⭐ ADDED: Cart icon + badge */}
        <div className="relative">
          <ShoppingBag size={22} />

          {/* ⭐ ADDED: Cart Count */}
          {cartCount > 0 && (
            <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-500 px-1 text-[10px] font-semibold text-white">
              {cartCount}
            </span>
          )}
        </div>

        <span className="mt-1 text-xs">Cart</span>
      </Link>
    </div>
  );
}

export default NavIcons;
