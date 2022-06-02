import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import colours from "../assets/colours";
import AndroidSafeArea from "../assets/SafeArea";
import { SearchBar } from "react-native-elements";

import { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import CustomButton from "../components/CustomButton";
import BackButton from "../components/BackButton";
import { db } from "../firebase-config";
import { getDocs, collection } from "firebase/firestore";
import dimensions from "../assets/Dimensions";
import { FlatList } from "react-native-gesture-handler";

export default function JudgingType({ navigation, route }) {
  const [judgingTypeOpen, setJudgingTypeOpen] = useState(false);
  const [judgingTypeValue, setJudgingTypeValue] = useState(null);
  const [judgingTypeItems, setJudgingTypeItems] = useState([
    { label: "Difficulty", value: "difficulty" },
    { label: "Presentation", value: "presentation" },
    { label: "Required Elements", value: "requiredElements" },
  ]);
  const [eventOpen, setEventOpen] = useState(false);
  const [eventValue, setEventValue] = useState(null);
  const [eventItems, setEventItems] = useState([
    { label: "30s Speed", value: "30s" },
    { label: "3min Speed", value: "3min" },
    { label: "Individual Freestyle", value: "freestyle" },
  ]);

  const [search, setSearch] = useState("");

  const [skippersList, setSkippersList] = useState([]);

  const { practice, tournamentId } = route.params;

  const fetchSkipperDetails = async () => {
    const allSkippers = await getDocs(
      collection(db, `tournaments/${tournamentId}/skippers`)
    );

    allSkippers.forEach((skipper) => {
      setSkippersList((prevState) => [
        ...prevState,
        { ...skipper.data(), id: skipper.id },
      ]);
    });
    console.log(skippersList);
  };

  useEffect(() => {
    fetchSkipperDetails();
  }, []);

  const updateQuery = (input) => {
    setSearch(input);
  };

  const filterNames = (skipperName) => {
    let query = search.toLowerCase().replace(/ /g, "_");

    if (skipperName.startsWith(query)) {
      return skipperName;
    } else {
    }
  };

  const onPressHandler = (value) => {
    switch (value) {
      case "difficulty":
        navigation.navigate("Difficulty", { practice });
        break;
      case "presentation":
        navigation.navigate("Presentation", { practice });
        break;
      case "requiredElements":
        navigation.navigate("RequiredElements", { practice });
        break;
      default:
        break;
    }
  };
  if (practice === true) {
    return (
      <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
        <BackButton />
        <View style={styles.container}>
          <Text style={styles.titleText}>{"JUDGING\nTYPE"}</Text>
          <View style={styles.pickerWrapper}>
            <Text style={styles.pickerLabelText}>JUDGING TYPE</Text>
            <DropDownPicker
              style={styles.picker}
              textStyle={styles.pickerText}
              labelStyle={styles.pickerText}
              open={judgingTypeOpen}
              value={judgingTypeValue}
              items={judgingTypeItems}
              setOpen={setJudgingTypeOpen}
              setValue={setJudgingTypeValue}
              setItems={setJudgingTypeItems}
              placeholder="SELECT JUDGING TYPE"
              placeholderStyle={styles.pickerText}
              dropDownContainerStyle={{
                backgroundColor: "#fafafa",
                borderWidth: 0,
              }}
            />
          </View>
          <CustomButton
            style={{ marginTop: 190 }}
            text="START JUDGING"
            onPressHandler={() => onPressHandler(value)}
          />
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <TouchableWithoutFeedback onPressIn={() => Keyboard.dismiss()}>
        <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
          <BackButton />

          <View style={styles.container}>
            <Text style={styles.titleText}>{"JUDGING\nTYPE"}</Text>
            <SearchBar
              value={search}
              onChangeText={updateQuery}
              placeholder="SKIPPER NAME"
              round={true}
              lightTheme
              containerStyle={{
                backgroundColor: "white",
                borderColor: "white",
                width: dimensions.width * 0.85,
                padding: 0,
                borderBottomColor: "transparent",
                borderTopColor: "transparent",
                marginTop: 50,
              }}
              inputContainerStyle={{
                backgroundColor: colours.lightGrey,
                padding: 0,
                borderWidth: 0,
                height: 50,
              }}
              placeholderTextColor={colours.placeholderText}
              placeholderStyle={styles.pickerText}
              inputStyle={{ ...styles.pickerText, color: colours.textDark }}
            />
            <FlatList
              data={skippersList}
              keyExtractor={(i) => i.id}
              extraData={search}
              renderItem={({ item }) => {
                return <Text>{`${item.firstName} ${item.lastName}`}</Text>;
              }}
            />
            <View style={styles.pickerWrapper}>
              <Text style={styles.pickerLabelText}>EVENT</Text>
              <DropDownPicker
                style={styles.picker}
                textStyle={styles.pickerText}
                labelStyle={styles.pickerText}
                open={eventOpen}
                value={eventValue}
                items={eventItems}
                setOpen={setEventOpen}
                setValue={setEventValue}
                setItems={setEventItems}
                placeholder="SELECT EVENT"
                placeholderStyle={styles.pickerText}
                dropDownContainerStyle={{
                  backgroundColor: "#fafafa",
                  borderWidth: 0,
                }}
                maxHeight={70}
              />
            </View>
            <View style={styles.pickerWrapper}>
              <Text style={styles.pickerLabelText}>JUDGING TYPE</Text>
              <DropDownPicker
                style={styles.picker}
                textStyle={styles.pickerText}
                labelStyle={styles.pickerText}
                open={judgingTypeOpen}
                value={judgingTypeValue}
                items={judgingTypeItems}
                setOpen={setJudgingTypeOpen}
                setValue={setJudgingTypeValue}
                setItems={setJudgingTypeItems}
                placeholder="SELECT JUDGING TYPE"
                placeholderStyle={styles.pickerText}
                dropDownContainerStyle={{
                  backgroundColor: "#fafafa",
                  borderWidth: 0,
                }}
                maxHeight={70}
              />
            </View>
            <CustomButton
              style={{ marginTop: 50 }}
              text="START JUDGING"
              onPressHandler={() => onPressHandler(value)}
            />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  titleText: {
    fontFamily: "Roboto_700Bold",
    fontSize: 36,
    textAlign: "center",
    letterSpacing: 6,
    color: colours.textDark,
    paddingTop: 20,
  },
  pickerWrapper: {
    width: "85%",
    marginTop: 50,
  },
  picker: {
    backgroundColor: colours.lightGrey,
    borderWidth: 0,
    borderRadius: 15,
    height: 50,
    color: "red",
  },
  pickerText: {
    fontSize: 14,
    fontFamily: "Roboto_400Regular",
    letterSpacing: 0.5,
  },
  pickerLabelText: {
    paddingLeft: 5,
    letterSpacing: 1.5,
    fontFamily: "Roboto_400Regular",
    fontSize: 14,
    marginBottom: 3,
  },
});
