// Allows judges to choose what category / type they will be judging from the routine
// Also allows judges to select the skipper that they will be judging
// If the user access this page from the practice mode button, it will look different
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
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
  // State variables needed for dropdown picker
  const [judgingTypeOpen, setJudgingTypeOpen] = useState(false);
  const [judgingTypeValue, setJudgingTypeValue] = useState(null);
  const [judgingTypeItems, setJudgingTypeItems] = useState([
    { label: "Difficulty", value: "difficulty" },
    { label: "Athlete Presentation", value: "athletePresentation" },
    { label: "Required Elements", value: "requiredElements" },
    { label: "Routine Presentation", value: "routinePresentation" },
  ]);

  const [showNames, setShowNames] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredSkippersList, setFilteredSkippersList] = useState([]);
  const [skippersList, setSkippersList] = useState([]);

  const [selectedSkipper, setSelectedSkipper] = useState(null);

  const [incorrectId, setIncorrectId] = useState(false);

  const { practice, tournamentId, tournamentName } = route.params;

  const fetchSkipperDetails = async () => {
    // Fetches skipper details
    const allSkippers = await getDocs(
      collection(db, `tournaments/${tournamentId}/skippers`)
    );

    // Saves skipper details in a state variable
    allSkippers.forEach((skipper) => {
      setSkippersList((prevState) => [
        ...prevState,
        { ...skipper.data(), id: skipper.id },
      ]);
    });
  };

  // runs as soon as the screen is loaded
  useEffect(() => {
    fetchSkipperDetails();
    setFilteredSkippersList(skippersList);
  }, []);

  // Runs each time the search bar 'query' is updated
  const updateQuery = (input) => {
    setSearch(input);
    const showList = input.length == 0 ? false : true; // checks if there is a query in the search bar
    setShowNames(showList);
    let query = input.toLowerCase().replace(/ /g, "");

    // Creates a filtered list of skippers that fit the query and displays them under the search bar
    const filtered = skippersList.filter((skipper) => {
      const fullName = `${skipper.firstName.toLowerCase()}${skipper.lastName.toLowerCase()}`;
      return fullName.includes(query);
    });
    setFilteredSkippersList(filtered);
  };

  // Triggers when the user presses start judging button
  const startJudgingPress = () => {
    setSelectedSkipper(null);
    const query = search.toLowerCase().replace(/ /g, "");
    let foundSkipper = false;
    console.log(query);

    // Loops thorugh each skipper to check if the query matches a name
    // If it finds a matching name, it selects it as the selected skipper
    skippersList.forEach((skipper) => {
      if (
        `${skipper.firstName.toLowerCase()}${skipper.lastName.toLowerCase()}` ==
        query
      ) {
        console.log(skipper);
        setSelectedSkipper(skipper);
        foundSkipper = true;
      }
    });
    if (!foundSkipper) {
      setIncorrectId(true); // if a skipper is not found, an error message is created
      return;
    }
  };

  // Whenever a selected skipper is selected (which only happens when the user presses the start judging button)
  // Then the user will be taken to the screen that coreesponds to their selected judging type
  useEffect(() => {
    if (selectedSkipper !== null) {
      setSelectedSkipper(null);
      setIncorrectId(false);
      switch (judgingTypeValue) {
        case "difficulty":
          console.log(selectedSkipper);
          navigation.navigate("Difficulty", {
            practice,
            skipper: selectedSkipper,
            tournamentName,
            tournamentId,
          });
          break;
        case "athletePresentation":
          navigation.navigate("AthletePresentation", {
            practice,
            skipper: selectedSkipper,
            tournamentName,
            tournamentId,
          });
          break;
        case "requiredElements":
          navigation.navigate("RequiredElements", {
            practice,
            skipper: selectedSkipper,
            tournamentName,
            tournamentId,
          });
          break;
        case "routinePresentation":
          navigation.navigate("RoutinePresentation", {
            practice,
            skipper: selectedSkipper,
            tournamentName,
            tournamentId,
          });
        default:
          break;
      }
    }
  }, [selectedSkipper]);

  // Runs when the user presses the name that appears when they type into the search bar
  // Autofills the search bar with the name selected
  const onAutoFillNamePress = (skipper) => {
    setSearch(`${skipper.firstName} ${skipper.lastName}`);
    setShowNames(false);
  };

  if (practice === true) {
    // This if statement changes what is rendered depending on whether is is a practice session or real session.
    return (
      <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
        <BackButton />
        <View style={styles.container}>
          {/* Title */}
          <Text style={styles.titleText}>{"JUDGING\nTYPE"}</Text>
          {/* Dropdown picker */}
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
          {/* Start Judging button */}
          <CustomButton
            style={{ marginTop: 190 }}
            text="START JUDGING"
            onPressHandler={() => startJudgingPress(judgingTypeValue)}
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
            {/* title */}
            <Text style={styles.titleText}>{"JUDGING\nTYPE"}</Text>
            {/* Search Bar */}
            <View style={styles.searchBarWrapper}>
              <Text style={styles.pickerLabelText}>SKIPPER NAME</Text>
              <SearchBar
                value={search}
                onChangeText={updateQuery}
                placeholder="SKIPPER NAME"
                round={true}
                lightTheme
                containerStyle={styles.searchBarContainerStyle}
                inputContainerStyle={styles.searchBarInputContainerStyle}
                placeholderTextColor={colours.placeholderText}
                placeholderStyle={styles.pickerText}
                inputStyle={{ ...styles.pickerText, color: colours.textDark }}
              />
            </View>
            {/* List of names under search bar */}
            {showNames && (
              <View style={styles.flatListWrapper}>
                <FlatList
                  data={filteredSkippersList}
                  keyExtractor={(i) => i.id}
                  extraData={search}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPressIn={() => onAutoFillNamePress(item)}
                        style={{
                          ...styles.flatListItemWrapper,
                          flex: 1,
                        }}
                      >
                        <Text
                          style={styles.flatListText}
                        >{`${item.firstName} ${item.lastName}`}</Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            )}
            {/* Dropdown picker */}
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
            {/* Error Message */}
            {incorrectId && (
              <Text style={styles.errorLabel}>
                THE FIELDS ARE NOT PROPERLY COMPLETED
              </Text>
            )}
            {/* Start Judging button */}
            <CustomButton
              style={{ marginTop: 170 }}
              text="START JUDGING"
              onPressHandler={() => startJudgingPress()}
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
  flatListText: {
    fontSize: 14,
    fontFamily: "Roboto_400Regular",
    letterSpacing: 0.5,
  },
  flatListItemWrapper: {
    paddingVertical: 10,
    paddingLeft: 10,
    backgroundColor: colours.lighterGrey,
  },
  flatListWrapper: {
    width: "85%",
    borderRadius: 10,
    overflow: "hidden",
  },
  searchBarWrapper: {
    marginTop: 50,
  },
  errorLabel: {
    paddingLeft: 5,
    letterSpacing: 1.5,
    fontFamily: "Roboto_400Regular",
    fontSize: 14,
    color: "red",
    marginBottom: -14,
  },
  searchBarContainerStyle: {
    backgroundColor: "white",
    borderColor: "white",
    width: dimensions.width * 0.85,
    padding: 0,
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
  },
  searchBarInputContainerStyle: {
    backgroundColor: colours.lightGrey,
    padding: 0,
    borderWidth: 0,
    height: 50,
  },
});
