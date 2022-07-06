// This screen will allow users to upload a .csv file with all of the skippers details. The .csv file must be formatted correctly
// They also give the tournament a name
// When they create the tournament, a new tournament collection will be made on the database
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
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
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import generateTournamentId from "../assets/tournamentIdGenerator";

export default function CreateTournament({ navigation }) {
  const [fileName, setFileName] = useState(undefined); // Name to display on file input (shows chosen file)
  const [tournamentName, setTournamentName] = useState("");
  const [parsedSkipperDetails, setParsedSkipperDetails] = useState([]);

  const [attemptedSubmitError, setAttemptedSubmitError] = useState(false);

  // Triggers when the user presses on the file input
  const getSkipperDetailsCSV = async () => {
    const doc = await DocumentPicker.getDocumentAsync(); // allow the user to select a file.

    // Checks if the selected file is a .csv file
    if (doc.type !== "cancel") {
      if (doc.mimeType !== "text/comma-separated-values") {
        setFileName(undefined);
        Alert.alert(
          "That file is not a .csv file",
          "You must select a .csv file"
        );
        return;
      }
      setFileName(doc.name);

      const docContents = await FileSystem.readAsStringAsync(doc.uri); // Gets the contents of the selected .csv file
      const fixedContents = docContents.replace(/[^a-zA-Z0-9 /, \n]/g, ""); // Removes the spaces / special / hidden characters from the contents

      // Parses contents of the .csv files
      Papa.parse(fixedContents, {
        header: true,
        dynamicTyping: true,
        error: function (error) {
          console.log("error:", error);
        },
        complete: function (results) {
          setParsedSkipperDetails(results.data); // saves the contents to this state variable
        },
      });
    }
  };

  // Creates the tournament when the user presses the Create Tournament button
  const onSubmit = async () => {
    if (tournamentName !== "" && fileName !== undefined) {
      //ensures that there is a tournament name and a file selected
      const tournamentId = await generateTournamentId(); //generate a unique 6 digit tournament id
      try {
        // Creates a document with id: tournamentId
        await setDoc(doc(db, "tournaments", `${tournamentId}`), {
          tournamentId: tournamentId,
          tournamentName: tournamentName,
        });
        // Creates a document for each skipper in the skippers subcollection
        parsedSkipperDetails.forEach((skipper) => {
          addDoc(collection(db, `tournaments/${tournamentId}/skippers`), {
            ...skipper,
          });
        });
        // moves to the tournament created screen
        navigation.navigate("TournamentCreated", {
          tournamentName,
          tournamentId,
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      setAttemptedSubmitError(true); // if there is no tournament name or file selected, then an error message will show up.
    }
  };

  return (
    <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
      <BackButton />
      <TouchableWithoutFeedback
        onPressIn={() => Keyboard.dismiss()}
        style={styles.dismissKeyboard}
      >
        {/* Title */}
        <View style={styles.container}>
          <Text style={styles.titleText}>CREATE TOURNAMENT</Text>
          {/* Grey Text Input */}
          <GreyTextInput
            wrapperStyle={{ marginTop: 100 }}
            label={"TOURNAMENT NAME"}
            placeholder={"TOURNAMENT NAME"}
            onChangeText={(value) => setTournamentName(value)}
          />
          {/* Grey File Input */}
          <View style={styles.buttonWrapper}>
            <View style={{ width: "100%", paddingHorizontal: "7.5%" }}>
              <Text style={styles.buttonLabel}>SKIPPER DETAILS</Text>
              <CustomButton
                style={styles.greyFileInput}
                touchableOpacityStyle={{
                  height: 50,
                }}
                text={fileName === undefined ? "SELECT A .CSV FILE" : fileName}
                textStyle={{
                  ...styles.greyFileInputText,
                  color:
                    fileName === undefined
                      ? colours.placeholderText
                      : colours.textDark,
                }}
                onPressHandler={getSkipperDetailsCSV}
              />
            </View>
          </View>
          {/* Error Message */}
          {attemptedSubmitError && (
            <Text style={styles.errorLabel}>
              INVALID TOURNAMENT NAME OR FILE
            </Text>
          )}
          {/* Create Tournament Button */}
          <CustomButton
            text="CREATE TOURNAMENT"
            style={{ marginTop: 60 }}
            onPressHandler={onSubmit}
          />
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
    paddingTop: 20,
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
  errorLabel: {
    paddingLeft: 5,
    letterSpacing: 1.5,
    fontFamily: "Roboto_400Regular",
    fontSize: 14,
    color: "red",
  },
  greyFileInput: {
    backgroundColor: colours.lightGrey,
    borderRadius: 15,
    width: "100%",
    height: 50,
    alignItems: "flex-start",
  },
  greyFileInputText: {
    fontSize: 14,
    fontFamily: "Roboto_400Regular",
    letterSpacing: 0.5,
    paddingLeft: 10,
  },
});
