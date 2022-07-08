// An undo button component that is reused in the judging screens
import CustomButton from "./CustomButton";
import colours from "../assets/colours";
import { View, StyleSheet, Vibration } from "react-native";
import dimensions from "../assets/Dimensions";

export default function UndoButton({
  counters,
  setSelectedButton,
  selectedButton,
  wrapperStyle,
  lastRepeatedSkillsChange,
}) {
  // Triggers when the undo button is pressed
  // Undoes the last button press and deselects the selected button
  const onUndoButtonPress = () => {
    if (selectedButton === null) return;
    Vibration.vibrate(150);
    let counter = null;
    console.log(selectedButton);

    if (selectedButton == "Repeated Skills") {
      counters[0][1]({
        ...counters[0][0],
        counter: parseFloat(
          (counters[0][0].counter - lastRepeatedSkillsChange).toFixed(2)
        ),
      });
      console.log(counters[0][0]);
      setSelectedButton(null);
      return;
    }

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
    <View style={[styles.undoButtonWrapper, { ...wrapperStyle }]}>
      <CustomButton
        text="UNDO"
        style={{
          ...styles.undoButton,
          backgroundColor:
            selectedButton === null
              ? colours.undoHighlight
              : colours.undoButton,
        }}
        textStyle={styles.buttonText}
        onPressHandler={() => onUndoButtonPress(selectedButton)}
        activeOpacity={selectedButton === null ? 100 : 0.2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  undoButtonWrapper: {
    justifyContent: "center",
    flexDirection: "row",
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
