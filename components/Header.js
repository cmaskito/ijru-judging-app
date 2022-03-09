import { Roboto_500Medium } from "@expo-google-fonts/roboto";
import { View, Text, StyleSheet } from "react-native";
import colours from "../assets/colours";

export default function Header({
  eventName,
  bracket,
  judgingType,
  skipperName,
}) {
  return (
    <View style={styles.headerWrapper}>
      <Text style={styles.headerText}>
        {`${eventName} - ${bracket} - ${judgingType} - ${skipperName}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: colours.headerColour,
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 22,
    letterSpacing: 0.8,
  },
});
