import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [productAddState, setProductAddState] = useState({});

  // При загрузке компонента CartProvider проверяем localStorage на наличие сохраненной корзины
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    const storedProductAddState = localStorage.getItem('productAddState');
    
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
    if (storedProductAddState) {
      setProductAddState(JSON.parse(storedProductAddState));
    }
  }, []);

  // Каждый раз, когда корзина обновляется, сохраняем её в localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Также сохраняем productAddState
  useEffect(() => {
    localStorage.setItem('productAddState', JSON.stringify(productAddState));
  }, [productAddState]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    setProductAddState((prevState) => ({ ...prevState, [product.id]: true }));
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      setProductAddState((prevState) => {
        const updatedState = { ...prevState };
        delete updatedState[id];
        return updatedState;
      });
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setProductAddState({});
    localStorage.removeItem('cartItems');
    localStorage.removeItem('productAddState');
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, productAddState }}>
      {children}
    </CartContext.Provider>
  );
}
