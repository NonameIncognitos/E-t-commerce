import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/cartSlice';
import './Styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  
  const isProductInCart = useSelector((state) =>
    state.cart.cartItems.some((item) => item.id === product.id)
  );
  const [isAdded, setIsAdded] = useState(isProductInCart);

  useEffect(() => {
    setIsAdded(isProductInCart);
  }, [isProductInCart]);

  const toggleAddToCart = () => {
    if (isAdded) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart({ ...product, quantity: 1 }));
    }
  };

  return (
    <div className="product-card">
      <img
        src={product.image || '/path/to/default/image.jpg'}
        alt={product.name}
        className="product-image"
      />
      <div className="product-info">
        <h5>{product.name}</h5> {/* Заголовок товара */}
        <div className="product-details">
          <div className="price-info">
            <p>Цена:</p>
            <p className="price">{product.price} руб.</p>
          </div>
          <button
            className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
            onClick={toggleAddToCart}
          >
            {isAdded ? '✔' : '+'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
