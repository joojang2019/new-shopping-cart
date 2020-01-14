import React, { useEffect, useState } from 'react';
import CardList from './component/CardList';

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <ul>
      
      <CardList products={products} />)}
    </ul>

  );
};

export default App;
