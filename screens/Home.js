import { Roboto_700Bold } from "@expo-google-fonts/roboto";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import colours from "../assets/colours";
import AndroidSafeArea from "../assets/SafeArea";
import CustomButton from "../components/CustomButton";

export default function Home({ navigation }) {
  const onPressConnectButton = () => {
    navigation.navigate("Connect");
  };

  const onPressPracticeButton = () => {
    navigation.navigate("JudgingType");
  };

  return (
    <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
      <View style={styles.container}>
        <Text style={styles.titleText}>IJRU JUDGING</Text>
        <CustomButton
          text="CONNECT TO COMPETITION"
          onPressHandler={onPressConnectButton}
        />
        <CustomButton
          text={"PRACTICE\nJUDGING"}
          style={{ marginTop: 60 }}
          onPressHandler={onPressPracticeButton}
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
    marginBottom: 130,
    letterSpacing: 8,
  },
});
