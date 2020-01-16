import React from "react";
import "./Card.css";
import Card from "./Card";

const CardList = ({ state }) => {
  return (
    <div className="card-list">
      {state.products.map(product => (
        <Card
          product={product}
          shoppingCart={state.shoppingCart}
          setShoppingCart={state.setShoppingCart}
        />
      ))}
    </div>
  );
};

export default CardList;
