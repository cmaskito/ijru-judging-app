// Screen shows confirmation that the scores have been submitted
import { StyleSheet, View, Text } from "react-native";
import AndroidSafeArea from "../assets/SafeArea";
import colours from "../assets/colours";
import CustomButton from "../components/CustomButton";
import dimensions from "../assets/Dimensions";

export default function ScoresSubmitted({ navigation, route }) {
  const { tournamentId } = route.params;

  return (
    <View style={AndroidSafeArea.AndroidSafeArea}>
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.titleText}>SCORES SUBMITTED</Text>
        {/* Return to homescreen button */}
        <CustomButton
          text="RETURN TO HOMESCREEN"
          touchableOpacityStyle={styles.touchableOpacityStyle}
          onPressHandler={() =>
            navigation.navigate("Connect", {
              tournamentId,
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
    paddingTop: 60,
    letterSpacing: 6,
  },

  touchableOpacityStyle: {
    marginTop: dimensions.height * 0.3,
  },
});
