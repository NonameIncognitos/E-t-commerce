// pages/Cart.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/cartSlice';
import './Styles/Cart.css';
import deleteIcon from '../components/assets/delete.svg';
import box_image from '../components/assets/basket_image.svg';
import arrowRightIcon from '../components/assets/arrow_right.svg'; // Добавьте иконку стрелки вправо

const Cart = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Расчет итоговой суммы
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Рассчитываем налог 5%
  const tax = totalAmount * 0.05;

  return (
    <>
      {/* Затемнение экрана */}
      <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`cart ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Корзина</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <img src={box_image} alt="Empty Cart" />
              <p className='basket_empty'>Корзина пуста</p>
              <p className='des_basket'>
                Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ
              </p>
              <button className="go-back-btn" onClick={onClose}>Вернуться назад</button>
            </div>
          ) : (
            <ul>
              {cartItems.map((item, index) => (
                <li key={index} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-info">
                    <h5>{item.name}</h5>
                    <p>{item.price} руб.</p>
                  </div>
                  <button className="remove-btn" onClick={() => dispatch(removeFromCart(item.id))}>
                    <img src={deleteIcon} alt="Remove" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div>
                <p>Итого</p>
                <p className="summary-amount">{totalAmount.toFixed(2)} руб.</p>
              </div>
              <div>
                <p>Налог (5%)</p>
                <p className="summary-amount">{tax.toFixed(2)} руб.</p>
              </div>
              <div>
                <p>Итого с налогом</p>
                <p className="summary-amount">{(totalAmount + tax).toFixed(2)} руб.</p>
              </div>
            </div>
            <button className="checkout-btn">
              Оформить заказ
              <img src={arrowRightIcon} alt="Arrow Right" className="arrow-right" /> {/* Добавляем иконку стрелки */}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
