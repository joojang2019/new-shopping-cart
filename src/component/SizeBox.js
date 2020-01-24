import React from "react";
import { dbLink } from "../App";

const SizeBox = ({ state }) => {
  const {
    product,
    shoppingCart,
    setShoppingCart,
    setOpen,
    inventory,
    setInventory,
    user
  } = state;
  const sku = product.sku;

  const addShoppingCart = size => {
    // Add Id to the Cart item
    const id = Math.random() * Math.random() * 100000;
    const newShoppingCart = [...shoppingCart, { ...product, size, id }];

    //have to access before setting
    if (user) {
      dbLink.ref("carts/" + user.uid).set(newShoppingCart);
    }
    setShoppingCart(newShoppingCart);

    // Update Inventory
    const copiedInventory = Object.assign({}, inventory);
    copiedInventory[product.sku][size]--;
    setInventory(copiedInventory);

    setOpen(true);
  };

  if (Object.keys(inventory).length === 0) {
    return null;
  }

  return (
    <div>
      {Object.values(inventory[sku]).every(val => val === 0) ? (
        <p>Out of Stock</p>
      ) : null}

      {inventory[sku]["S"] !== 0 ? (
        <button onClick={() => addShoppingCart("S")}>S</button>
      ) : null}
      {inventory[sku]["M"] !== 0 ? (
        <button onClick={() => addShoppingCart("M")}>M</button>
      ) : null}
      {inventory[sku]["L"] !== 0 ? (
        <button onClick={() => addShoppingCart("L")}>L</button>
      ) : null}
      {inventory[sku]["XL"] !== 0 ? (
        <button onClick={() => addShoppingCart("XL")}>XL</button>
      ) : null}
    </div>
  );
};

export default SizeBox;
