import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import Home from "../screens/Home";
import ItemDetails from "../screens/ItemDetails";
import Cart from "../screens/Cart";
import Search from "../screens/Search";
import Category from "../screens/Category";
import SearchArchive from "../screens/SearchArchive";

import Icon from "react-native-vector-icons/Ionicons";

const HomePageStack = createStackNavigator({
  Home,
  Search,
  ItemDetails,
  Category,
  SearchArchive,
});
const CartPageStack = createStackNavigator({ Cart });

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomePageStack,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-home" color={tintColor} size={24} />
        ),
      },
    },
    Cart: {
      screen: CartPageStack,
      navigationOptions: {
        tabBarLabel: "Cart",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-cart" color={tintColor} size={24} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: "red",
      style: {
        backgroundColor: "white",
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: "#d3d3d3",
        shadowOpacity: 0.5,
        elevation: 6,
      },
    },
  }
);

export const AppContainer = createAppContainer(TabNavigator);
