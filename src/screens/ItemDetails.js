import React from "react";
import {
  View,
  Text,
  Alert,
  Modal,
  Animated,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import StarRating from "react-native-star-rating";
import CartContext from "../context/cartContext";
import { sizes, colors } from "../../constants/Theme";

const { width, height } = Dimensions.get("window");

export default class ItemDetails extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: { backgroundColor: "#FF4500", height: 60 },
      title: navigation.state.params.item.name,
      headerTintColor: "white",
    };
  };
  state = {
    currentItem: {
      id: this.props.navigation.state.params.item.id,
      name: this.props.navigation.state.params.item.name,
      image: this.props.navigation.state.params.item.imgPath,
      gallery: this.props.navigation.state.params.item.gallery,
      price: this.props.navigation.state.params.item.price,
      rating: this.props.navigation.state.params.item.rating,
      desc: this.props.navigation.state.params.item.desc,
      sold: this.props.navigation.state.params.item.sold,
      quantity: 1,
    },
  };
  increaseQuantity = () => {
    this.setState({
      currentItem: {
        ...this.state.currentItem,
        quantity: this.state.currentItem.quantity + 1,
      },
    });
  };
  decreaseQuantity = () => {
    this.setState({
      currentItem: {
        ...this.state.currentItem,
        quantity: this.state.currentItem.quantity - 1,
      },
    });
  };
  render() {
    const {
      id,
      image,
      gallery,
      price,
      rating,
      desc,
      sold,
      quantity,
    } = this.state.currentItem;
    return (
      <CartContext.Consumer>
        {cart => {
          return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray }}>
              <ScrollView>
                <FlatList
                  horizontal
                  pagingEnabled
                  scrollEnabled
                  showsHorizontalScrollIndicator={false}
                  scrollEventThrottle={8}
                  snapToAlignment="center"
                  data={gallery}
                  extraDate={this.state}
                  keyExtractor={(item, index) => `${item.id}`}
                  renderItem={({ item }) => (
                    <Image
                      source={item.imgPath}
                      resizeMode="contain"
                      style={{ width, height: height / 2, overflow: "visible" }}
                    />
                  )}
                  onScroll={Animated.event([
                    {
                      nativeEvent: { contentOffset: { x: this.scrollX } },
                    },
                  ])}
                />
                <View style={{ flex: 1 }}>
                  <View style={{ height: 170, backgroundColor: colors.white }}>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                      <Text
                        style={{
                          flex: 1,
                          fontSize: sizes.h3,
                          fontWeight: "700",
                          paddingHorizontal: sizes.padding,
                          marginTop: sizes.margin,
                        }}
                      >
                        US ${price}
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <View
                          style={{
                            top: 22,
                            left: 22,
                            paddingRight: sizes.padding - 15,
                          }}
                        >
                          <StarRating
                            disable={true}
                            maxStars={1}
                            rating={rating}
                            starSize={13}
                            fullStarColor="#C5CCD6"
                          ></StarRating>
                        </View>
                        <View>
                          <Text
                            style={{
                              textAlign: "right",
                              fontSize: sizes.paragraph,
                              paddingHorizontal: sizes.padding,
                              marginTop: sizes.margin,
                              color: "#C5CCD6",
                            }}
                          >
                            {rating}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={{ marginTop: sizes.margin - 5 }}>
                      <Text style={{ paddingHorizontal: sizes.padding }}>
                        {desc}
                      </Text>
                    </View>
                    <View style={{ marginTop: sizes.margin - 8 }}>
                      <Text style={{ paddingHorizontal: sizes.padding }}>
                        {sold} orders
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      height: 250,
                      backgroundColor: colors.white,
                      marginTop: sizes.margin,
                    }}
                  >
                    <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
                      <Text
                        style={{
                          fontSize: sizes.h3,
                          fontWeight: "700",
                          paddingHorizontal: sizes.padding,
                          marginTop: sizes.margin,
                        }}
                      >
                        Customer Reviews
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          justifyContent: "flex-start",
                        }}
                      >
                        <View>
                          <Text
                            style={{
                              fontSize: sizes.paragraph,
                              paddingHorizontal: sizes.padding,
                              marginTop: sizes.margin - 5,
                            }}
                          >
                            {rating}
                          </Text>
                        </View>
                        <View
                          style={{
                            fontSize: sizes.paragraph,
                            marginTop: sizes.margin - 3,
                            marginLeft: 0,
                          }}
                        >
                          <StarRating
                            disable={true}
                            maxStars={5}
                            rating={rating}
                            starSize={13}
                          ></StarRating>
                        </View>
                      </View>
                      <View style={{ marginTop: sizes.margin - 4 }}>
                        <Text
                          style={{
                            fontSize: sizes.text,
                            paddingHorizontal: sizes.padding,
                            color: "#C5CCD6",
                          }}
                        >
                          John Doe ({rating})
                        </Text>
                        <Text
                          style={{
                            fontSize: sizes.text,
                            paddingHorizontal: sizes.padding,
                            marginTop: sizes.margin - 5,
                          }}
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Donec dapibus diam sed bibendum accumsan.
                          Vivamus ligula lorem, commodo nec pretium vel.
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: colors.white,
                      marginTop: sizes.margin,
                    }}
                  >
                    <View>
                      <View style={styles.generalCart}>
                        <View style={styles.quantityText}>
                          <Text
                            style={{
                              fontSize: 16,
                              alignItems: "center",
                              justifyContent: "center",
                              flex: 1,
                              top: 5,
                            }}
                          >
                            Quantity
                          </Text>
                        </View>
                        <View style={styles.quantity}>
                          <TouchableOpacity
                            style={styles.decreaseButton}
                            onPress={this.decreaseQuantity}
                            disabled={
                              this.state.currentItem.quantity > 0 ? false : true
                            }
                          >
                            <Text
                              style={{
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                                top: 5,
                              }}
                            >
                              {" "}
                              -{" "}
                            </Text>
                          </TouchableOpacity>
                          <Text
                            style={{
                              fontSize: 14,
                              justifyContent: "center",
                              alignItems: "center",
                              textAlign: "center",
                              top: 5,
                              paddingHorizontal: 10,
                            }}
                          >
                            {quantity}
                          </Text>
                          <TouchableOpacity
                            style={styles.increaseButton}
                            onPress={this.increaseQuantity}
                          >
                            <Text
                              style={{
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                                top: 5,
                              }}
                            >
                              {" "}
                              +{" "}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    <View style={{ backgroundColor: colors.add_to_cart_bg }}>
                      <TouchableOpacity
                        onPress={() => {
                          cart.addItemToCart(this.state.currentItem);
                        }}
                        disabled={
                          this.state.currentItem.quantity >= 1 ? false : true
                        }
                      >
                        {this.props.navigation.state.params.msg === "Update" ? (
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: sizes.h3,
                              color: colors.white,
                              paddingTop: sizes.padding - 10,
                              paddingBottom: sizes.padding - 10,
                            }}
                          >
                            Update to Cart
                          </Text>
                        ) : (
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: sizes.h3,
                              color: colors.white,
                              paddingTop: sizes.padding - 10,
                              paddingBottom: sizes.padding - 10,
                            }}
                          >
                            Add to Cart
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
          );
        }}
      </CartContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  dateTime: {
    paddingTop: 20,
  },
  generalCart: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 15,
  },
  quantity: {
    flexDirection: "row",
    justifyContent: "center",
  },
  quantityText: {
    flex: 1,
    flexDirection: "row",
  },
  input: {
    height: 40,
    width: 50,
    borderWidth: 1,
    borderColor: "rgba(27,31,35,0.05)",
    padding: 10,
    backgroundColor: "rgba(27,31,35,0.05)",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#05a5d1",
    padding: 10,
    width: 150,
    height: 40,
  },
  buttonDisable: {
    backgroundColor: "#cccccc",
    color: "#666666",
    alignItems: "center",
    padding: 10,
    width: 150,
    height: 40,
    marginLeft: 20,
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 17,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
  },
  decreaseButton: {
    height: 30,
    width: 30,
    backgroundColor: "rgba(27,31,35,0.05)",
  },
  increaseButton: {
    height: 30,
    width: 30,
    backgroundColor: "rgba(27,31,35,0.05)",
  },
});
