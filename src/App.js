// App.jsx
import React, { useState } from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import CartPage from "./pages/Cart";
import Product from "./pages/Product";
import Cart from "./pages/Cart.jsx"; // Импортируем корзину
import { Provider } from 'react-redux';
import store from './redux/store'; // Импортируем store из Redux

function App() {
  const [isCartOpen, setCartOpen] = useState(false); // Состояние для управления корзиной

  const openCart = () => {
    setCartOpen(true);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar openCart={openCart} />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product" element={<Product />} />
        </Routes>
        <Cart isOpen={isCartOpen} onClose={closeCart} /> {/* Подключаем корзину */}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
