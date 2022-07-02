// A custom button component that is reused in many screens and components
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colours from "../assets/colours";

export default function CustomButton({
  text,
  style,
  onPressHandler,
  textStyle,
  activeOpacity,
  touchableOpacityStyle,
}) {
  return (
    <TouchableOpacity
      onPressIn={onPressHandler}
      activeOpacity={activeOpacity}
      style={{ ...touchableOpacityStyle }}
    >
      <View style={[styles.buttonContainer, { ...style }]}>
        <Text style={[styles.buttonText, { ...textStyle }]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colours.button,
    alignItems: "center",
    width: 272,
    height: 74,
    borderRadius: 9,
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Roboto_500Medium",
    fontSize: 24,
    textAlign: "center",
    paddingVertical: 9,
    letterSpacing: 1.2,
  },
});
