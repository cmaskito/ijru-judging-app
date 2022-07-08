// A juding button counter that can be reused on the judging screens
import CustomButton from "./CustomButton";
import colours from "../assets/colours";
import { StyleSheet, Vibration } from "react-native";
import dimensions from "../assets/Dimensions";

export default function CounterButton({
  selectedButton,
  counter,
  index,
  setSelectedButton,
  style,
}) {
  // Triggered when the button is pressed
  // Vibrates the phone and increments the counter by 1
  const onJudgingButtonPress = (counter) => {
    Vibration.vibrate(100);
    const newCounter = { ...counter[0], counter: counter[0].counter + 1 };
    counter[1](newCounter);
    setSelectedButton(counter[0].title);
  };

  return (
    <CustomButton
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
        alignSelf:
          index === 0 ? "flex-start" : index === 1 ? "center" : "flex-end",
        ...style,
      }}
      text={`${counter[0].title}\n${counter[0].counter}`}
      textStyle={styles.buttonText}
      onPressHandler={() => onJudgingButtonPress(counter)}
    />
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
  },

  counterButton: {
    width: dimensions.width * 0.29,
    height: dimensions.height * 0.2,
    marginBottom: 8,
    borderRadius: 9,
  },
});
