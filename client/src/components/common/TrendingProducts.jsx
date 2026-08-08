import { Link } from "react-router-dom";
import products from "../../constants/products";
import ProductCard from "./ProductCard";

function TrendingProducts() {
  return (
    <section className="section">
      <div className="container">

        {/* ⭐ ADDED: Section Heading */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-500">
            Trending Now
          </p>

          <div className="mt-2 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                Trending Products
              </h2>

              <p className="mt-3 text-gray-500">
                Discover what everyone is loving right now.
              </p>
            </div>

            {/* ⭐ ADDED: View All Link */}
            <Link
              to="/products"
              className="hidden text-sm font-semibold text-pink-500 hover:text-pink-600 sm:block"
            >
              View All →
            </Link>
          </div>
        </div>

        {/* ⭐ ADDED: Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        {/* ⭐ ADDED: Mobile View All */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/products"
            className="font-semibold text-pink-500 hover:text-pink-600"
          >
            View All Products →
          </Link>
        </div>

      </div>
    </section>
  );
}

export default TrendingProducts;