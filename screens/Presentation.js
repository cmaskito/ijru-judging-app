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
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

export default function Presentation({ navigation }) {
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

  const onJudgingButtonPress = (counter) => {
    console.log(counter);
    Vibration.vibrate(70);
    const newCounter = { ...counter[0], counter: counter[0].counter + 1 };
    counter[1](newCounter);
    setSelectedButton(counter[0].title);
  };

  let hasUnsavedChanges = true;

  const skippersColRef = collection(db, "skippers");

  let skippers = [];

  // Makes an alert pop up if the user tries to leave the screen with unsaved changes
  useEffect(() => {
    const getSkippers = async () => {
      const data = await getDocs(skippersColRef);
      skippers.push(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(skippers[0][0].firstName);
    };
    getSkippers();

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
        judgingType="Presentation"
        skipperName={() => console.log(skippers)}
      />

      {/* Red Buttons */}
      <RedButtons
        navigation={navigation}
        countersToReset={counters}
        setSelectedButton={setSelectedButton}
      />

      {/* Counters */}

      <Grid style={styles.countersButtonsWrapper}>
        {counters.map((counter, index) => {
          if (counter[0].title === "Mistakes") return;
          return (
            <Row key={nextId()} size={26.5}>
              <Col>
                {
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
                    }}
                    text={`${counter[0].title}\n${counter[0].counter}`}
                    textStyle={styles.buttonText}
                    onPressHandler={() => onJudgingButtonPress(counter)}
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
