import { Roboto_500Medium } from "@expo-google-fonts/roboto";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Vibration,
} from "react-native";
import colours from "../assets/colours";

export default function CustomButton({
  text,
  style,
  onPressHandler,
  textStyle,
}) {
  return (
    <TouchableOpacity onPressIn={onPressHandler}>
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
