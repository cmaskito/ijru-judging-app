import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import colours from "../assets/colours";

export default function GreyTextInput({ label, placeholder, wrapperStyle }) {
  return (
    <View style={[styles.textInputWrapper, { ...wrapperStyle }]}>
      <Text style={styles.textInputLabel}>TOURNAMENT ID</Text>
      <TextInput
        style={styles.textInput}
        autoCapitalize={"characters"}
        placeholder="TOURNAMENT ID"
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  titleText: {
    fontSize: 36,
    color: colours.textDark,
    fontFamily: "Roboto_700Bold",
    textAlign: "center",
    width: 316,
    alignSelf: "center",
    paddingTop: 80,
    letterSpacing: 6,
  },
  textInputWrapper: {
    width: "85%",
  },
  textInput: {
    backgroundColor: colours.lightGrey,
    borderWidth: 0,
    borderRadius: 15,
    height: 50,
    color: colours.textDark,
    paddingLeft: 10,
    fontSize: 14,
    fontFamily: "Roboto_400Regular",
    letterSpacing: 0.5,
  },
  textInputLabel: {
    paddingLeft: 5,
    letterSpacing: 1.5,
    fontFamily: "Roboto_400Regular",
    fontSize: 14,
    marginBottom: 3,
  },
  dismissKeyboard: {
    color: "red",
  },
});
