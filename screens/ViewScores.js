// This screen allows users to select an event (so far there is only single rope freestyle)
// and see the scores of the skippers that competed in that event
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
    console.log("on export pressed");
    const scoreDataCsv = await parseScoreData();

    await saveScoresToStorage(scoreDataCsv);
    Alert.alert(
      "File Saved",
      "The tournament scores have been saved to the selected folder"
    );
  };

  const parseScoreData = async () => {
    let unparsedScoreData = [];
    const q = query(
      collection(db, `tournaments/${tournamentId}/scores`),
      where("judgingType", "==", "finalScores")
    );
    const querySnapshot = await getDocs(q);

    for (const scoreDoc of querySnapshot.docs) {
      let scores = scoreDoc.data();
      delete scores.judgingType;
      console.log(scores);
      const skipperDoc = await getDoc(
        doc(db, `tournaments/${tournamentId}/skippers`, scores.skipperId)
      );
      scores.skipperName = `${skipperDoc.data().firstName} ${
        skipperDoc.data().lastName
      }`;
      delete scores.skipperId;
      const objectOrder = {
        skipperName: null,
        difficultyScore: null,
        repetitionScore: null,
        requiredElementsScore: null,
        presentationScore: null,
        deductionScore: null,
        routineScore: null,
      };
      scores = Object.assign(objectOrder, scores);
      unparsedScoreData.push(scores);
    }
    const scoreDataCsv = Papa.unparse(unparsedScoreData);
    return scoreDataCsv;
  };

  const saveScoresToStorage = async (scoreDataCsv) => {
    const permission =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permission.granted) return;
    try {
      const scoreFileUri = await StorageAccessFramework.createFileAsync(
        permission.directoryUri,
        `${tournamentName}_scores.csv`,
        "text/csv"
      );
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
