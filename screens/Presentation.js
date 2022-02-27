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

export default function Presentation({ navigation }) {
  const counters = [
    ([plusCounter, setPlusCounter] = useState({
      title: "+",
      counter: 0,
    })),
    ([tickCounter, setTickCounter] = useState({
      title: "✓",
      counter: 0,
    })),
    ([minusCounter, setMinusCounter] = useState({
      title: "-",
      counter: 0,
    })),
    ([mistakeCounter, setMistakeCounter] = useState({
      title: "Mistakes",
      counter: 0,
    })),
  ];

  const [selectedButton, setSelectedButton] = useState(null);

  const onJudgingButtonPress = (counter) => {
    Vibration.vibrate(70);
    const newCounter = { ...counter[0], counter: counter[0].counter + 1 };
    counter[1](newCounter);
    setSelectedButton(counter[0].title);
  };

  let hasUnsavedChanges = true;

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
        judgingType="Presentation"
        skipperName="Skipper Name"
      />

      {/* Red Buttons */}
      <RedButtons
        navigation={navigation}
        countersToReset={counters}
        setSelectedButton={setSelectedButton}
      />

      {/* Counters */}
      <View style={styles.countersButtonsWrapper}>
        {counters.map((counter) => {
          return (
            <CustomButton
              key={nextId()}
              style={{
                ...styles.counterButton,
                backgroundColor:
                  selectedButton === counter[0].title
                    ? `${colours.button}30`
                    : colours.button,
                borderColor:
                  selectedButton === counter[0].title
                    ? `${colours.highlight}`
                    : colours.button,
                borderWidth: 7,
              }}
              text={`${counter[0].title}\n${counter[0].counter}`}
              textStyle={styles.buttonText}
              onPressHandler={() => onJudgingButtonPress(counter)}
            />
          );
        })}
      </View>

      {/* Undo Button */}
      <UndoButton
        counters={counters}
        selectedButton={selectedButton}
        setSelectedButton={setSelectedButton}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  countersButtonsWrapper: {
    marginTop: 16,
    marginHorizontal: 15,
    marginBottom: 0,
    paddingBottom: 0,
    flexWrap: "wrap-reverse",
    flexDirection: "row",
    backgroundColor: "red",
    flex: 1,
  },
  counterButton: {
    width: dimensions.width * 0.29,
    height: dimensions.height * 0.2,
    marginBottom: 8,
    borderRadius: 9,
  },
});
