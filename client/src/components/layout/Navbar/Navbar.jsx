import { useState } from "react";
import { Menu, X } from "lucide-react";

import Logo from "../../common/Logo";
import SearchBar from "../../common/SearchBar";
import NavLinks from "./NavLinks";
import NavIcons from "./NavIcons";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          <NavLinks />
        </div>

        {/* Desktop Search */}
        <div className="hidden md:block">
          <SearchBar />
        </div>

        {/* Desktop Icons */}
        <div className="hidden lg:block">
          <NavIcons />
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-md p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-6 py-5 lg:hidden">

          {/* Mobile Navigation */}
          <div className="mb-5">
            <NavLinks />
          </div>

          {/* Mobile Search */}
          <div className="mb-5 md:hidden">
            <SearchBar />
          </div>

          {/* Mobile Icons */}
          <NavIcons />

        </div>
      )}
    </header>
  );
}

export default Navbar;

/*
useState - stores whether the mobile menu is open.
*/