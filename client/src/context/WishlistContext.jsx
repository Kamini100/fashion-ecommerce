import { createContext, useContext, useState } from "react";

// ⭐ ADDED: Create Wishlist Context
const WishlistContext = createContext();

// ⭐ ADDED: Wishlist Provider
export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  // ⭐ ADDED: Add product to wishlist
  const addToWishlist = (product) => {
    setWishlistItems((previousItems) => {

      // Check if product already exists
      const alreadyExists = previousItems.some(
        (item) => item.id === product.id
      );

      // Don't add duplicate product
      if (alreadyExists) {
        return previousItems;
      }

      return [...previousItems, product];
    });
  };

  // ⭐ ADDED: Remove product from wishlist
  const removeFromWishlist = (productId) => {
    setWishlistItems((previousItems) =>
      previousItems.filter(
        (item) => item.id !== productId
      )
    );
  };

  // ⭐ ADDED: Check whether product is in wishlist
  const isInWishlist = (productId) => {
    return wishlistItems.some(
      (item) => item.id === productId
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// ⭐ ADDED: Custom hook
export function useWishlist() {
  return useContext(WishlistContext);
}