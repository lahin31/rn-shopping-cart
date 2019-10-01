import React from "react";
import { View, Text, Image } from "react-native";

export default class Category extends React.Component {
  render() {
    return (
      <View
        style={{
          height: 130,
          width: 130,
          marginLeft: 20,
          borderColor: "#dddddd",
        }}
      >
        <View style={{ flex: 2 }}>
          <Image
            source={this.props.imgSrc}
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: "cover",
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            paddingTop: 10,
            backgroundColor: this.props.textBgColor,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>
            {this.props.name}
          </Text>
        </View>
      </View>
    );
  }
}
