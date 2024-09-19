// api.js

export const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/products");
      if (!response.ok) {
        throw new Error("Ошибка при загрузке данных");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Ошибка при загрузке товаров:", error);
      throw error;
    }
  };
  