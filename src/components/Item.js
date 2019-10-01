import React from "react";
import { View, Text, Image } from "react-native";

export default class Item extends React.Component {
  render() {
    const { name, price, width, imgSrc, sold } = this.props;
    return (
      <View
        style={{
          width: width / 2 - 30,
          height: width / 2 - 10,
          borderWidth: 0.5,
          borderColor: "#dddddd",
          borderRadius: 10,
          marginTop: 15,
        }}
      >
        <View style={{ flex: 2 }}>
          <Image
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: "cover",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            source={imgSrc}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "space-evenly",
            paddingLeft: 10,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        >
          <Text style={{ fontSize: 12, color: "#b63838" }}>{name}</Text>
          <Text style={{ fontSize: 14 }}>${price}</Text>
          <Text style={{ color: "#C5CCD6" }}>{sold} sold</Text>
        </View>
      </View>
    );
  }
}
