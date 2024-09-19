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
        localStorage.setItem("products", JSON.stringify(data));
        setLoading(false);
      } catch (err) {
        setError("Не удалось загрузить товары");
        setLoading(false);
      }
    };

    //localStorage save
    const savedProducts = JSON.parse(localStorage.getItem("products"));
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
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div>Товары не найдены</div>
        )}
      </div>
    </div>
  );
}

export default Shop;

/*
The selected code snippet is a functional component named `Shop` in a React application. 
This component is responsible for fetching and displaying a list of products from an API. 
It also includes a search functionality to filter the products based on the user's input.

Here's a breakdown of the code:

1. Import statements: The code imports necessary React hooks (`useState`, `useEffect`) and the `fetchProducts` function from the `../services/api` file. 
    It also imports the `ProductCard` component from the `../components/ProductCard` file.

2. Component state: The component uses the `useState` hook to manage its state. 
    It initializes the `products` state as an empty array, `searchTerm` state as an empty string, `loading` state as `true`, and `error` state as `null`.

3. `useEffect` hook: The `useEffect` hook is used to fetch the products from the API when the component mounts. 
    It defines an asynchronous function `fetchData` that calls the `fetchProducts` function and updates the `products` state with the fetched data. 
    It also saves the fetched products to the browser's local storage using `localStorage.setItem`. If there's an error fetching the products, 
    it updates the `error` state with an error message. If the component mounts and there are already saved products in local storage, 
    it sets the `products` state with the saved products and sets the `loading` state to `false`.

4. Filtering products: The component uses the `filteredProducts` variable to filter the products based on the `searchTerm`. 
   It uses the `filter` method to create a new array containing only the products whose names contain the `searchTerm` (case-insensitive).

5. Conditional rendering: The component uses conditional rendering to display different UI based on the `loading` and `error` states. 
   If `loading` is `true`, it displays a loading message. If `error` is not `null`, it displays the error message. Otherwise, it renders the main UI.

6. Main UI: The main UI consists of a heading, a search input, and a container for displaying the products. 
   The search input updates the `searchTerm` state as the user types. The products are rendered using the `ProductCard` component, 
   passing the product data as a prop. If there are no filtered products, it displays a message indicating that no products were found.

Overall, the selected code snippet is a functional component that fetches products from an API, filters them based on user input, 
and displays them using a custom `ProductCard` component. It also includes a search functionality and handles loading and error states.

*/
