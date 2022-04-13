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
import colours from "../assets/colours";
import AndroidSafeArea from "../assets/SafeArea";
import BackButton from "../components/BackButton";
import GreyTextInput from "../components/GreyTextInput";

export default function Connect({ navigation, route }) {
  return (
    <TouchableWithoutFeedback
      onPressIn={() => Keyboard.dismiss()}
      style={{ color: "red" }}
    >
      <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
        <BackButton />
        <View style={styles.container}>
          <Text style={styles.titleText}>CONNECT TO COMPETITION</Text>
          <GreyTextInput
            wrapperStyle={{ marginTop: 150 }}
            placeholder={"TOURNAMENT ID"}
            label={"TOURNAMENT ID"}
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
    paddingTop: 80,
    letterSpacing: 6,
  },
});
