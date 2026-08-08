import { useState, useEffect } from "react"; // ⭐ ADDED
import { useSearchParams } from "react-router-dom";

import products from "../../constants/products";
import ProductCard from "../../components/common/ProductCard";
import FilterSidebar from "../../components/common/FilterSidebar";

function Products() {
  const [searchParams] = useSearchParams();

  // ⭐ ADDED: Filter state
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    price: "",
    rating: "",
  });

  // ⭐ ADDED: Update category when URL changes
  useEffect(() => {
  const categoryFromUrl = searchParams.get("category") || "";

  setFilters((previous) => ({
    ...previous,
    category: categoryFromUrl,
  }));
  }, [searchParams]);

  // ⭐ ADDED: Sorting state
  const [sortBy, setSortBy] = useState("recommended");

  // ⭐ ADDED: Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters((previous) => ({
      ...previous,
      [filterName]: value,
    }));
  };

  // ⭐ ADDED: Clear all filters
  const handleClearFilters = () => {
    setFilters({
      category: "",
      price: "",
      rating: "",
    });
  };

  // ⭐ CHANGED: Get category from filter state
  const selectedCategory = filters.category;

  // ⭐ CHANGED: Filter products
  const filteredProducts = products.filter((product) => {
    // Category filter
    if (
      selectedCategory &&
      product.category !== selectedCategory
    ) {
      return false;
    }

    // Price filter
    if (filters.price === "under-500") {
      if (product.discountPrice >= 500) return false;
    }

    if (filters.price === "500-1000") {
      if (
        product.discountPrice < 500 ||
        product.discountPrice > 1000
      ) {
        return false;
      }
    }

    if (filters.price === "1000-2000") {
      if (
        product.discountPrice < 1000 ||
        product.discountPrice > 2000
      ) {
        return false;
      }
    }

    if (filters.price === "above-2000") {
      if (product.discountPrice <= 2000) return false;
    }

    // Rating filter
    if (filters.rating === "4") {
      if (product.rating < 4) return false;
    }

    if (filters.rating === "3") {
      if (product.rating < 3) return false;
    }

    return true;
  });

  // ⭐ ADDED: Sort filtered products
const sortedProducts = [...filteredProducts].sort((a, b) => {
  if (sortBy === "price-low-high") {
    return a.discountPrice - b.discountPrice;
  }

  if (sortBy === "price-high-low") {
    return b.discountPrice - a.discountPrice;
  }

  if (sortBy === "rating") {
    return b.rating - a.rating;
  }

  if (sortBy === "newest") {
    return b.id - a.id;
  }

  return 0;
});

  // ⭐ CHANGED: Dynamic heading
  const categoryTitle = selectedCategory
    ? selectedCategory
        .split("-")
        .map(
          (word) =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ")
    : "All Products";

  return (
    <main className="section">
      <div className="container">

        {/* Page Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-500">
            Explore
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            {categoryTitle}
          </h1>

          <p className="mt-3 text-gray-500">
            Discover our latest collection and find something you love.
          </p>
        </div>

        {/* ⭐ CHANGED: Product Count + Sort */}
<div className="mb-6 flex items-center justify-between gap-4">

  <p className="text-sm text-gray-500">
    {sortedProducts.length}{" "}
    {sortedProducts.length === 1
      ? "Product"
      : "Products"}
  </p>

  {/* ⭐ ADDED: Sort Dropdown */}
  <div className="flex items-center gap-2">
    <label
      htmlFor="sort"
      className="hidden text-sm text-gray-500 sm:block"
    >
      Sort by:
    </label>

    <select
      id="sort"
      value={sortBy}
      onChange={(event) => setSortBy(event.target.value)}
      className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-pink-500"
    >
      <option value="recommended">
        Recommended
      </option>

      <option value="price-low-high">
        Price: Low to High
      </option>

      <option value="price-high-low">
        Price: High to Low
      </option>

      <option value="rating">
        Customer Rating
      </option>

      <option value="newest">
        Newest
      </option>
    </select>
  </div>

</div>

        {/* Products + Filter Layout */}
        <div className="flex flex-col gap-8 lg:flex-row">

          {/* ⭐ CHANGED: Functional Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />

          {/* Product Grid */}
          <div className="flex-1">

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>

            {/* ⭐ ADDED: No Products Message */}
            {filteredProducts.length === 0 && (
              <div className="py-20 text-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  No products found
                </h2>

                <p className="mt-2 text-gray-500">
                  Try changing or clearing your filters.
                </p>
              </div>
            )}

          </div>

        </div>

      </div>
    </main>
  );
}

export default Products;