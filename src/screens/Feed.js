import React from "react";
import { View, Text } from "react-native";

export default class Feed extends React.Component {
  static navigationOptions = {
    headerStyle: { backgroundColor: "#FF4500", height: 60 },
    title: "Feed",
    headerTintColor: "white",
  };

  render() {
    return (
      <View>
        <Text>This is Feed</Text>
      </View>
    );
  }
}
