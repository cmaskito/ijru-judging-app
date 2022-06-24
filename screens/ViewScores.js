import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import colours from "../assets/colours";
import AndroidSafeArea from "../assets/SafeArea";
import CustomButton from "../components/CustomButton";
import BackButton from "../components/BackButton";

export default function ViewScores({ navigation, route }) {
  const { tournamentId, tournamentName, skipper } = route.params;
  return (
    <View style={AndroidSafeArea.AndroidSafeArea}>
      <BackButton />
      <View style={styles.container}>
        <Text style={styles.titleText}>CONNECT TO TOURNAMENT</Text>
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
          text="JUDGE"
          touchableOpacityStyle={styles.touchableOpacityStyle}
          onPressHandler={() =>
            navigation.navigate("JudgingType", {
              practice,
              tournamentId,
              tournamentName,
            })
          }
        />
        <CustomButton
          text="VIEW SCORES"
          touchableOpacityStyle={styles.touchableOpacityStyle}
          onPressHandler={() =>
            navigation.navigate("SelectSkipperToView", {
              practice,
              tournamentId,
              tournamentName,
            })
          }
        />
      </View>
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
    paddingTop: 20,
    letterSpacing: 6,
  },
  tournamentDetailsWrapper: {
    marginTop: 20,
    alignSelf: "center",
  },
  tournamentDetailsText: {
    fontSize: 18,
    fontFamily: "Roboto_400Regular",
    letterSpacing: 1,
    marginBottom: 10,
  },
  touchableOpacityStyle: {
    marginTop: 100,
  },
});
