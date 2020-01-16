import React, { useContext } from "react";
import "rbx/index.css";
import "./Card.css";
import SizeBox from "./SizeBox";
import { ShoppingCartContext } from "../context/ShoppingCartContext";

const Card = ({ product }) => {
  const { shoppingCart, setShoppingCart, open, setOpen } = useContext(
    ShoppingCartContext
  );
  const imgSrc = `data/products/${product.sku}_2.jpg`;
  return (
    <li className="card-container">
      <img src={imgSrc} alt="" />
      <p>{product.title}</p>
      <p>{`$${product.price}`}</p>
      <SizeBox
        state={{ product, shoppingCart, setShoppingCart, open, setOpen }}
      />
    </li>
  );
};

export default Card;
