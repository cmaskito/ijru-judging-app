import { StyleSheet, View, Text, SafeAreaView, FlatList } from "react-native";
import colours from "../assets/colours";
import AndroidSafeArea from "../assets/SafeArea";

import CustomButton from "../components/CustomButton";
import BackButton from "../components/BackButton";
import { db } from "../firebase-config";
import { getDocs, collection, addDoc, doc } from "firebase/firestore";
import dimensions from "../assets/Dimensions";
import { Edit3 } from "react-native-feather";

export default function ScoreSummary({ route }) {
  const { practice, counters, eventDetails } = route.params;

  const onSubmitPress = async () => {
    let scores = {};
    try {
      counters.forEach((counter) => {
        scores[counter.title] = counter.counter;
      });
      console.log(scores);
      const scoresDocRef = await addDoc(
        collection(db, `tournaments/${eventDetails.tournamentId}/scores`),
        {
          ...scores,
          skipperId: eventDetails.skipper.id,
          judgingType: "difficulty",
          difficultyScore: calcDifficultyScore(),
        }
      );
    } catch (e) {
      console.error(e);
    }
  };

  const calcDifficultyScore = () => {
    let difficultyScore = 0;
    counters.forEach((counter) => {
      const level = parseFloat(counter.title.split(" ")[1]);
      difficultyScore +=
        (Math.round(0.1 * 1.8 ** level * 100) / 100) * counter.counter;
    });
    console.log(difficultyScore);
    return difficultyScore;
  };

  return (
    <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
      <BackButton />
      <FlatList
        ListHeaderComponent={
          <View style={styles.container}>
            <Text style={styles.titleText}>SCORE SUMMARY</Text>

            <View style={styles.subHeadingWrapper}>
              <Text style={styles.subHeading}>EVENT DETAILS</Text>
              <Edit3
                stroke={colours.textDark}
                height={24}
                style={{ marginLeft: 30 }}
              />
            </View>
            <View style={styles.listWrapper}>
              <Text
                style={styles.listText}
              >{`Tournament Name: ${eventDetails.tournamentName}`}</Text>
              <Text
                style={styles.listText}
              >{`Tournament ID: ${eventDetails.tournamentId}`}</Text>
              <Text
                style={styles.listText}
              >{`Judging Type: ${eventDetails.judgingType}`}</Text>
              <Text style={styles.listText}>
                {`Skipper Name: ${eventDetails.skipper.firstName} ${eventDetails.skipper.lastName}`}{" "}
              </Text>
            </View>
            <View style={styles.subHeadingWrapper}>
              <Text style={styles.subHeading}>SCORES</Text>
              <Edit3
                stroke={colours.textDark}
                height={24}
                style={{ marginLeft: 30 }}
              />
            </View>
          </View>
        }
        ListFooterComponent={
          <CustomButton
            touchableOpacityStyle={styles.connectButton}
            text="SUBMIT SCORES"
            onPressHandler={() => onSubmitPress()}
          />
        }
        scrollEnabled
        data={counters}
        keyExtractor={(item) => item.title}
        renderItem={(item) => {
          return (
            <Text
              style={{ ...styles.listText, marginLeft: 40 }}
            >{`${item.item.title}: ${item.item.counter}`}</Text>
          );
        }}
      />
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
  connectButton: {
    alignSelf: "center",
    marginVertical: 30,
  },
  subHeadingWrapper: {
    marginTop: 40,
    alignSelf: "flex-start",
    marginLeft: 25,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  subHeading: {
    fontFamily: "Roboto_700Bold",
    fontSize: 22,
    letterSpacing: 4,
  },
  listWrapper: {
    marginTop: 10,
    width: "100%",
    paddingHorizontal: 40,
  },
  listText: {
    marginTop: 10,
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
  },
});
