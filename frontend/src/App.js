// App.jsx
import React, { useState } from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import CartPage from "./pages/Cart";
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
        </Routes>
        <Cart isOpen={isCartOpen} onClose={closeCart} /> {/* Подключаем корзину */}
      </BrowserRouter>
    </Provider>
  );
}


export default App;





/*
The selected code snippet is part of the main React application file, `App.jsx`. This code defines the `App` component, 
    which is the root component of the application. Here's a breakdown of the code:

1. Import statements: The code imports necessary modules and components from various libraries and files. 
    It imports React, useState from 'react', NavBar, BrowserRouter, Routes, Route from 'react-router-dom', 
       Cart from './pages/Cart.jsx', Provider from 'react-redux', and store from './redux/store'.

2. `App` function component: The `App` function component is defined. It uses React's useState hook to manage the state of the 
     cart's visibility. The `isCartOpen` state variable is initialized to false, indicating that the cart is initially closed.

3. `openCart` and `closeCart` functions: These functions are used to toggle the `isCartOpen` state variable. 
     The `openCart` function sets `isCartOpen` to true, while the `closeCart` function sets it to false.

4. JSX return statement: The `App` component returns a JSX expression that renders the application's UI. 
    It uses the Provider component from 'react-redux' to provide the Redux store to the application. Inside the Provider, 
      it uses BrowserRouter to wrap the application's navigation and routing.

5. Navigation bar: The NavBar component is rendered using the `<NavBar openCart={openCart} />` syntax. 
    The `openCart` function is passed as a prop to the NavBar component, allowing it to open the cart when the user clicks on the cart icon.

6. Routes: The Routes component from 'react-router-dom' is used to define the application's routes. 
    Two routes are defined: one for the home page ("/") and another for the cart page ("/cart"). The corresponding components, 
       Shop and CartPage, are rendered when the respective routes are accessed.

7. Cart component: The Cart component is rendered using the `<Cart isOpen={isCartOpen} onClose={closeCart} />` syntax. 
     The `isOpen` prop is used to control the visibility of the cart, and the `onClose` prop is used to close the cart when the user clicks 
      outside of it.

Overall, the selected code snippet sets up the main structure of the React application, 
     including the navigation bar, routes, and the Cart component. 
     It also manages the state of the cart's visibility using React's useState hook.

*/