// App.jsx
import React, { useState } from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import CartPage from "./pages/Cart";
import Product from "./pages/Product";
import Cart from "./pages/Cart.jsx"; // Импортируем корзину
import { CartProvider, CartContext } from "./contexts/CartContext"; // Импортируем провайдер корзины

function App() {
  const [cartTotal, setCartTotal] = useState(0);
  const [isCartOpen, setCartOpen] = useState(false); // Состояние для управления корзиной

  const openCart = () => {
    setCartOpen(true);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  // Рассчитайте налог и итоговую сумму
  const taxRate = 0.05; // 5%
  const taxAmount = cartTotal * taxRate;
  const totalWithTax = cartTotal + taxAmount;

  return (
    <div>
      <CartProvider>
        <BrowserRouter>
          <NavBar
            cartTotal={cartTotal}
            cartTotalWithTax={totalWithTax}
            openCart={openCart}
          />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product" element={<Product />} />
          </Routes>
          <Cart isOpen={isCartOpen} onClose={closeCart} /> {/* Подключаем корзину */}
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
