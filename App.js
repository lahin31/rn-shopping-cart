import React from "react";
import { AsyncStorage } from "react-native";
import { AppContainer } from "./src/navigations";
import CartContext from "./src/context/cartContext";

export default class App extends React.Component {
  state = {
    cartItems: [],
    isLoadingComplete: false,
  };
  componentDidMount() {
    let val = AsyncStorage.getItem("@bdStoreItems");
    val
      .then(res => this.setState({ cartItems: JSON.parse(res) }))
      .catch(err => console.error(err));
  }
  /**
   * addItemToCart - adding item to cart
   * based on some conditions we are adding item dynamically
   */
  addItemToCart = item => {
    this.setState(state => {
      let exist = false;
      if (state.cartItems === null) {
        state.cartItems = [];
      }
      const newState = state.cartItems.map(currItem => {
        if (currItem.id === item.id) {
          exist = true;
          return {
            ...currItem,
            quantity: item.quantity,
          };
        } else {
          return currItem;
        }
      });
      if (exist) {
        try {
          AsyncStorage.setItem("@bdStoreItems", JSON.stringify(newState));
          return {
            cartItems: newState,
          };
        } catch (e) {
          console.error(e);
        }
      } else {
        try {
          AsyncStorage.setItem(
            "@bdStoreItems",
            JSON.stringify([...state.cartItems, item])
          );
        } catch (e) {
          console.error(e);
        }
        return {
          cartItems: [...state.cartItems, item],
        };
      }
    });
    try {
      AsyncStorage.setItem(
        "@bdStoreItems",
        JSON.stringify(this.state.cartItems)
      );
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * removeItemFromCart - removing item from cart based on it's id
   */
  removeItemFromCart = id => {
    let _cart = [...this.state.cartItems];
    let _findIndex = _cart.findIndex(item => item.id === id);
    _cart.splice(_findIndex, 1);
    this.setState({ cartItems: _cart }, () => {
      AsyncStorage.setItem(
        "@bdStoreItems",
        JSON.stringify(this.state.cartItems)
      );
    });
  };

  render() {
    return (
      <CartContext.Provider
        value={{
          cartItems: this.state.cartItems,
          addItemToCart: this.addItemToCart,
          removeItemFromCart: this.removeItemFromCart,
        }}
      >
        <AppContainer />
      </CartContext.Provider>
    );
  }
}
