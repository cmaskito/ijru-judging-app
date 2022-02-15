import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import colours from "../assets/colours";
import AndroidSafeArea from "../assets/SafeArea";

export default function Connect() {
  return (
    <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
      <Text>Connect Screen</Text>
    </SafeAreaView>
  );
}
