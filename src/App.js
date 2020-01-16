import React, { useEffect, useState } from "react";
import CardList from "./component/CardList";

const App = () => {
  const [data, setData] = useState({});
  const [shoppingCart, setShoppingCart] = useState([]);

  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("./data/products.json");
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  console.log(shoppingCart);
  return (
    <ul>
      <CardList state={{ products, shoppingCart, setShoppingCart }} />
    </ul>
  );
};

export default App;
