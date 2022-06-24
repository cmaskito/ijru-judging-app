//user chooses if they want to view scores or judge when the connect

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import AndroidSafeArea from "../assets/SafeArea";
import colours from "../assets/colours";
import CustomButton from "../components/CustomButton";
import BackButton from "../components/BackButton";
import { SearchBar } from "react-native-elements";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { getDocs, collection } from "firebase/firestore";
import dimensions from "../assets/Dimensions";

export default function ViewScores({ navigation, route }) {
  const { practice, tournamentId, tournamentName } = route.params;

  const [showNames, setShowNames] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredSkippersList, setFilteredSkippersList] = useState([]);
  const [skippersList, setSkippersList] = useState([]);

  const [selectedSkipper, setSelectedSkipper] = useState(null);
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
  };

  useEffect(() => {
    fetchSkipperDetails();
    setFilteredSkippersList(skippersList);
  }, []);

  const updateQuery = (input) => {
    console.log("input: ", input);

    const showList = input.length == 0 ? false : true;
    setShowNames(showList);

    setSearch(input);
    let query = input.toLowerCase().replace(/ /g, "");
    const filtered = skippersList.filter((skipper) => {
      const fullName = `${skipper.firstName.toLowerCase()}${skipper.lastName.toLowerCase()}`;
      return fullName.includes(query);
    });
    setFilteredSkippersList(filtered);
  };

  const onAutoFillNamePress = (skipper) => {
    console.log("clicked ", skipper);
    setSearch(`${skipper.firstName} ${skipper.lastName}`);
    setShowNames(false);
    setSelectedSkipper(skipper);
  };
  return (
    <TouchableWithoutFeedback onPressIn={() => Keyboard.dismiss()}>
      <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
        <BackButton />
        <View style={styles.container}>
          <Text style={styles.titleText}>VIEW SCORES</Text>
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
          <View style={styles.searchBarWrapper}>
            <Text style={styles.pickerLabelText}>SKIPPER NAME</Text>
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
            {showNames && (
              <View style={styles.flatListWrapper}>
                <FlatList
                  data={filteredSkippersList}
                  keyExtractor={(i) => i.id}
                  extraData={search}
                  // style={styles.flatList}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPressIn={() => onAutoFillNamePress(item)}
                        style={{
                          ...styles.flatListItemWrapper,
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
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
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
  pickerLabelText: {
    paddingLeft: 5,
    letterSpacing: 1.5,
    fontFamily: "Roboto_400Regular",
    fontSize: 14,
    marginBottom: 3,
  },
  pickerText: {
    fontSize: 14,
    fontFamily: "Roboto_400Regular",
    letterSpacing: 0.5,
  },
  searchBarWrapper: {
    marginTop: 50,
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
    width: dimensions.width * 0.85,
    borderRadius: 10,
    overflow: "hidden",
  },
});
