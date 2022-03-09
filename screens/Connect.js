import { StyleSheet, View, Text, SafeAreaView, TextInput } from "react-native";
import colours from "../assets/colours";
import AndroidSafeArea from "../assets/SafeArea";

export default function Connect({ navigation, route }) {
  return (
    <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
      <Text style={styles.titleText}>CONNECT TO COMPETITION</Text>
      <View style={styles.textInputWrapper}>
        <Text style={StyleSheet.textInputLabel}>TOURNAMENT ID</Text>
        <TextInput>HELLO</TextInput>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 36,
    color: colours.textDark,
    fontFamily: "Roboto_700Bold",
    textAlign: "center",
    width: 316,
    alignSelf: "center",
    paddingTop: 80,
    marginBottom: 130,
    letterSpacing: 6,
  },
});
