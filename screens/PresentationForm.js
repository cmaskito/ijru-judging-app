import { Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Vibration,
  Alert,
  BackHandler,
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

export default function PresentationForm({ navigation, route }) {
  const counters = [
    ([plusCounter, setPlusCounter] = useState({
      title: "+",
      counter: 0,
    })),
    ([tickCounter, setTickCounter] = useState({
      title: "✓",
      counter: 0,
    })),
    ([minusCounter, setMinusCounter] = useState({
      title: "-",
      counter: 0,
    })),
    ([mistakeCounter, setMistakeCounter] = useState({
      title: "Mistakes",
      counter: 0,
    })),
  ];

  const [selectedButton, setSelectedButton] = useState(null);
  const { practice, skipper, tournamentName, tournamentId } = route.params;

  // Makes an alert pop up if the user tries to leave the screen
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

  const onJudgingButtonPress = (counter) => {
    Vibration.vibrate(70);
    const newCounter = { ...counter[0], counter: counter[0].counter + 1 };
    counter[1](newCounter);
    setSelectedButton(counter[0].title);
  };

  return (
    <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
      {/* Header */}
      <Header
        eventName="Event Name"
        bracket="Bracket"
        judgingType="Presentation Form"
        skipperName={
          practice ? "Practice" : `${skipper.firstName} ${skipper.lastName}`
        }
      />

      {/* Red Buttons */}
      <RedButtons
        navigation={navigation}
        counters={counters}
        setSelectedButton={setSelectedButton}
        practice={practice}
        eventDetails={{
          tournamentName: tournamentName,
          judgingType: "Presentation Form",
          skipper: skipper,
          tournamentId: tournamentId,
        }}
      />

      {/* Counters */}

      <Grid style={styles.countersButtonsWrapper}>
        {counters.map((counter, index) => {
          if (counter[0].title === "Mistakes") return;
          return (
            <Row key={nextId()} size={26.5}>
              <Col>
                {
                  <CounterButton
                    selectedButton={selectedButton}
                    counter={counter}
                    index={index}
                    setSelectedButton={setSelectedButton}
                    style={{ alignSelf: "flex-start" }}
                  />
                }
              </Col>
              <Col></Col>
              <Col>
                {index === 2 ? (
                  <CounterButton
                    selectedButton={selectedButton}
                    counter={counters[3]}
                    index={index}
                    setSelectedButton={setSelectedButton}
                  />
                ) : null}
              </Col>
            </Row>
          );
        })}
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
  counterButton: {
    width: dimensions.width * 0.29,
    height: dimensions.height * 0.2,
    marginBottom: 8,
    borderRadius: 9,
  },
});
