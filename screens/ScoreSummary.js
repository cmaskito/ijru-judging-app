import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import colours from "../assets/colours";
import AndroidSafeArea from "../assets/SafeArea";

import { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import CustomButton from "../components/CustomButton";
import BackButton from "../components/BackButton";
import { db } from "../firebase-config";
import { getDocs, collection } from "firebase/firestore";
import dimensions from "../assets/Dimensions";
import { Edit3 } from "react-native-feather";
import { Roboto_400Regular } from "@expo-google-fonts/roboto";

export default function ScoreSummary({ route }) {
  const { practice, counters } = route.params;

  return (
    <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
      <BackButton />
      <FlatList
        ListHeaderComponent={
          <View style={styles.container}>
            <Text style={styles.titleText}>SCORE SUMMARY</Text>

            <View style={styles.subHeadingWrapper}>
              <Text style={styles.subHeading}>EVENT DETAILS</Text>
              <Edit3
                stroke={colours.textDark}
                height={24}
                style={{ marginLeft: 30 }}
              />
            </View>
            <View style={styles.listWrapper}>
              <Text style={styles.listText}>EVENT NAME</Text>
              <Text style={styles.listText}>EVENT NAME</Text>
              <Text style={styles.listText}>EVENT NAME</Text>
              <Text style={styles.listText}>EVENT NAME</Text>
            </View>
            <View style={styles.subHeadingWrapper}>
              <Text style={styles.subHeading}>SCORES</Text>
              <Edit3
                stroke={colours.textDark}
                height={24}
                style={{ marginLeft: 30 }}
              />
            </View>
          </View>
        }
        ListFooterComponent={
          <CustomButton
            touchableOpacityStyle={styles.connectButton}
            text="CONNECT"
            onPressHandler={() => onConnectButtonPress(userInput)}
          />
        }
        scrollEnabled
        data={counters}
        keyExtractor={(item) => item.title}
        renderItem={(item) => {
          console.log(item);
          return (
            <Text
              style={{ ...styles.listText, marginLeft: 40 }}
            >{`${item.item.title}: ${item.item.counter}`}</Text>
          );
        }}
      />
    </SafeAreaView>
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
    marginVertical: 30,
  },
  subHeadingWrapper: {
    marginTop: 40,
    alignSelf: "flex-start",
    marginLeft: 25,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  subHeading: {
    fontFamily: "Roboto_700Bold",
    fontSize: 22,
    letterSpacing: 4,
  },
  listWrapper: {
    marginTop: 10,
    width: "100%",
    paddingHorizontal: 40,
  },
  listText: {
    marginTop: 10,
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
  },
});
