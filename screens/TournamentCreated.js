import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import AndroidSafeArea from "../assets/SafeArea";
import colours from "../assets/colours";
import BackButton from "../components/BackButton";
import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import CustomButton from "../components/CustomButton";

export default function TournamentCreated({ navigation, route }) {
  const { tournamentName, tournamentId } = route.params;

  return (
    <View style={AndroidSafeArea.AndroidSafeArea}>
      <Text style={styles.titleText}>TOURNAMENT CREATED</Text>
      <Text style={styles.tournamentDetailsTitle}>TOURNAMENT DETAILS</Text>
      <View style={styles.tournamentDetailsWrapper}>
        <Text
          style={styles.tournamentDetailsText}
          selectable
        >{`Tournament Name: ${tournamentName}`}</Text>
        <Text
          style={styles.tournamentDetailsText}
          selectable
        >{`Tournament ID: ${tournamentId}`}</Text>
      </View>
      <CustomButton
        style={styles.returnButton}
        text="RETURN TO HOME"
        onPressHandler={() => navigation.navigate("Home")}
      />
    </View>
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
    paddingTop: 85,
    letterSpacing: 6,
  },
  tournamentDetailsTitle: {
    fontSize: 22,
    fontFamily: "Roboto_700Bold",
    letterSpacing: 4,
    marginTop: 40,
    marginLeft: 20,
  },
  tournamentDetailsWrapper: {
    marginTop: 15,
    marginLeft: 40,
  },
  tournamentDetailsText: {
    fontSize: 18,
    fontFamily: "Roboto_400Regular",
    letterSpacing: 1,
    marginBottom: 10,
  },
  returnButton: {
    alignSelf: "center",
    marginTop: 200,
  },
});
