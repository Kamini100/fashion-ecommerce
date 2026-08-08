import { Link } from "react-router-dom";
import menImage from "../../assets/categories/men.jpg";
import womenImage from "../../assets/categories/women.jpg";
import kidsImage from "../../assets/categories/kids.jpg";
import beautyImage from "../../assets/categories/beauty.jpg";
import homeLivingImage from "../../assets/categories/home-living.jpg";

const categories = [
  {
    name: "Men",
    description: "Explore men's fashion",
    category: "men",
    image: menImage,
  },
  {
    name: "Women",
    description: "Discover women's fashion",
    category: "women",
    image: womenImage,
  },
  {
    name: "Kids",
    description: "Style for every age",
    category: "kids",
    image: kidsImage,
  },
  {
    name: "Beauty",
    description: "Beauty & personal care",
    category: "beauty",
    image: beautyImage,
  },
  {
    name: "Home & Living",
    description: "Upgrade your space",
    category: "home-living",
    image: homeLivingImage,
  },
];

function CategorySection() {
  return (
    <section className="section">
    <div className="container">

      {/* ⭐ ADDED: Section Heading */}
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-500">
          Explore
        </p>

        <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
          Shop By Category
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-gray-500">
          Discover styles curated for every part of your lifestyle.
        </p>
      </div>

      {/* ⭐ ADDED: Category Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((category) => (
          <Link
            key={category.category}
            to={`/products?category=${category.category}`}
            className="group rounded-xl border border-gray-200 bg-gray-50 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mx-auto h-64 overflow-hidden rounded-lg">
              <img
                src={category.image} // ⭐ ADDED
                alt={category.name} // ⭐ ADDED
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105" // ⭐ ADDED
              />
            </div>

            <h3 className="mt-5 font-semibold text-gray-900 group-hover:text-pink-500">
              {category.name}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              {category.description}
            </p>

            <span className="mt-4 inline-block text-sm font-medium text-pink-500">
              Shop Now →
            </span>
          </Link>
        ))}
      </div>
    </div>
    </section>
  );
}

export default CategorySection;