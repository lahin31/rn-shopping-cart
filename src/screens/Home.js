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
import { colors, sizes, fonts } from "../../constants/Theme";
import { RectButton, BorderlessButton } from "react-native-gesture-handler";

import Icon from "react-native-vector-icons/Ionicons";
import Category from "../components/Category";
import Item from "../components/Item";

const { width, height } = Dimensions.get("window");

export default class Home extends React.Component {
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
            size={sizes.search_icon}
            style={{ marginRight: 10, color: colors.white, textAlign: "right" }}
          />
        </BorderlessButton>
      ),
    };
  };

  state = {
    items: [],
  };

  componentDidMount() {
    this.setState({ items });
  }

  componentWillMount() {
    this.startHeaderHeight = 80;
    if (Platform.OS === "android") {
      this.startHeaderHeight = 70 + StatusBar.currentHeight;
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray }}>
        <View style={{ flex: 1 }}>
          <ScrollView scrollEventThrottle={16}>
            <View
              style={{
                flex: 1,
                backgroundColor: colors.gray,
                paddingTop: sizes.padding,
              }}
            >
              <Text
                style={{
                  fontSize: sizes.title,
                  fontWeight: "700",
                  paddingHorizontal: sizes.padding,
                }}
              >
                Featured Categories
              </Text>
            </View>
            <View style={{ height: 130, marginTop: sizes.margin }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Category", { type: "male" })
                  }
                >
                  <Category
                    imgSrc={require("../../assets/images/mens_fashion.jpg")}
                    name="Men's Fashion"
                    textBgColor="blue"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Category", { type: "female" })
                  }
                >
                  <Category
                    imgSrc={require("../../assets/images/womens_fashion.jpg")}
                    name="Women's Fashion"
                    textBgColor="pink"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Category", { type: "kid" })
                  }
                >
                  <Category
                    imgSrc={require("../../assets/images/kids_fashion.jpg")}
                    name="Kid's Fashion"
                    textBgColor="green"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Category", { type: "home" })
                  }
                >
                  <Category
                    imgSrc={require("../../assets/images/home_display.jpg")}
                    name="Home"
                    textBgColor="purple"
                  />
                </TouchableOpacity>
              </ScrollView>
            </View>
            <View style={{ flex: 1, paddingTop: sizes.padding }}>
              <Text
                style={{
                  fontSize: sizes.title,
                  fontWeight: "700",
                  paddingHorizontal: sizes.padding,
                }}
              >
                More to Love
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: sizes.padding,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {this.state.items.map(item => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => navigation.navigate("ItemDetails", { item })}
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
