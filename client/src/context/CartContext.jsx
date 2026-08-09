import { createContext, useContext, useState } from "react";

// ⭐ Create Cart Context
const CartContext = createContext();

// ⭐ Cart Provider
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // ⭐ Add product to cart
  const addToCart = (product, quantity = 1, size = "", color = "") => {
    setCartItems((previousItems) => {
      const existingItem = previousItems.find(
        (item) =>
          item.product.id === product.id &&
          item.size === size &&
          item.color === color,
      );

      // ⭐ If same product + same variant already exists
      if (existingItem) {
        return previousItems.map((item) =>
          item.product.id === product.id &&
          item.size === size &&
          item.color === color
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item,
        );
      }

      // ⭐ Add new product to cart
      return [
        ...previousItems,
        {
          id: `${product.id}-${size}-${color}-${Date.now()}`,
          product,
          quantity,
          size,
          color,
        },
      ];
    });
  };

  // ⭐ Remove product from cart
  const removeFromCart = (cartItemId) => {
    setCartItems((previousItems) =>
      previousItems.filter((item) => item.id !== cartItemId),
    );
  };

  // ⭐ Update product quantity
  const updateQuantity = (cartItemId, quantity) => {
    if (quantity < 1) return;

    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item.id === cartItemId ? { ...item, quantity } : item,
      ),
    );
  };

  // ⭐ ADDED: Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // ⭐ Calculate total number of products
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ⭐ Custom hook for accessing cart
export function useCart() {
  return useContext(CartContext);
}
