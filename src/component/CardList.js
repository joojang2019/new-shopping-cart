import React from "react";
import "./Card.css";
import Card from "./Card";

const CardList = ({ products, inventory, setInventory, user }) => {
  return (
    <div className="card-list">
      {products.map(product => (
        <Card
          key={product.sku}
          product={product}
          inventory={inventory}
          setInventory={setInventory}
          user={user}
        />
      ))}
    </div>
  );
};

export default CardList;
