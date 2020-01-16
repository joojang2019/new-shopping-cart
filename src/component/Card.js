import React from "react";
import "rbx/index.css";
import { Button } from "rbx";
import "./Card.css";
import SizeBox from "./SizeBox";

const Card = ({ product, setShoppingCart, shoppingCart }) => {
  const imgSrc = `data/products/${product.sku}_2.jpg`;
  return (
    <li className="card-container">
      <img src={imgSrc} alt="" />
      <p>{product.title}</p>
      <p>{`$${product.price}`}</p>
      <SizeBox state={{ product, shoppingCart, setShoppingCart }} />
    </li>
  );
};

export default Card;
