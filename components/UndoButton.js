import CustomButton from "./CustomButton";
import colours from "../assets/colours";
import { View, Text, StyleSheet, Vibration } from "react-native";
import dimensions from "../assets/Dimensions";

export default function UndoButton({
  counters,
  setSelectedButton,
  selectedButton,
}) {
  const onUndoButtonPress = () => {
    Vibration.vibrate(150);
    if (selectedButton === null) return;
    let counter = null;
    counters.forEach((counter_) => {
      if (counter_[0].title === selectedButton) {
        counter = counter_;
      }
    });
    if (counter[0].counter > 0) {
      counter[1]({
        ...counter[0],
        counter: counter[0].counter - 1,
      });
      setSelectedButton(null);
    }
  };

  return (
    <View style={styles.undoButtonWrapper}>
      <CustomButton
        text="UNDO"
        style={styles.undoButton}
        textStyle={styles.buttonText}
        onPressHandler={() => onUndoButtonPress(selectedButton)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  undoButtonWrapper: {
    justifyContent: "center",
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 2,
  },
  undoButton: {
    width: dimensions.width - 30,
    height: dimensions.height * 0.115,
    backgroundColor: colours.undoButton,
  },
  buttonText: {
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
  },
});
