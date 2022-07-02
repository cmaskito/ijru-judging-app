// This screen provides the user with confirmation taht the tournament was created, and the details of the tournament
import { StyleSheet, View, Text } from "react-native";
import AndroidSafeArea from "../assets/SafeArea";
import colours from "../assets/colours";
import CustomButton from "../components/CustomButton";

export default function TournamentCreated({ navigation, route }) {
  const { tournamentName, tournamentId } = route.params;

  return (
    <View style={AndroidSafeArea.AndroidSafeArea}>
      {/* Title */}
      <Text style={styles.titleText}>TOURNAMENT CREATED</Text>
      <Text style={styles.tournamentDetailsTitle}>TOURNAMENT DETAILS</Text>
      {/* Tournament Details */}
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
      {/* Return to home button */}
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
