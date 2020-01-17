import React from "react";
import "./Card.css";
import Card from "./Card";

const CardList = ({ products, inventory, setInventory }) => {
  return (
    <div className="card-list">
      {products.map(product => (
        <Card
          product={product}
          inventory={inventory}
          setInventory={setInventory}
        />
      ))}
    </div>
  );
};

export default CardList;
