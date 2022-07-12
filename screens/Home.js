// This is the first screen that is loaded when the app is launched.
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import colours from "../assets/colours";
import AndroidSafeArea from "../assets/SafeArea";
import CustomButton from "../components/CustomButton";

export default function Home({ navigation }) {
  // These functions will be triggered when a button is pressed. They each navigate to a different screen.
  const onPressConnectButton = () => {
    navigation.navigate("Connect", { tournamentId: "" });
  };

  const onPressCreateButton = () => {
    navigation.navigate("CreateTournament");
  };

  return (
    <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
      <View style={styles.container}>
        <Text style={styles.titleText}>IJRU JUDGING</Text>
        <CustomButton
          text="CREATE TOURNAMENT"
          onPressHandler={onPressCreateButton}
        />
        <CustomButton
          text="CONNECT TO COMPETITION"
          onPressHandler={onPressConnectButton}
          style={{ marginTop: 60 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  titleText: {
    fontSize: 48,
    color: colours.textDark,
    fontFamily: "Roboto_700Bold",
    textAlign: "center",
    width: 290,
    alignSelf: "center",
    paddingTop: 80,
    marginBottom: 100,
    letterSpacing: 8,
  },
});
