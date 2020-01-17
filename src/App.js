import React, { useEffect, useState } from "react";
import CardList from "./component/CardList";
import ShoppingCart from "./component/ShoppingCart";
import ShoppingCartProvider from "./context/ShoppingCartContext";

const App = () => {
  const [data, setData] = useState({});
  const [inventory, setInventory] = useState({});

  const products = Object.values(data);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/data/products.json");
      const json = await response.json();
      setData(json);
    };

    const fetchInventory = async () => {
      const response = await fetch("/data/inventory.json");
      const json = await response.json();
      setInventory(json);
    };

    fetchProducts();
    fetchInventory();
  }, []);

  return (
    <ShoppingCartProvider>
      <ul>
        <CardList
          products={products}
          inventory={inventory}
          setInventory={setInventory}
        />
        <ShoppingCart />
      </ul>
    </ShoppingCartProvider>
  );
};

export default App;
