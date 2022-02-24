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

export default function Presentation({ navigation }) {
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

  const onUndoButtonPress = () => {
    Vibration.vibrate(150);
    if (selectedButton === null) return;
    let counter = null;
    levelCounters.forEach((levelCounter) => {
      if (levelCounter[0].title === selectedButton) {
        counter = levelCounter;
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
    <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
      {/* Header */}
      <Header
        eventName="Event Name"
        bracket="Bracket"
        judgingType="Presentation"
        skipperName="Skipper Name"
      />

      <Text>Presentation</Text>
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
          onPressHandler={onCancelButtonPress}
        />
        <CustomButton
          style={styles.redButton}
          textStyle={styles.buttonText}
          text="RESET"
          onPressHandler={onResetButtonPress}
        />
      </View>
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
});
