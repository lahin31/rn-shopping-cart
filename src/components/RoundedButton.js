import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import PropTypes from "prop-types";
import Colors from "../../assets/Colors";

export default class RoundedButton extends Component {
  render() {
    const { text, backgroundColor, color, marginTop } = this.props;
    return (
      <TouchableHighlight
        style={[{ backgroundColor, marginTop }, styles.wrapper]}
      >
        <Text style={[{ color }, styles.buttonText]}>{text}</Text>
      </TouchableHighlight>
    );
  }
}

RoundedButton.propTypes = {
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 17,
    paddingRight: 20,
    paddingLeft: 20,
    textAlign: "center",
  },
});
