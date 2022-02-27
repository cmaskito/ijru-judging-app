import CustomButton from "./CustomButton";
import colours from "../assets/colours";
import { View, Text, StyleSheet, Vibration, Alert } from "react-native";
import dimensions from "../assets/Dimensions";

export default function RedButtons({
  countersToReset,
  navigation,
  setSelectedButton,
}) {
  const onResetButtonPress = () => {
    Vibration.vibrate(200);
    Alert.alert("Reset?", "Are you sure you want to reset?", [
      {
        text: "Cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          countersToReset.forEach((item) => {
            item[1]({ ...item[0], counter: 0 });
          });
          setSelectedButton(null);
        },
      },
    ]);
  };

  const onCancelButtonPress = () => {
    Vibration.vibrate(200);
    navigation.goBack();
  };
  return (
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
