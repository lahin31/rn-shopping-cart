import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { items } from "../../data";
import { RectButton, BorderlessButton } from "react-native-gesture-handler";

import Icon from "react-native-vector-icons/Ionicons";
import Item from "../components/Item";

const { width } = Dimensions.get("window");

export default class Category extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: { backgroundColor: "#FF4500", height: 60 },
      title: "BDStore",
      headerTintColor: "white",
      headerRight: (
        <BorderlessButton
          onPress={() => navigation.navigate("Search")}
          style={{ flex: 1 }}
        >
          <Icon
            name="ios-search"
            size={20}
            style={{ marginRight: 10, color: "#fff", textAlign: "right" }}
          />
        </BorderlessButton>
      ),
    };
  };

  state = {
    _items: [],
  };

  componentDidMount() {
    let data = items.filter(
      item => item.category === this.props.navigation.state.params.type
    );
    this.setState({ _items: data });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
        <View style={{ flex: 1 }}>
          <ScrollView>
            <View
              style={{
                paddingHorizontal: 20,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {this.state._items.map(item => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() =>
                      this.props.navigation.navigate("ItemDetails", { item })
                    }
                  >
                    <Item
                      imgSrc={item.imgPath}
                      width={width}
                      name={item.name}
                      price={item.price}
                      sold={item.sold}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
