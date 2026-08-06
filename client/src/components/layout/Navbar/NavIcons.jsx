import { User, Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

function NavIcons() {
  return(
    <div className="flex items-center gap-6">

      {/* Profile */}
      <Link
        to="/profile"
        className="flex flex-col items-center text-gray-700 hover:text-pink-500 transition-colors duration-200"
      >
        <User size={22} />
        <span>Profile</span>
      </Link>
       {/* Wishlist */}
      <Link
        to="/wishlist"
        className="flex flex-col items-center text-gray-700 hover:text-pink-500 transition-colors duration-200"
      >
        <Heart size={22} />
        <span className="mt-1 text-xs">Wishlist</span>
      </Link>

      {/* Cart */}
      <Link
        to="/cart"
        className="flex flex-col items-center text-gray-700 hover:text-pink-500 transition-colors duration-200"
      >
        <ShoppingBag size={22} />
        <span className="mt-1 text-xs">Cart</span>
      </Link>
    </div>
  )
}

export default NavIcons;