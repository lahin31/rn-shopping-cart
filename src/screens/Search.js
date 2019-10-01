import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { items } from "../../data";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class Seach extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    items: [],
    searchedItem: "",
  };
  componentDidMount() {
    this.setState({ items });
  }

  componentWillMount() {
    this.startHeaderHeight = 30;
    if (Platform.OS === "android") {
      this.startHeaderHeight = 70 + StatusBar.currentHeight;
    }
  }

  searchQuery = val => {
    this.setState({ searchedItem: val });
  };

  _executeSearch = val => {
    this.props.navigation.navigate("SearchArchive", {
      searchedValue: val,
    });
  };

  render() {
    const { searchedItem, items } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
        <View style={{ flex: 1 }}>
          <Header
            backgroundColor={this.props.headerBackgroundColor}
            tintColor={this.props.headerTintColor}
            backButton={Platform.OS === "android"}
          >
            <SearchBar
              onChangeQuery={this.searchQuery}
              onSubmit={this._executeSearch}
              placeholderTextColor={this.props.searchInputPlaceholderTextColor}
              textColor={this.props.searchInputTextColor}
              selectionColor={this.props.searchInputSelectionColor}
              underlineColorAndroid={
                this.props.searchInputUnderlineColorAndroid ||
                this.props.headerBackgroundColor
              }
              tintColor={
                this.props.searchInputTintColor || this.props.headerTintColor
              }
            />
          </Header>
          <View style={{ flex: 1 }}>
            {searchedItem !== "" &&
              items.map(item => {
                if (
                  item.name.toLowerCase().includes(searchedItem.toLowerCase())
                ) {
                  return (
                    <View
                      key={item.id}
                      style={{
                        borderWidth: 1,
                        borderColor: "#d3d3d3",
                        padding: 15,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate("ItemDetails", {
                            item,
                          })
                        }
                      >
                        <Text style={{ paddingHorizontal: 15 }}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }
              })}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
