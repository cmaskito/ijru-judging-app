import CustomButton from "./CustomButton";
import colours from "../assets/colours";

export default function RedButtons() {
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
    return(
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
    )
}