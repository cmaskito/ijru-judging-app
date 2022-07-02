// Exports a style that ensures screen elements are placed sufficiently below the top of the screen, espeically for android users
import { StyleSheet, Platform, StatusBar } from "react-native";

const AndroidSafeArea = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default AndroidSafeArea;
