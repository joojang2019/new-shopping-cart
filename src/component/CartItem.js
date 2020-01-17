import React from "react";
import IconButton from "@material-ui/core/IconButton";

const CartItem = ({ product }) => {
  <li className="card-container">
    <IconButton className={classes.toolbarButtons} onClick={handleDelete}>
      X
    </IconButton>
    <img src={`data/products/${product.sku}_2.jpg`} alt="" />
    <p>{product.title}</p>
    <p>{`$${product.price}`}</p>
    <p>Size: {product.size}</p>
  </li>;
};

export default CartItem;
