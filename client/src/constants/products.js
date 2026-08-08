import menTshirt from "../assets/products/men-tshirt.jpg"; // ⭐ ADDED
import womenDress from "../assets/products/women-dress.jpg"; // ⭐ ADDED
import kidsHoodie from "../assets/products/kids-hoodie.jpg"; // ⭐ ADDED
import faceSerum from "../assets/products/face-serum.jpg"; // ⭐ ADDED
import ceramicVase from "../assets/products/ceramic-vase.jpg"; // ⭐ ADDED

const products = [
  {
    id: 1,
    name: "Classic Oversized T-Shirt",
    brand: "FashionHub",
    category: "men",
    price: 999,
    discountPrice: 699,
    discount: 30,
    rating: 4.5,
    reviews: 128,
    image: menTshirt,
  },

  {
    id: 2,
    name: "Elegant Summer Dress",
    brand: "FashionHub",
    category: "women",
    price: 1999,
    discountPrice: 1399,
    discount: 30,
    rating: 4.7,
    reviews: 245,
    image: womenDress,
  },

  {
    id: 3,
    name: "Casual Kids Hoodie",
    brand: "FashionHub Kids",
    category: "kids",
    price: 1299,
    discountPrice: 899,
    discount: 31,
    rating: 4.4,
    reviews: 96,
    image: kidsHoodie,
  },

  {
    id: 4,
    name: "Hydrating Face Serum",
    brand: "Glow Beauty",
    category: "beauty",
    price: 899,
    discountPrice: 649,
    discount: 28,
    rating: 4.6,
    reviews: 312,
    image: faceSerum,
  },

  {
    id: 5,
    name: "Minimal Ceramic Vase",
    brand: "HomeStyle",
    category: "home-living",
    price: 799,
    discountPrice: 549,
    discount: 31,
    rating: 4.3,
    reviews: 74,
    image: ceramicVase,
  },
];

export default products;