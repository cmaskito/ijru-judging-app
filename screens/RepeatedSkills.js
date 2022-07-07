// The difficulty judging page

import { StyleSheet, View, SafeAreaView, Vibration, Text } from "react-native";
import colours from "../assets/colours";
import AndroidSafeArea from "../assets/SafeArea";
import dimensions from "../assets/Dimensions";
import { useState } from "react";
import nextId from "react-id-generator";
import React from "react";
import { Grid, Row, Col } from "react-native-easy-grid";
import CustomButton from "../components/CustomButton";
import UndoButton from "../components/UndoButton";
import RequiredElements from "./RequiredElements";

export default function RepeatedSkills({ navigation, route }) {
  // list of counters that track how often the counters are pressed

  const onButtonPress = (level) => {
    const repeatedSkillsScore = 0.1 * 1.8 ** level;
    console.log(repeatedSkillsScore);
    navigation.navigate("RequiredElements", { repeatedSkillsScore });
  };

  return (
    <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
      <View style={styles.titleWrapper}>
        <Text style={styles.titleText}>REPEATED SKILLS</Text>
      </View>

      {/* Level Buttons */}
      <Grid style={styles.levelButtonsWrapper}>
        <Row size={26.5}>
          <Col>
            <CustomButton
              style={{
                ...styles.counterButton,
                backgroundColor: colours.button,
                borderColor: colours.button,
                borderWidth: 7,
                alignSelf: "flex-end",
              }}
              text="Level 4"
              textStyle={styles.buttonText}
              onPressHandler={() => onButtonPress(4)}
            />
          </Col>
        </Row>
        <Row size={26.5}>
          <Col></Col>
          <Col>
            <CustomButton
              style={{
                ...styles.counterButton,
                backgroundColor: colours.button,
                borderColor: colours.button,
                borderWidth: 7,
                alignSelf: "flex-end",
              }}
              text="Level 7"
              textStyle={styles.buttonText}
              onPressHandler={() => onButtonPress(7)}
            />
          </Col>
          <Col>
            <CustomButton
              style={{
                ...styles.counterButton,
                backgroundColor: colours.button,
                borderColor: colours.button,
                borderWidth: 7,
                alignSelf: "flex-end",
              }}
              text="Level 5"
              textStyle={styles.buttonText}
              onPressHandler={() => onButtonPress(5)}
            />
          </Col>
        </Row>
        <Row size={26.5}>
          <Col>
            <CustomButton
              style={{
                ...styles.counterButton,
                backgroundColor: colours.button,
                borderColor: colours.button,
                borderWidth: 7,
                alignSelf: "flex-end",
              }}
              text="Level 3"
              textStyle={styles.buttonText}
              onPressHandler={() => onButtonPress(3)}
            />
          </Col>
          <Col>
            <CustomButton
              style={{
                ...styles.counterButton,
                backgroundColor: colours.button,
                borderColor: colours.button,
                borderWidth: 7,
                alignSelf: "flex-end",
              }}
              text="Level 8"
              textStyle={styles.buttonText}
              onPressHandler={() => onButtonPress(8)}
            />
          </Col>
          <Col>
            <CustomButton
              style={{
                ...styles.counterButton,
                backgroundColor: colours.button,
                borderColor: colours.button,
                borderWidth: 7,
                alignSelf: "flex-end",
              }}
              text="Level 9"
              textStyle={styles.buttonText}
              onPressHandler={() => onButtonPress(9)}
            />
          </Col>
        </Row>
        <Row size={20.5}>
          <UndoButton />
        </Row>
      </Grid>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
  },
  levelButtonsWrapper: {
    justifyContent: "space-between",
    marginTop: 30,
    marginHorizontal: 15,
  },
  counterButton: {
    width: dimensions.width * 0.29,
    height: dimensions.height * 0.2,
    marginBottom: 8,
    borderRadius: 9,
    alignItems: "center",
    textAlign: "center",
  },
  buttonText: {
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
    textAlign: "center",
    alignSelf: "center",
  },
  titleWrapper: {
    marginTop: 30,
    alignItems: "center",
  },
  titleText: {
    fontSize: 36,
    color: colours.textDark,
    fontFamily: "Roboto_700Bold",
    textAlign: "center",
    width: 316,
    alignSelf: "center",
    paddingTop: 20,
    letterSpacing: 6,
  },
});
