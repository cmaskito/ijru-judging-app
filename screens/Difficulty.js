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
  //   const [levelCounters, setLevelCounters] = useState([
  //     ([levelOneCounter, setLevelOneCounter] = useState({
  //       title: "Level 1",
  //       counter: 0,
  //     })),
  //     ([levelTwoCounter, setLevelTwoCounter] = useState({
  //       title: "Level 2",
  //       counter: 0,
  //     })),
  //     ([levelThreeCounter, setLevelThreeCounter] = useState({
  //       title: "Level 3",
  //       counter: 0,
  //     })),
  //     ([levelFourCounter, setLevelFourCounter] = useState({
  //       title: "Level 4",
  //       counter: 0,
  //     })),
  //     ([levelFiveCounter, setLevelFiveCounter] = useState({
  //       title: "Level 5",
  //       counter: 0,
  //     })),
  //     ([levelSixCounter, setLevelSixCounter] = useState({
  //       title: "Level 6",
  //       counter: 0,
  //     })),
  //     ([levelSevenCounter, setLevelSevenCounter] = useState({
  //       title: "Level 7",
  //       counter: 0,
  //     })),
  //     ([levelEightCounter, setLevelEightCounter] = useState({
  //       title: "Level 8",
  //       counter: 0,
  //     })),
  //     ([levelHalfCounter, setLevelHalfCounter] = useState({
  //       title: "Level 0.5",
  //       counter: 0,
  //     })),
  //   ]);

  [levelOneCounter, setLevelOneCounter] = useState({
    title: "Level 1",
    counter: 0,
  });
  [levelTwoCounter, setLevelTwoCounter] = useState({
    title: "Level 2",
    counter: 0,
  });
  [levelThreeCounter, setLevelThreeCounter] = useState({
    title: "Level 3",
    counter: 0,
  });
  [levelFourCounter, setLevelFourCounter] = useState({
    title: "Level 4",
    counter: 0,
  });
  [levelFiveCounter, setLevelFiveCounter] = useState({
    title: "Level 5",
    counter: 0,
  });
  [levelSixCounter, setLevelSixCounter] = useState({
    title: "Level 6",
    counter: 0,
  });
  [levelSevenCounter, setLevelSevenCounter] = useState({
    title: "Level 7",
    counter: 0,
  });
  [levelEightCounter, setLevelEightCounter] = useState({
    title: "Level 8",
    counter: 0,
  });
  [levelHalfCounter, setLevelHalfCounter] = useState({
    title: "Level 0.5",
    counter: 0,
  });

  const levelCounters = [
    { counterState: levelOneCounter, setCounterState: setLevelOneCounter },
    { counterState: levelTwoCounter, setCounterState: setLevelTwoCounter },
  ];

  const [selectedButton, setSelecteButton] = useState(null);

  const levelOneRef = levelOneCounter;

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
          setLevelOneCounter({ title: "level1", counter: 0 });
          setLevelTwoCounter(0);
          setLevelThreeCounter(0);
          setLevelFourCounter(0);
          setLevelFiveCounter(0);
          setLevelSixCounter(0);
          setLevelSevenCounter(0);
          setLevelEightCounter(0);
          setLevelHalfCounter(0);
          setSelecteButton(null);
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
          console.log(counter.counterState);
          return (
            <CustomButton
              key={index}
              style={styles.levelButton}
              text={`${counter.counterState.title}\n${counter.counterState.counter}`}
              textStyle={styles.buttonText}
              onPressHandler={() => onJudgingButtonPress(counter)}
            />
          );
        })}

        {/* <CustomButton
          style={{
            ...styles.levelButton,
            backgroundColor: selectedButton === 1 ? "red" : colours.button,
          }}
          text={`Level 1\n${levelOneCounter}`}
          onPressHandler={() =>
            onJudgingButtonPress(levelOneCounter, setLevelOneCounter, 1)
          }
        />
        <CustomButton
          style={{
            ...styles.levelButton,
            backgroundColor: selectedButton === 0.5 ? "red" : colours.button,
          }}
          text={`Level 0.5\n${levelHalfCounter}`}
          onPressHandler={() =>
            onJudgingButtonPress(levelHalfCounter, setLevelHalfCounter, 0.5)
          }
        />
        <CustomButton
          style={{
            ...styles.levelButton,
            backgroundColor: selectedButton === 4 ? "red" : colours.button,
          }}
          text={`Level 4\n${levelFourCounter}`}
          onPressHandler={() =>
            onJudgingButtonPress(levelFourCounter, setLevelFourCounter, 4)
          }
        />
        <CustomButton
          style={{
            ...styles.levelButton,
            backgroundColor: selectedButton === 2 ? "red" : colours.button,
          }}
          text={`Level 2\n${levelTwoCounter}`}
          onPressHandler={() =>
            onJudgingButtonPress(levelTwoCounter, setLevelTwoCounter, 2)
          }
        />
        <CustomButton
          style={{
            ...styles.levelButton,
            backgroundColor: selectedButton === 7 ? "red" : colours.button,
          }}
          text={`Level 7\n${levelSevenCounter}`}
          onPressHandler={() =>
            onJudgingButtonPress(levelSevenCounter, setLevelSevenCounter, 7)
          }
        />
        <CustomButton
          style={styles.levelButton}
          text={`Level 5\n${levelFiveCounter}`}
          onPressHandler={() =>
            onJudgingButtonPress(levelFiveCounter, setLevelFiveCounter)
          }
        />
        <CustomButton
          style={styles.levelButton}
          text={`Level 3\n${levelThreeCounter}`}
          onPressHandler={() =>
            onJudgingButtonPress(levelThreeCounter, setLevelThreeCounter)
          }
        />
        <CustomButton
          style={styles.levelButton}
          text={`Level 8\n${levelEightCounter}`}
          onPressHandler={() =>
            onJudgingButtonPress(levelEightCounter, setLevelEightCounter)
          }
        />
        <CustomButton
          style={styles.levelButton}
          text={`Level 6\n${levelSixCounter}`}
          onPressHandler={() =>
            onJudgingButtonPress(levelSixCounter, setLevelSixCounter)
          }
        /> */}
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
