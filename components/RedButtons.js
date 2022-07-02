// A custom component that allows the 'red' buttons on the judging buttons to be reused.
import CustomButton from "./CustomButton";
import colours from "../assets/colours";
import { View, StyleSheet, Vibration, Alert } from "react-native";
import dimensions from "../assets/Dimensions";

export default function RedButtons({
  counters,
  navigation,
  setSelectedButton,
  practice,
  eventDetails,
}) {
  // Resets the counters
  const onResetButtonPress = () => {
    Vibration.vibrate(200);
    Alert.alert("Reset?", "Are you sure you want to reset?", [
      {
        text: "Cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          counters.forEach((item) => {
            item[1]({ ...item[0], counter: 0 });
          });
          setSelectedButton(null);
        },
      },
    ]);
  };

  // Causes the user to go back to the previous screen
  const onCancelButtonPress = () => {
    Vibration.vibrate(200);
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
  };

  // Causes the user to move to the score summary screen
  const onDoneButtonPress = () => {
    const counterValues = [];
    counters.forEach((counter) => {
      counterValues.push(counter[0]);
    });
    navigation.navigate("ScoreSummary", {
      practice,
      counters: counterValues,
      eventDetails,
    });
  };

  return (
    <View style={styles.redButtonsWrapper}>
      <CustomButton
        style={styles.redButton}
        textStyle={styles.buttonText}
        text="DONE"
        onPressHandler={onDoneButtonPress}
      />
      <CustomButton
        style={styles.redButton}
        textStyle={styles.buttonText}
        text="CANCEL"
        onPressHandler={onCancelButtonPress}
      />
      <CustomButton
        style={styles.redButton}
        textStyle={styles.buttonText}
        text="RESET"
        onPressHandler={onResetButtonPress}
      />
    </View>
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
});
