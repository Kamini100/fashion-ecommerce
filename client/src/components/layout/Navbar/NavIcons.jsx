import {
  User,
  Heart,
  ShoppingBag,
  LogIn,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import { useWishlist } from "../../../context/WishlistContext";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";

function NavIcons() {
  // ⭐ Get cart and wishlist counts
  const { cartCount } = useCart();
  const { wishlistItems } = useWishlist();

  // ⭐ Navigation
  const navigate = useNavigate();

  // ⭐ Check login state
  const {loggedInUser, logout} = useAuth();

  // ⭐ Logout handler
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex items-center gap-6">

      {/* ⭐ Profile / Login */}
      {loggedInUser ? (
        <div className="flex flex-col items-center text-gray-700">
          <Link
            to="/profile"
            className="flex flex-col items-center transition-colors duration-200 hover:text-pink-500"
          >
            <User size={22} />

            <span className="mt-1 text-xs">
              Profile
            </span>
          </Link>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="mt-1 text-[10px] font-medium text-gray-500 transition hover:text-pink-500"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="flex flex-col items-center text-gray-700 transition-colors duration-200 hover:text-pink-500"
        >
          <LogIn size={22} />

          <span className="mt-1 text-xs">
            Login
          </span>
        </Link>
      )}

      {/* Wishlist */}
      <Link
        to="/wishlist"
        className="relative flex flex-col items-center text-gray-700 transition-colors duration-200 hover:text-pink-500"
      >
        <div className="relative">

          <Heart size={22} />

          {/* Wishlist Count */}
          {wishlistItems.length > 0 && (
            <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-500 px-1 text-[10px] font-bold text-white">
              {wishlistItems.length}
            </span>
          )}

        </div>

        <span className="mt-1 text-xs">
          Wishlist
        </span>
      </Link>

      {/* Cart */}
      <Link
        to="/cart"
        className="flex flex-col items-center text-gray-700 transition-colors duration-200 hover:text-pink-500"
      >
        <div className="relative">

          <ShoppingBag size={22} />

          {/* Cart Count */}
          {cartCount > 0 && (
            <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-500 px-1 text-[10px] font-semibold text-white">
              {cartCount}
            </span>
          )}

        </div>

        <span className="mt-1 text-xs">
          Cart
        </span>
      </Link>

    </div>
  );
}

export default NavIcons;