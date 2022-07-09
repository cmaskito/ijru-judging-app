// A screen with a summary of the buttons pressed when judging
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  Alert,
} from "react-native";
import colours from "../assets/colours";
import AndroidSafeArea from "../assets/SafeArea";

import CustomButton from "../components/CustomButton";
import BackButton from "../components/BackButton";
import { db } from "../firebase-config";
import {
  getDocs,
  collection,
  addDoc,
  query,
  where,
  setDoc,
  doc,
} from "firebase/firestore";
import { Edit3 } from "react-native-feather";
import _, { sortBy } from "underscore";

export default function ScoreSummary({ route, navigation }) {
  const { counters, eventDetails } = route.params; // parameters passed from previous judging screen

  // Triggers when user presses the submit button
  const onSubmitPress = async () => {
    let scores = {};
    try {
      // Adds data from the cournters array to the scores object
      counters.forEach((counter) => {
        scores[counter.title] = counter.counter;
      });

      // // Checks if there is an existing document for that skipper and score type
      // Creates an alert if there is asking to overwrite
      const q = query(
        collection(db, `tournaments/${eventDetails.tournamentId}/scores`),
        where("judgingType", "==", eventDetails.judgingType.toLowerCase()),
        where("skipperId", "==", eventDetails.skipper.id)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        Alert.alert(
          "Submit Scores",
          "There are already existing scores for this athlete in this event. Do you want to overwrite it?",
          [
            { text: "Cancel" },
            {
              text: "OK",
              // Overwrites the existing document
              onPress: async () => {
                await setDoc(
                  doc(
                    db,
                    `tournaments/${eventDetails.tournamentId}/scores`,
                    querySnapshot.docs[0].id
                  ),
                  {
                    ...scores,
                    skipperId: eventDetails.skipper.id,
                    judgingType: eventDetails.judgingType.toLowerCase(),
                  }
                );
                navigation.navigate("ScoresSubmitted", {
                  tournamentId: eventDetails.tournamentId,
                });
              },
            },
          ]
        );
      } else {
        addDoc(
          collection(db, `tournaments/${eventDetails.tournamentId}/scores`),
          {
            ...scores,
            skipperId: eventDetails.skipper.id,
            judgingType: eventDetails.judgingType.toLowerCase(),
          }
        );

        navigation.navigate("ScoresSubmitted", {
          tournamentId: eventDetails.tournamentId,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
      <BackButton />
      {/* Displays a List of the score details */}
      <FlatList
        ListHeaderComponent={
          <View style={styles.container}>
            {/* Title */}
            <Text style={styles.titleText}>SCORE SUMMARY</Text>

            {/* Event Details header */}
            <View style={styles.subHeadingWrapper}>
              <Text style={styles.subHeading}>EVENT DETAILS</Text>
              <Edit3
                stroke={colours.textDark}
                height={24}
                style={{ marginLeft: 30 }}
              />
            </View>
            {/* Event Details */}
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

            {/* Scores header */}
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
          // Submit scores button
          <View>
            <CustomButton
              touchableOpacityStyle={styles.connectButton}
              text="SUBMIT SCORES"
              onPressHandler={() => onSubmitPress()}
            />
          </View>
        }
        // Score details
        scrollEnabled
        data={_.sortBy(counters, "title")}
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
