import { StyleSheet, Platform, StatusBar } from "react-native";

const AndroidSafeArea = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default AndroidSafeArea;
