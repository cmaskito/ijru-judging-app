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
import { query, where, collection, getDocs } from "firebase/firestore";

export default function Connect({ navigation, route }) {
  const [userInput, setUserInput] = useState("");

  const onConnectButtonPress = async () => {
    console.log("press");
    const tournamentsColRef = collection(db, "tournaments");
    const q = query(
      tournamentsColRef,
      where("tournamentId", "==", parseInt(userInput))
    );
    console.log(userInput, typeof parseInt(userInput));
    try {
      const tournamentDocs = await getDocs(q);
      tournamentDocs.forEach((doc) => console.log(doc.data()));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TouchableWithoutFeedback onPressIn={() => Keyboard.dismiss()}>
      <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
        <BackButton />
        <View style={styles.container}>
          <Text style={styles.titleText}>CONNECT TO COMPETITION</Text>
          <GreyTextInput
            wrapperStyle={{ marginTop: 150 }}
            placeholder={"TOURNAMENT ID"}
            label={"TOURNAMENT ID"}
            onChangeText={(value) => setUserInput(value)}
          />
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
});
