import { useState } from "react"; // ⭐ ADDED

function FilterSidebar({ filters, onFilterChange, onClearFilters }) { // ⭐ CHANGED
  const [isOpen, setIsOpen] = useState(false); // ⭐ ADDED

  // ⭐ ADDED
  const handleCategoryChange = (category) => {
    onFilterChange("category", category);
  };

  // ⭐ ADDED
  const handlePriceChange = (price) => {
    onFilterChange("price", price);
  };

  // ⭐ ADDED
  const handleRatingChange = (rating) => {
    onFilterChange("rating", rating);
  };

  return (
    <aside className="w-full shrink-0 lg:w-64">

      {/* ⭐ ADDED: Mobile Filter Button */}
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        className="mb-4 flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 font-semibold lg:hidden"
      >
        <span>Filters</span>

        <span>
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {/* ⭐ CHANGED: Filter container */}
      <div
        className={`rounded-xl border border-gray-200 bg-white p-5 ${
          isOpen ? "block" : "hidden"
        } lg:block`}
      >

        {/* Filter Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Filters
          </h2>

          {/* ⭐ CHANGED: Clear All now works */}
          <button
            type="button"
            onClick={onClearFilters}
            className="text-sm font-medium text-pink-500 hover:text-pink-600"
          >
            Clear All
          </button>
        </div>

        {/* Category */}
        <div className="mt-6 border-t border-gray-100 pt-5">
          <h3 className="font-semibold text-gray-900">
            Category
          </h3>

          <div className="mt-4 space-y-3">

            {[
              ["men", "Men"],
              ["women", "Women"],
              ["kids", "Kids"],
              ["beauty", "Beauty"],
              ["home-living", "Home & Living"],
            ].map(([value, label]) => (
              <label
                key={value}
                className="flex cursor-pointer items-center gap-3 text-sm text-gray-600"
              >
                <input
                  type="radio"
                  name="category"
                  value={value}
                  checked={filters.category === value}
                  onChange={() => handleCategoryChange(value)}
                  className="h-4 w-4 accent-pink-500"
                />

                {label}
              </label>
            ))}

          </div>
        </div>

        {/* Price */}
        <div className="mt-6 border-t border-gray-100 pt-5">
          <h3 className="font-semibold text-gray-900">
            Price
          </h3>

          <div className="mt-4 space-y-3">

            {[
              ["under-500", "Under ₹500"],
              ["500-1000", "₹500 - ₹1000"],
              ["1000-2000", "₹1000 - ₹2000"],
              ["above-2000", "Above ₹2000"],
            ].map(([value, label]) => (
              <label
                key={value}
                className="flex cursor-pointer items-center gap-3 text-sm text-gray-600"
              >
                <input
                  type="radio"
                  name="price"
                  value={value}
                  checked={filters.price === value}
                  onChange={() => handlePriceChange(value)}
                  className="h-4 w-4 accent-pink-500"
                />

                {label}
              </label>
            ))}

          </div>
        </div>

        {/* Rating */}
        <div className="mt-6 border-t border-gray-100 pt-5">
          <h3 className="font-semibold text-gray-900">
            Customer Rating
          </h3>

          <div className="mt-4 space-y-3">

            {[
              ["4", "4★ & above"],
              ["3", "3★ & above"],
            ].map(([value, label]) => (
              <label
                key={value}
                className="flex cursor-pointer items-center gap-3 text-sm text-gray-600"
              >
                <input
                  type="radio"
                  name="rating"
                  value={value}
                  checked={filters.rating === value}
                  onChange={() => handleRatingChange(value)}
                  className="h-4 w-4 accent-pink-500"
                />

                {label}
              </label>
            ))}

          </div>
        </div>

      </div>
    </aside>
  );
}

export default FilterSidebar;