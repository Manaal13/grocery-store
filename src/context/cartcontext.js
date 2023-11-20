// context/CartContext.js
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);

};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity) => {
    console.log('Adding to cart:', product, quantity);
    setCartItems((prevCartItems) => [...prevCartItems, { product, quantity }]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
