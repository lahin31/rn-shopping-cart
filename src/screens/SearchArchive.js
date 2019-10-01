import React from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { items } from "../../data";
import { ScrollView } from "react-native-gesture-handler";
import Item from "../components/Item";

const { width } = Dimensions.get("window");

export default class SearchArchive extends React.Component {
  static navigationOptions = {
    headerStyle: { backgroundColor: "#FF4500", height: 60 },
    title: "Search Archive",
    headerTintColor: "white",
  };

  state = {
    items: [],
    searchedText: "",
  };

  componentDidMount() {
    this.setState({ items }, () => {
      this.setState(
        { searchedText: this.props.navigation.state.params.searchedValue },
        () => {
          let _items = [];
          items.map(item => {
            if (
              item.name
                .toLowerCase()
                .includes(this.state.searchedText.toLowerCase())
            ) {
              _items.push(item);
            }
            this.setState({ items: _items });
          });
        }
      );
    });
  }

  render() {
    const { items, searchedText } = this.state;
    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={{ backgroundColor: "#fff", marginTop: 15 }}>
            <Text style={{ marginHorizontal: 20 }}>
              {items.length} results found
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {searchedText !== "" &&
              items.map(item => {
                return (
                  <View key={item.id}>
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
                  </View>
                );
              })}
          </View>
        </View>
      </ScrollView>
    );
  }
}
