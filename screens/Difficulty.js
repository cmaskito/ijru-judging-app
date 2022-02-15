import { Roboto_400Regular } from "@expo-google-fonts/roboto";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Vibration,
  Alert,
  FlatList,
} from "react-native";
import colours from "../assets/colours";
import AndroidSafeArea from "../assets/SafeArea";
import CustomButton from "../components/CustomButton";
import dimensions from "../assets/Dimensions";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Difficulty() {
  const levelCounters = [
    ([levelOneCounter, setLevelOneCounter] = useState({
      title: "Level 1",
      counter: 0,
    })),
    ([levelTwoCounter, setLevelTwoCounter] = useState({
      title: "Level 2",
      counter: 0,
    })),
    ([levelThreeCounter, setLevelThreeCounter] = useState({
      title: "Level 3",
      counter: 0,
    })),
    ([levelFourCounter, setLevelFourCounter] = useState({
      title: "Level 4",
      counter: 0,
    })),
    ([levelFiveCounter, setLevelFiveCounter] = useState({
      title: "Level 5",
      counter: 0,
    })),
    ([levelSixCounter, setLevelSixCounter] = useState({
      title: "Level 6",
      counter: 0,
    })),
    ([levelSevenCounter, setLevelSevenCounter] = useState({
      title: "Level 7",
      counter: 0,
    })),
    ([levelEightCounter, setLevelEightCounter] = useState({
      title: "Level 8",
      counter: 0,
    })),
    ([levelHalfCounter, setLevelHalfCounter] = useState({
      title: "Level 0.5",
      counter: 0,
    })),
  ];

  // [levelOneCounter, setLevelOneCounter] = useState({
  //   title: "Level 1",
  //   counter: 0,
  // });
  // [levelTwoCounter, setLevelTwoCounter] = useState({
  //   title: "Level 2",
  //   counter: 0,
  // });
  // [levelThreeCounter, setLevelThreeCounter] = useState({
  //   title: "Level 3",
  //   counter: 0,
  // });
  // [levelFourCounter, setLevelFourCounter] = useState({
  //   title: "Level 4",
  //   counter: 0,
  // });
  // [levelFiveCounter, setLevelFiveCounter] = useState({
  //   title: "Level 5",
  //   counter: 0,
  // });
  // [levelSixCounter, setLevelSixCounter] = useState({
  //   title: "Level 6",
  //   counter: 0,
  // });
  // [levelSevenCounter, setLevelSevenCounter] = useState({
  //   title: "Level 7",
  //   counter: 0,
  // });
  // [levelEightCounter, setLevelEightCounter] = useState({
  //   title: "Level 8",
  //   counter: 0,
  // });
  // [levelHalfCounter, setLevelHalfCounter] = useState({
  //   title: "Level 0.5",
  //   counter: 0,
  // });

  const [selectedButton, setSelecteButton] = useState(null);

  const onJudgingButtonPress = (counter) => {
    Vibration.vibrate(70);
    const newCounter = {
      ...counter.counterState,
      counter: counter.counterState.counter + 1,
    };
    counter.setCounterState(newCounter);
  };

  const onResetButtonPress = () => {
    Vibration.vibrate(200);
    Alert.alert("Reset?", "Are you sure you want to reset?", [
      {
        text: "Cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          levelCounters.forEach((item) => {
            item[1](0);
          });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>
          Event Name - Bracket - Difficulty - Skipper Name
        </Text>
      </View>

      {/* Red Buttons */}

      <View style={styles.redButtonsWrapper}>
        <CustomButton
          style={styles.redButton}
          textStyle={styles.buttonText}
          text="DONE"
        />
        <CustomButton
          style={styles.redButton}
          textStyle={styles.buttonText}
          text="CANCEL"
        />
        <CustomButton
          style={styles.redButton}
          textStyle={styles.buttonText}
          text="RESET"
          onPressHandler={onResetButtonPress}
        />
      </View>

      {/* Level Buttons */}
      <View style={styles.levelButtonsWrapper}>
        {levelCounters.map((counter, index) => {
          console.log(counter);
          return (
            <CustomButton
              key={index}
              style={styles.levelButton}
              text={`${counter[0].title}\n${counter[0].counter}`}
              textStyle={styles.buttonText}
              onPressHandler={() => onJudgingButtonPress(counter)}
            />
          );
        })}
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
    fontFamily: "Roboto_400Regular",
    fontSize: 10,
  },
  levelButtonsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 16,
    marginHorizontal: 10,
  },
  levelButton: {
    width: dimensions.width * 0.29,
    height: dimensions.height * 0.2,
    marginBottom: 8,
    borderRadius: 9,
  },
});
