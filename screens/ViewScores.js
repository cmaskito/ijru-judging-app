// This screen allows users to export the final scores on the database as a .csv file
// to be saved on the local storage of the device.
import { StyleSheet, View, Text, Alert } from "react-native";
import colours from "../assets/colours";
import AndroidSafeArea from "../assets/SafeArea";
import CustomButton from "../components/CustomButton";
import BackButton from "../components/BackButton";
import { db } from "../firebase-config";
import {
  getDocs,
  query,
  where,
  collection,
  getDoc,
  doc,
} from "firebase/firestore";
import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";
import Papa from "papaparse";

export default function ViewScores({ route }) {
  const { tournamentId, tournamentName } = route.params;

  const onExportPress = async () => {
    const scoreDataCsv = await parseScoreData(); // returns a string in a .csv format containing all the final score data
    await saveScoresToStorage(scoreDataCsv); // Saves the score data to a .csv file on the users local storate

    // Alerts the user that the file has been successfully saved onto local storage
    Alert.alert(
      "File Saved",
      "The tournament scores have been saved to the selected folder"
    );
  };

  // returns a string in a .csv format containing all the final score data
  const parseScoreData = async () => {
    let unparsedScoreData = [];

    // Queries for all documents in the scores collection with the 'finalScores' attribute
    const q = query(
      collection(db, `tournaments/${tournamentId}/scores`),
      where("judgingType", "==", "finalScores")
    );
    const querySnapshot = await getDocs(q);

    // Loops through the documents that were fetched from the database
    for (const scoreDoc of querySnapshot.docs) {
      let scores = scoreDoc.data();
      delete scores.judgingType; // Removes the 'judgingType' field

      // Uses the skipper ID to query for the name of the skipper
      const skipperDoc = await getDoc(
        doc(db, `tournaments/${tournamentId}/skippers`, scores.skipperId)
      );
      // Adds the skippers first name, last name,
      // DOB, state, gender and club to the scores object
      scores.firstName = skipperDoc.data().firstName;
      scores.lastName = skipperDoc.data().lastName;
      scores.club = skipperDoc.data().club;
      scores.state = skipperDoc.data().state;
      scores.gender = skipperDoc.data().gender;
      scores.DOB = skipperDoc.data().DOB;

      delete scores.skipperId; // Removes the 'skipperId' field

      // this object defines the order of the scores object
      // so that the order of the columns on the .csv will be correct
      const objectOrder = {
        firstName: null,
        lastName: null,
        DOB: null,
        state: null,
        gender: null,
        club: null,
        difficultyScore: null,
        repetitionScore: null,
        requiredElementsScore: null,
        presentationScore: null,
        deductionScore: null,
        routineScore: null,
      };
      scores = Object.assign(objectOrder, scores); // reorders the scores object to follow the objectOrder object
      unparsedScoreData.push(scores); // Adds the scores object to an array of score objects
    }
    const scoreDataCsv = Papa.unparse(unparsedScoreData); // parses the array of score data into a .csv string format
    return scoreDataCsv;
  };

  // Takes the .csv string and saves it to a .csv file to the local storage of the device
  const saveScoresToStorage = async (scoreDataCsv) => {
    // Gets permission for the app to access the local storage
    // The user selects a specific folder where the .csv file would be saved
    // returns an object with a boolean of whether permission was granted and a string of the directory URI
    const permission =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permission.granted) return;

    try {
      // Creates a .csv file at the directory with the name "tournamentName_scores.csv"
      // returns the uri for that file
      const scoreFileUri = await StorageAccessFramework.createFileAsync(
        permission.directoryUri,
        `${tournamentName}_scores.csv`,
        "text/csv"
      );

      // Writes the score data to the created file
      await FileSystem.writeAsStringAsync(scoreFileUri, scoreDataCsv, {
        encoding: FileSystem.EncodingType.UTF8,
      });
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <View style={AndroidSafeArea.AndroidSafeArea}>
      <BackButton />
      <View style={styles.container}>
        <Text style={styles.titleText}>VIEW SCORES</Text>
        <View style={styles.tournamentDetailsWrapper}>
          <Text
            style={styles.tournamentDetailsText}
            selectable
          >{`Tournament Name: ${tournamentName}`}</Text>
          <Text
            style={styles.tournamentDetailsText}
            selectable
          >{`Tournament ID: ${tournamentId}`}</Text>
        </View>

        <CustomButton
          text="EXPORT AS .CSV"
          touchableOpacityStyle={styles.touchableOpacityStyle}
          onPressHandler={onExportPress}
        />
      </View>
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
    paddingTop: 20,
    letterSpacing: 6,
  },
  tournamentDetailsWrapper: {
    marginTop: 20,
    alignSelf: "center",
  },
  tournamentDetailsText: {
    fontSize: 18,
    fontFamily: "Roboto_400Regular",
    letterSpacing: 1,
    marginBottom: 10,
  },
  touchableOpacityStyle: {
    marginTop: 100,
  },
});
