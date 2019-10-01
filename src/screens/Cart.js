import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CartContext from "../context/cartContext";
import { sizes, colors } from "../../constants/Theme";
import { items } from "../../data";
import { RectButton, BorderlessButton } from "react-native-gesture-handler";

export default class Cart extends React.Component {
  static navigationOptions = {
    headerStyle: { backgroundColor: "#FF4500", height: 60 },
    title: "Cart",
    headerTintColor: "white",
  };

  goToItem = (_id, _quantity) => {
    let _items = [];
    _items = items.filter(item => item.id === _id);
    _items[0].quantity = _quantity;
    this.props.navigation.navigate("ItemDetails", {
      item: _items[0],
      msg: "Update",
    });
  };

  render() {
    const { navigation } = this.props;
    return (
      <CartContext.Consumer>
        {cart => {
          return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray }}>
              {(!cart.cartItems || cart.cartItems.length === 0) ? (
                <Text
                  style={{
                    fontSize: sizes.title,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  No items in the cart
                </Text>
              ) : null}

              <ScrollView>
                {cart.cartItems && cart.cartItems.map(item => {
                  return (
                    <View key={item.id} style={styles.cartItems}>
                      <Image style={styles.image} source={item.image} />
                      <View style={{ flex: 1 }}>
                        <Text style={styles.title}>
                          {item.name.slice(0, 10)}...
                        </Text>
                        <Text style={styles.text}>
                          Quantity - {item.quantity}
                        </Text>
                      </View>
                      <TouchableHighlight
                        style={{ ...styles.button }}
                        onPress={() => this.goToItem(item.id, item.quantity)}
                      >
                        <BorderlessButton>
                          <Icon
                            name="ios-eye"
                            size={30}
                            style={{
                              marginRight: 10,
                              textAlign: "right",
                            }}
                          />
                        </BorderlessButton>
                      </TouchableHighlight>
                      <TouchableHighlight
                        style={{ ...styles.button }}
                        onPress={() => cart.removeItemFromCart(item.id)}
                      >
                        <BorderlessButton>
                          <Icon
                            name="ios-trash"
                            size={30}
                            style={{
                              marginRight: 10,
                              textAlign: "right",
                            }}
                          />
                        </BorderlessButton>
                      </TouchableHighlight>
                    </View>
                  );
                })}
              </ScrollView>
              <View
                style={{
                  borderTopWidth: 1,
                  paddingTop: 10,
                  borderTopColor: "#BBBBBB",
                  paddingHorizontal: 20,
                  paddingBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Sub Total: $
                  {cart.cartItems && cart.cartItems.reduce((count, curItem) => {
                    return count + (curItem.quantity || 0);
                  }, 0)}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Convenience Fee: $20
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Total: $
                  {cart.cartItems && cart.cartItems.reduce((count, curItem) => {
                    return count + curItem.price * curItem.quantity;
                  }, 20)}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Total Quantity:{" "}
                  {cart.cartItems && cart.cartItems.reduce((count, curItem) => {
                    return count + (curItem.quantity || 0);
                  }, 0)}
                </Text>
              </View>
            </SafeAreaView>
          );
        }}
      </CartContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    paddingHorizontal: sizes.padding,
  },
  text: {
    paddingHorizontal: sizes.padding,
  },
  image: {
    width: 80,
    height: 80,
  },
  cartItems: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
