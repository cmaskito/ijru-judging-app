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
import * as DocumentPicker from "expo-document-picker";
import CustomButton from "../components/CustomButton";
import Papa from "papaparse";
import * as FileSystem from "expo-file-system";

export default function CreateTournament({ navigation, route }) {
  const onPress = async () => {
    const doc = await DocumentPicker.getDocumentAsync();
    console.log(doc, "doc");

    const docContents = await FileSystem.readAsStringAsync(doc.uri);

    Papa.parse(docContents, {
      header: true,
      dynamicTyping: true,
      error: function (error) {
        console.log("error:", error);
      },
      complete: function (results) {
        console.log("parsing complete:", results);
        const parsedSkipperDetails = results.data;
        console.log(parsedSkipperDetails);
      },
    });
  };

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
            <CustomButton onPressHandler={onPress} />
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
