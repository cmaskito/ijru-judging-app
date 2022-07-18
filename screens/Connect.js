// This screen allows the user to type in a tournament ID and connect to a tournament.
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";
import colours from "../assets/colours";
import AndroidSafeArea from "../assets/SafeArea";
import BackButton from "../components/BackButton";
import CustomButton from "../components/CustomButton";
import GreyTextInput from "../components/GreyTextInput";
import { db } from "../firebase-config";
import { getDoc, doc } from "firebase/firestore";
import { useEffect } from "react";

export default function Connect({ navigation, route }) {
  const [userInput, setUserInput] = useState("");
  const [incorrectId, setIncorrectId] = useState(false);

  const { tournamentId } = route.params;

  // If the user is sent to this screen from the end of the submit scores screen, then the tournament ID will be autofilled with this function
  useEffect(() => {
    setUserInput[tournamentId];
  }, []);

  // Triggers when the connect button is pressed.
  // Checks if the tournament ID that is entered actually exists in the database
  // If it does, the user is sent to the "JudgeOrView" screen
  // If not, then an error message will be given stating "THAT TOURNAMENT DOES NOT EXIST"
  const onConnectButtonPress = async () => {
    try {
      const tournamentDoc = await getDoc(doc(db, "tournaments", userInput)); // Tries to fetch a tournament document that matches the tournment id
      if (tournamentDoc.data() === undefined) {
        // If false show an error message
        setIncorrectId(true);
      } else {
        // if true, move to the judge or view screen
        console.log(tournamentDoc.data());
        setIncorrectId(false);
        navigation.navigate("JudgeOrView", tournamentDoc.data());
      }
    } catch (error) {
      console.log("error:", error);
      setIncorrectId(true);
    }
  };

  return (
    <TouchableWithoutFeedback onPressIn={() => Keyboard.dismiss()}>
      <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
        <BackButton />
        <View style={styles.container}>
          {/* Title */}
          <Text style={styles.titleText}>CONNECT TO COMPETITION</Text>
          {/* Text Input */}
          <GreyTextInput
            wrapperStyle={{ marginTop: 150 }}
            placeholder={"TOURNAMENT ID"}
            label={"TOURNAMENT ID"}
            onChangeText={(value) => setUserInput(value)}
          />
          {/* Error Message */}
          {incorrectId && (
            <Text style={styles.errorLabel}>
              THAT TOURNAMENT DOES NOT EXIST
            </Text>
          )}
          {/* Connect Button */}
          <CustomButton
            touchableOpacityStyle={styles.connectButton}
            text="CONNECT"
            onPressHandler={() => onConnectButtonPress(userInput)}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
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
  connectButton: {
    alignSelf: "center",
    marginTop: 150,
  },
  errorLabel: {
    paddingLeft: 5,
    letterSpacing: 1.5,
    fontFamily: "Roboto_400Regular",
    fontSize: 14,
    color: "red",
    marginBottom: -14,
  },
});
