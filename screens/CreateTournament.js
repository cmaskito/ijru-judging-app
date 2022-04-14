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
import GreyTextInput from "../components/GreyTextInput";
import { useState } from "react";
import { doc } from "firebase/firestore";

export default function CreateTournament({ navigation, route }) {
  const [fileName, setFileName] = useState(undefined);

  const getSkipperDetailsCSV = async () => {
    const doc = await DocumentPicker.getDocumentAsync();
    console.log(doc, "doc");

    setFileName(doc.name);

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
          <GreyTextInput
            wrapperStyle={{ marginTop: 150 }}
            label={"TOURNAMENT NAME"}
            placeholder={"TOURNAMENT NAME"}
          />
          <View style={styles.buttonWrapper}>
            <View style={{ width: "100%", paddingHorizontal: "7.5%" }}>
              <Text style={styles.buttonLabel}>SKIPPER DETAILS</Text>
              <CustomButton
                style={{
                  backgroundColor: colours.lightGrey,
                  borderRadius: 15,
                  width: "100%",
                  height: 50,
                  alignItems: "flex-start",
                }}
                touchableOpacityStyle={{
                  height: 50,
                }}
                text={fileName === undefined ? "SELECT A .CSV FILE" : fileName}
                textStyle={{
                  fontSize: 14,
                  fontFamily: "Roboto_400Regular",
                  letterSpacing: 0.5,
                  color:
                    fileName === undefined
                      ? colours.placeholderText
                      : colours.textDark,
                  paddingLeft: 10,
                }}
                onPressHandler={getSkipperDetailsCSV}
              />
            </View>
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
  buttonLabel: {
    paddingLeft: 5,
    letterSpacing: 1.5,
    fontFamily: "Roboto_400Regular",
    fontSize: 14,
    marginBottom: 3,
  },
  buttonWrapper: {
    marginTop: 50,
    width: "100%",
  },
});
