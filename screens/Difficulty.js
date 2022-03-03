import { Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Vibration,
  Alert,
} from "react-native";
import colours from "../assets/colours";
import AndroidSafeArea from "../assets/SafeArea";
import CustomButton from "../components/CustomButton";
import dimensions from "../assets/Dimensions";
import { useState, useEffect } from "react";
import nextId from "react-id-generator";
import { NavigationRouteContext } from "@react-navigation/native";
import Header from "../components/Header";
import RedButtons from "../components/RedButtons";
import UndoButton from "../components/UndoButton";
import CounterButton from "../components/CounterButton";

export default function Difficulty({ navigation }) {
  const levelCounters = [
    ([levelOneCounter, setLevelOneCounter] = useState({
      title: "Level 1",
      counter: 0,
    })),
    ([levelHalfCounter, setLevelHalfCounter] = useState({
      title: "Level 0.5",
      counter: 0,
    })),
    ([levelFourCounter, setLevelFourCounter] = useState({
      title: "Level 4",
      counter: 0,
    })),
    ([levelTwoCounter, setLevelTwoCounter] = useState({
      title: "Level 2",
      counter: 0,
    })),
    ([levelSevenCounter, setLevelSevenCounter] = useState({
      title: "Level 7",
      counter: 0,
    })),
    ([levelFiveCounter, setLevelFiveCounter] = useState({
      title: "Level 5",
      counter: 0,
    })),
    ([levelThreeCounter, setLevelThreeCounter] = useState({
      title: "Level 3",
      counter: 0,
    })),
    ([levelEightCounter, setLevelEightCounter] = useState({
      title: "Level 8",
      counter: 0,
    })),
    ([levelSixCounter, setLevelSixCounter] = useState({
      title: "Level 6",
      counter: 0,
    })),
  ];

  const [selectedButton, setSelectedButton] = useState(null);
  let hasUnsavedChanges = true;

  const onJudgingButtonPress = (counter) => {
    Vibration.vibrate(70);
    const newCounter = { ...counter[0], counter: counter[0].counter + 1 };
    counter[1](newCounter);
    setSelectedButton(counter[0].title);
  };

  // Makes an alert pop up if the user tries to leave the screen with unsaved changes
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      if (!hasUnsavedChanges) return;

      e.preventDefault();
      Alert.alert(
        "Cancel?",
        "Are you sure you want to cancel this judging session? Data will not be saved.",
        [
          { text: "No" },
          {
            text: "Yes",
            onPress: () => {
              hasUnsavedChanges = false;
              navigation.goBack();
            },
          },
        ]
      );
    });
  }, [navigation]);

  return (
    <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
      {/* Header */}
      <Header
        eventName="Event Name"
        bracket="Bracket"
        judgingType="Difficulty"
        skipperName="Skipper Name"
      />

      {/* Red Buttons */}

      <RedButtons
        countersToReset={levelCounters}
        setSelectedButton={setSelectedButton}
        navigation={navigation}
      />

      {/* Level Buttons */}
      <View style={styles.levelButtonsWrapper}>
        {levelCounters.map((counter) => {
          return (
            <CounterButton
              key={nextId()}
              selectedButton={selectedButton}
              counter={counter}
              setSelectedButton={setSelectedButton}
            />
          );
        })}

        {/* Undo Button */}
        <UndoButton
          counters={levelCounters}
          setSelectedButton={setSelectedButton}
          selectedButton={selectedButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: colours.headerColour,
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 22,
    letterSpacing: 0.8,
  },
  redButtonsWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
    marginHorizontal: 10,
  },
  redButton: {
    backgroundColor: colours.lightRed,
    width: dimensions.width * 0.29,
    height: 45,
    alignSelf: "stretch",
  },
  buttonText: {
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
  },
  levelButtonsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 16,
    marginHorizontal: 15,
  },
  levelButton: {
    width: dimensions.width * 0.29,
    height: dimensions.height * 0.2,
    marginBottom: 8,
    borderRadius: 9,
  },
});
