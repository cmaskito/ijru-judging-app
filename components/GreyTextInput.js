// A custom text input component that is reused in many screens
import { StyleSheet, View, Text, TextInput } from "react-native";
import colours from "../assets/colours";

export default function GreyTextInput({
  label,
  placeholder,
  wrapperStyle,
  onChangeText,
}) {
  return (
    <View style={[styles.textInputWrapper, { ...wrapperStyle }]}>
      <Text style={styles.textInputLabel}>{label}</Text>
      <TextInput
        style={styles.textInput}
        autoCapitalize={"characters"}
        placeholder={placeholder}
        placeholderTextColor={colours.placeholderText}
        onChangeText={onChangeText}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
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
    textAlign: "left",
  },
  textInputLabel: {
    paddingLeft: 5,
    letterSpacing: 1.5,
    fontFamily: "Roboto_400Regular",
    fontSize: 14,
    marginBottom: 3,
  },
});
