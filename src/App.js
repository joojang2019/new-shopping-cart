import React, { useEffect, useState } from "react";
import CardList from "./component/CardList";
import ShoppingCart from "./component/ShoppingCart";
import ShoppingCartProvider from "./context/ShoppingCartContext";

const App = () => {
  const [data, setData] = useState({});

  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("./data/products.json");
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <ShoppingCartProvider>
      <ul>
        <CardList products={products} />
        <ShoppingCart />
      </ul>
    </ShoppingCartProvider>
  );
};

export default App;
