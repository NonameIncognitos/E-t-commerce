// Shop.js

import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services/api";
import "./Styles/Shop.css";

function Shop() {
  const [products, setProducts] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        localStorage.setItem('products', JSON.stringify(data)); 
        setLoading(false);
      } catch (err) {
        setError("Не удалось загрузить товары");
        setLoading(false);
      }
    };

    //localStorage save
    const savedProducts = JSON.parse(localStorage.getItem('products'));
    if (savedProducts) {
      setProducts(savedProducts);
      setLoading(false);
    } else {
      fetchData();
    }
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <div className="h1-search-container">
        <h1>Все кроссовки</h1>
        <input
          type="text"
          placeholder="Поиск кроссовок..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="shop-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))
        ) : (
          <div>Товары не найдены</div>
        )}
      </div>
    </div>
  );
}

export default Shop;
