import React, { createContext } from "react";

const initialState = {
  cartItems: [],
  addItemToCart: item => {},
  removeItemFromCart: id => {},
  increaseQuantity: index => {},
  decreaseQuantity: index => {},
};

export default createContext(initialState);
