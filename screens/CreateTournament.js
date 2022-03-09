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
import AndroidSafeArea from "../assets/SafeArea";
import BackButton from "../components/BackButton";
import XLSX from "xlsx";
import { FileSystem } from "react-native-file-access";

export default function CreateTournament({ navigation, route }) {
  let XLSX = require("xlsx");
  const b64 = FileSystem.readFile(
    "/storage/emulated/0/Download/Telegram/Skipper Details test data.xlsx",
    "base64"
  );
  /* b64 is a base64 string */
  const workbook = XLSX.read(b64, { type: "base64" });

  return (
    <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
      <BackButton />
      <TouchableWithoutFeedback
        onPressIn={() => Keyboard.dismiss()}
        style={styles.dismissKeyboard}
      >
        <View style={styles.container}>
          <Text style={styles.titleText}>CREATE TOURNAMENT</Text>
          <View style={styles.textInputWrapper}>
            <Text style={styles.textInputLabel}>TOURNAMENT ID</Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize={"characters"}
              placeholder="TOURNAMENT ID"
            ></TextInput>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
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
    paddingTop: 60,
    letterSpacing: 6,
  },
  textInputWrapper: {
    width: "85%",
    marginTop: 160,
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
