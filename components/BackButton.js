import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ChevronLeft } from "react-native-feather";
import colours from "../assets/colours";
import { useNavigation } from "@react-navigation/native";

export default function BackButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.backButtonWrapper}
      onPress={() => navigation.goBack()}
    >
      <View>
        <ChevronLeft width={30} height={60} color={colours.textDark} />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  backButtonWrapper: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderColor: colours.button,
    backgroundColor: colours.button,
    marginLeft: 20,
    marginTop: 25,
  },
});
