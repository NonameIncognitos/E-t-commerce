import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../contexts/CartContext';
import './Styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { cartItems, addToCart, removeFromCart, productAddState } = useContext(CartContext);
  const [isAdded, setIsAdded] = useState(productAddState[product.id] || false);

  // Следим за состоянием корзины и обновляем isAdded при изменении cartItems
  useEffect(() => {
    const productInCart = cartItems.some(item => item.id === product.id);
    setIsAdded(productInCart);
  }, [cartItems, product.id]); // Обновляется каждый раз, когда меняются cartItems или product.id

  const toggleAddToCart = () => {
    if (isAdded) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <h5>{product.name}</h5>
        <div className="product-details">
          <div className="price-info">
            <p>Цена:</p>
            <p className="price">{product.price} руб.</p>
          </div>
          <button
            className={`add-to-cart-button ${isAdded ? 'added' : ''}`}
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
