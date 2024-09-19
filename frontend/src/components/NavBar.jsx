// components/NavBar.jsx
import React from "react";
import "./Styles/NavBar.css";
import logo from "./assets/logo 4.svg";
import basket from "./assets/basket.svg";
import bookmarkIcon from "./assets/zmdi_favorite-outline.svg";
import profile from "./assets/Union.svg";
import { useSelector } from 'react-redux';

const NavBar = ({ openCart }) => {
  const cartTotal = useSelector((state) =>
    state.cart.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  );

  const [isBookmarkClicked, setBookmarkClicked] = React.useState(false);
  const [isProfileClicked, setProfileClicked] = React.useState(false);

  const handleBookmarkClick = () => {
    setBookmarkClicked(!isBookmarkClicked);
  };

  const handleProfileClick = () => {
    setProfileClicked(!isProfileClicked);
  };

  return (
    <div className="header">
      <div className="nav-header-logo">
        <img src={logo} alt="Logo" />
        <div className="text-container">
          <p className="store-name">KROSS STORE</p>
          <p className="description">Магазин лучших кроссовок</p>
        </div>
      </div>
      <ul className="nav-header-info">
        <li className="nav-item" onClick={openCart}>
          <img src={basket} alt="Basket" />
          <div className="cart-info">
            <span>{cartTotal} руб.</span>
          </div>
        </li>
        <li className="nav-item" onClick={handleBookmarkClick}>
          <img src={bookmarkIcon} alt="Bookmark" />
          <span className={isBookmarkClicked ? "clicked" : ""}>
            Закладки
          </span>
        </li>
        <li className="nav-item" onClick={handleProfileClick}>
          <img src={profile} alt="Profile" />
          <span className={isProfileClicked ? "clicked" : ""}>
            Профиль
          </span>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
