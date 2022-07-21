// Required Elements Judging Screen
import {
  StyleSheet,
  SafeAreaView,
  Vibration,
  Alert,
  BackHandler,
  View,
  Text,
} from "react-native";
import colours from "../assets/colours";
import AndroidSafeArea from "../assets/SafeArea";
import dimensions from "../assets/Dimensions";
import { useState, useEffect } from "react";
import nextId from "react-id-generator";
import Header from "../components/Header";
import RedButtons from "../components/RedButtons";
import UndoButton from "../components/UndoButton";
import { Col, Row, Grid } from "react-native-easy-grid";
import CounterButton from "../components/CounterButton";
import CustomButton from "../components/CustomButton";

export default function RequiredElements({ navigation, route }) {
  const counters = [
    ([repeatedSkills, setRepeatedSkills] = useState({
      title: "Repeated Skills",
      counter: 0,
    })),
    ([gymnasticsPower, setGymnasticsPower] = useState({
      title: "Gymnastics / Power",
      counter: 0,
    })),
    ([spaceViolations, setSpaceViolations] = useState({
      title: "Space Violations",
      counter: 0,
    })),
    ([multiples, setMultiples] = useState({
      title: "Multiples",
      counter: 0,
    })),
    ([wrapsReleases, setWrapsReleases] = useState({
      title: "Wraps / Releases",
      counter: 0,
    })),
    ([timeViolations, setTimeViolations] = useState({
      title: "Time Violations",
      counter: 0,
    })),
    ([mistakes, setMistakes] = useState({
      title: "Mistakes",
      counter: 0,
    })),
  ];

  const [lastRepeatedSkillsChange, setLastRepeatedSkillsChange] =
    useState(null); // Last repeated skills change that occurred.
  const { skipper, tournamentName, tournamentId } = route.params; // parameters passed from the previous screen
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectRepeatedSkill, setSelectRepeatedSkill] = useState(false); // boolean to check if the repeated skills button was last pressed

  // Makes an alert pop up if the user tries to leave the screen using the android hardware back button
  useEffect(() => {
    const backAction = () => {
      Vibration.vibrate(200);
      Alert.alert(
        "Cancel?",
        "Are you sure you want to cancel this judging session? Data will not be saved.",
        [
          { text: "No" },
          {
            text: "Yes",
            onPress: () => {
              navigation.goBack();
            },
          },
        ]
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  // Triggers when the repeated skills button is pressed
  const onRepeatedSkillsPress = () => {
    Vibration.vibrate(70);
    setSelectRepeatedSkill(true);
  };

  // Triggers when one of the level buttons on the repeated skils screen is pressed
  const onLevelButtonPress = (level) => {
    Vibration.vibrate(70);
    setSelectedButton(counters[0][0].title); // sets the repeated skills button the the last selected button
    const repeatedSkillsScore = parseFloat((0.1 * 1.8 ** level).toFixed(2)); // calculates score of the level of the repeated skill
    setLastRepeatedSkillsChange(repeatedSkillsScore); // records last change so it can be undone if needed

    //
    setRepeatedSkills({
      title: "Repeated Skills",
      counter: parseFloat(
        (repeatedSkills.counter + repeatedSkillsScore).toFixed(2)
      ),
    });
    setSelectRepeatedSkill(false);
    console.log(lastRepeatedSkillsChange);
  };

  const onGoBackPress = () => {
    Vibration.vibrate(150);
    setSelectRepeatedSkill(false);
  };

  if (!selectRepeatedSkill) {
    return (
      <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
        {/* Header */}
        <Header
          eventName="Event Name"
          bracket="Bracket"
          judgingType="Elements"
          skipperName={`${skipper.firstName} ${skipper.lastName}`}
        />

        {/* Red Buttons */}
        <RedButtons
          counters={counters}
          setSelectedButton={setSelectedButton}
          navigation={navigation}
          eventDetails={{
            tournamentName: tournamentName,
            judgingType: "Required Elements",
            skipper: skipper,
            tournamentId: tournamentId,
          }}
        />

        {/* Counter Grid */}
        {/* Uses a Grid package to layout the buttons */}
        <Grid style={styles.countersButtonsWrapper}>
          <Row size={26.5}>
            <Col>
              <CustomButton
                style={{
                  ...styles.counterButton,
                  backgroundColor:
                    selectedButton === counters[0][0].title
                      ? `${colours.button}30`
                      : colours.button,
                  borderColor:
                    selectedButton === counters[0][0].title
                      ? `${colours.highlight}`
                      : colours.button,
                  borderWidth: 7,
                  alignSelf: "center",
                }}
                touchableOpacityStyle={{
                  ...styles.counterButton,
                  alignSelf: "center",
                }}
                text={`Repeated Skills\n${repeatedSkills.counter}`}
                textStyle={styles.buttonText}
                onPressHandler={onRepeatedSkillsPress}
              />
            </Col>
          </Row>
          <Row size={26.5}>
            {counters.slice(1, 4).map((counter, index) => (
              <Col key={nextId()}>
                <CounterButton
                  selectedButton={selectedButton}
                  counter={counter}
                  index={index}
                  setSelectedButton={setSelectedButton}
                />
              </Col>
            ))}
          </Row>
          <Row size={26.5}>
            {counters.slice(4, 7).map((counter, index) => (
              <Col key={nextId()}>
                <CounterButton
                  selectedButton={selectedButton}
                  counter={counter}
                  index={index}
                  setSelectedButton={setSelectedButton}
                />
              </Col>
            ))}
          </Row>
          <Row size={20.5}>
            {
              <UndoButton
                counters={counters}
                selectedButton={selectedButton}
                setSelectedButton={setSelectedButton}
                lastRepeatedSkillsChange={lastRepeatedSkillsChange}
              />
            }
          </Row>
        </Grid>
      </SafeAreaView>
    );
  } else {
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
                touchableOpacityStyle={{
                  ...styles.counterButton,
                  alignSelf: "flex-end",
                }}
                text="Level 4"
                textStyle={styles.buttonText}
                onPressHandler={() => onLevelButtonPress(4)}
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
                  alignSelf: "center",
                }}
                touchableOpacityStyle={{
                  ...styles.counterButton,
                  alignSelf: "center",
                }}
                text="Level 7"
                textStyle={styles.buttonText}
                onPressHandler={() => onLevelButtonPress(7)}
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
                onPressHandler={() => onLevelButtonPress(5)}
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
                  alignSelf: "flex-start",
                }}
                text="Level 3"
                textStyle={styles.buttonText}
                onPressHandler={() => onLevelButtonPress(3)}
              />
            </Col>
            <Col>
              <CustomButton
                style={{
                  ...styles.counterButton,
                  backgroundColor: colours.button,
                  borderColor: colours.button,
                  borderWidth: 7,
                  alignSelf: "center",
                }}
                text="Level 8"
                textStyle={styles.buttonText}
                onPressHandler={() => onLevelButtonPress(8)}
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
                text="Level 6"
                textStyle={styles.buttonText}
                onPressHandler={() => onLevelButtonPress(6)}
              />
            </Col>
          </Row>
          <Row size={20.5}>
            <CustomButton
              text="Go Back"
              textStyle={styles.buttonText}
              style={styles.goBackButton}
              onPressHandler={onGoBackPress}
            />
          </Row>
        </Grid>
      </SafeAreaView>
    );
  }
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
  },
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
  goBackButton: {
    width: dimensions.width - 30,
    height: dimensions.height * 0.115,
    backgroundColor: colours.undoButton,
  },
});
