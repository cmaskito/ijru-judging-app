import {
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_900Black,
} from "@expo-google-fonts/roboto";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import colours from "../assets/colours";
import AndroidSafeArea from "../assets/SafeArea";

import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import CustomButton from "../components/CustomButton";

export default function JudgingType({ navigation, route }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Difficulty", value: "difficulty" },
    { label: "Presentation", value: "presentation" },
    { label: "Required Elements", value: "requiredElements" },
  ]);

  const { practice } = route.params;

  const onPressHandler = (value) => {
    switch (value) {
      case "difficulty":
        navigation.navigate("Difficulty", { practice });
        break;
      case "presentation":
        navigation.navigate("Presentation", { practice });
        break;
      case "requiredElements":
        navigation.navigate("RequiredElements", { practice });
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
      <View style={styles.container}>
        <Text style={styles.titleText}>{"JUDGING\nTYPE"}</Text>
        <View style={styles.pickerWrapper}>
          <Text style={styles.pickerLabelText}>JUDGING TYPE</Text>
          <DropDownPicker
            style={styles.picker}
            textStyle={styles.pickerText}
            labelStyle={styles.pickerText}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Select Judging Type"
            placeholderStyle={styles.pickerText}
            dropDownContainerStyle={{
              backgroundColor: "#fafafa",
              borderWidth: 0,
            }}
          />
        </View>
        <CustomButton
          style={{ marginTop: 190 }}
          text="START JUDGING"
          onPressHandler={() => onPressHandler(value)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 80,
  },
  titleText: {
    fontFamily: "Roboto_700Bold",
    fontSize: 36,
    textAlign: "center",
    letterSpacing: 6,
  },
  pickerWrapper: {
    width: "85%",
    marginTop: 160,
  },
  picker: {
    backgroundColor: colours.lightGrey,
    borderWidth: 0,
    borderRadius: 15,
    height: 50,
    color: "red",
  },
  pickerText: {
    fontSize: 14,
    fontFamily: "Roboto_400Regular",
    letterSpacing: 0.5,
  },
  pickerLabelText: {
    paddingLeft: 5,
    letterSpacing: 1.5,
    fontFamily: "Roboto_400Regular",
    fontSize: 14,
    marginBottom: 3,
  },
});
