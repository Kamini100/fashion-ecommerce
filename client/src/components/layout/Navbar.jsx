import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black text-white px-10 py-4 flex items-center justify-between">
      {/* Logo */}
      <h1 className="text-3xl font-bold cursor-pointer">
        FashionHub
      </h1>

      {/* Navigation */}
      <div className="flex items-center gap-8">
        <Link
          to="/"
          className="text-white no-underline hover:text-pink-500 transition duration-300">
          Home
        </Link>

        <Link
          to="/products"
          className="text-white no-underline hover:text-pink-500 transition duration-300">
          Products
        </Link>

        <Link
          to="/wishlist"
          className="text-white no-underline hover:text-pink-500 transition duration-300">
          Wishlist
        </Link>

        <Link
          to="/cart"
          className="text-white no-underline hover:text-pink-500 transition duration-300">
          Cart
        </Link>

        <Link
          to="/login"
          className="text-white no-underline hover:text-pink-500 transition duration-300">
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;