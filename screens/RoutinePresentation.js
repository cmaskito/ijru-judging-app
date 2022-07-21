// PresentationForm Juding Screen
import {
  StyleSheet,
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

export default function RoutinePresentation({ navigation, route }) {
  const counters = [
    ([entPlusCounter, setEntPlusCounter] = useState({
      title: "Entertainment +",
      counter: 0,
    })),
    ([entTickCounter, setEntTickCounter] = useState({
      title: "Entertainment ✓",
      counter: 0,
    })),
    ([entMinusCounter, setEntMinusCounter] = useState({
      title: "Entertainment -",
      counter: 0,
    })),
    ([musPlusCounter, setMusPlusCounter] = useState({
      title: "Musicality +",
      counter: 0,
    })),
    ([musTickCounter, setMusTickCounter] = useState({
      title: "Musicality ✓",
      counter: 0,
    })),
    ([musMinusCounter, setMusMinusCounter] = useState({
      title: "Musicality -",
      counter: 0,
    })),
  ];

  const [selectedButton, setSelectedButton] = useState(null);
  const { skipper, tournamentName, tournamentId } = route.params;

  // Makes an alert pop up if the user tries to leave the screen with android hardware back button
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

  return (
    <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
      {/* Header */}
      <Header
        eventName="Event Name"
        bracket="Bracket"
        judgingType="Routine Presentation"
        skipperName={`${skipper.firstName} ${skipper.lastName}`}
      />

      {/* Red Buttons */}
      <RedButtons
        navigation={navigation}
        counters={counters}
        setSelectedButton={setSelectedButton}
        eventDetails={{
          tournamentName: tournamentName,
          judgingType: "Routine Presentation",
          skipper: skipper,
          tournamentId: tournamentId,
        }}
      />
      {/* Counters */}
      {/* Uses a Grid package to layout the buttons */}
      <Grid style={styles.countersButtonsWrapper}>
        {counters.slice(0, 3).map((counter, index) => {
          return (
            <Row key={nextId()} size={26.5}>
              <Col>
                {counter[0].title.includes("Entertainment") && (
                  <CounterButton
                    selectedButton={selectedButton}
                    counter={counter}
                    index={index}
                    setSelectedButton={setSelectedButton}
                    style={{ alignSelf: "flex-start" }}
                  />
                )}
              </Col>
              <Col></Col>
              <Col>
                {counters[index + 3][0].title.includes("Musicality") && (
                  <CounterButton
                    selectedButton={selectedButton}
                    counter={counters[index + 3]}
                    index={index + 3}
                    setSelectedButton={setSelectedButton}
                    style={{ alignSelf: "flex-end" }}
                  />
                )}
              </Col>
            </Row>
          );
        })}
        <Row size={20.5}>
          <UndoButton
            counters={counters}
            selectedButton={selectedButton}
            setSelectedButton={setSelectedButton}
            testProp={"test"}
          />
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
  subheadingWrapper: {
    alignSelf: "center",
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 14,
    marginBottom: -15,
  },
  subheadingText: {
    fontFamily: "Roboto_300Light",
    fontSize: 18,
    width: 115,
    textAlign: "center",
  },
});
