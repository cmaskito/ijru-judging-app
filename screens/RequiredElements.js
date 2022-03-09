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
import RedButtons from "../components/RedButtons";
import UndoButton from "../components/UndoButton";
import { Col, Row, Grid } from "react-native-easy-grid";
import CounterButton from "../components/CounterButton";

export default function RequiredElements({ navigation }) {
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
    ([mistakes, setMistakes] = useState({
      title: "Mistakes",
      counter: 0,
    })),
    ([timeViolations, setTimeViolations] = useState({
      title: "Time Violations",
      counter: 0,
    })),
    ([wrapsReleases, setWrapsReleases] = useState({
      title: "Wraps / Releases",
      counter: 0,
    })),
  ];

  const [selectedButton, setSelectedButton] = useState(null);

  let hasUnsavedChanges = true;

  // Makes an alert pop up if the user tries to leave the screen with unsaved changes
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      if (!hasUnsavedChanges) return;

      e.preventDefault();
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
    });
  }, [navigation]);

  return (
    <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
      {/* Header */}
      <Header
        eventName="Event Name"
        bracket="Bracket"
        judgingType="Elements"
        skipperName="Skipper Name"
      />

      {/* Red Buttons */}
      <RedButtons
        countersToReset={counters}
        navigation={navigation}
        setSelectedButton={setSelectedButton}
      />

      {/* Counter Grid */}
      <Grid style={styles.countersButtonsWrapper}>
        <Row size={26.5}>
          {counters.slice(0, 1).map((counter, index) => (
            <Col key={nextId()}>
              <CounterButton
                selectedButton={selectedButton}
                counter={counter}
                index={index}
                setSelectedButton={setSelectedButton}
                style={{ alignSelf: "center" }}
              />
            </Col>
          ))}
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
            />
          }
        </Row>
      </Grid>
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
  countersButtonsWrapper: {
    marginTop: 16,
    marginHorizontal: 15,
    marginBottom: 0,
    paddingBottom: 0,
  },
});