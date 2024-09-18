import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import './Styles/Shop.css';
import productsData from '../services/data.js';

function Shop() {
  const [products, setProducts] = useState([]);  // Все товары
  const [searchTerm, setSearchTerm] = useState('');  // Поисковый запрос

  useEffect(() => {
    setProducts(productsData);
  }, []);

  // Фильтрация товаров на основе поискового запроса
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Все кроссовки</h1>

      {/* Поисковая строка */}
      <input
        type="text"
        placeholder="Поиск кроссовок..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}  // Обновление запроса при изменении ввода
        className="search-input"
      />

      <div className="shop-container">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Shop;
