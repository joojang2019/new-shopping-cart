import React from "react";

const SizeBox = ({ state }) => {
  const { product, shoppingCart, setShoppingCart, setOpen } = state;

  const addShoppingCart = size => {
    const id = Math.random() * Math.random() * 100000;
    setShoppingCart([...shoppingCart, { ...product, size, id }]);
    setOpen(true);
  };

  return (
    <div>
      <button onClick={() => addShoppingCart("S")}>S</button>
      <button onClick={() => addShoppingCart("M")}>M</button>
      <button onClick={() => addShoppingCart("L")}>L</button>
      <button onClick={() => addShoppingCart("XL")}>XL</button>
    </div>
  );
};

export default SizeBox;
