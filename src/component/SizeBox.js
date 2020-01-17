import React from "react";

const SizeBox = ({ state }) => {
  const {
    product,
    shoppingCart,
    setShoppingCart,
    setOpen,
    inventory,
    setInventory
  } = state;
  const sku = product.sku;

  const addShoppingCart = size => {
    // Add Id to the Cart item
    const id = Math.random() * Math.random() * 100000;
    setShoppingCart([...shoppingCart, { ...product, size, id }]);

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
