import React, { useState, createContext } from "react";

export const ShoppingCartContext = createContext([]);

const ShoppingCartProvider = props => {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [open, setOpen] = useState(false);

  return (
    <ShoppingCartContext.Provider
      value={{ shoppingCart, setShoppingCart, open, setOpen }}
    >
      {props.children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
