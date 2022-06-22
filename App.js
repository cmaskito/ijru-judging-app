import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import colours from "./assets/colours";
import Home from "./screens/Home";
import AndroidSafeArea from "./assets/SafeArea";
import Connect from "./screens/Connect";
import JudgingType from "./screens/JudgingType";
import Difficulty from "./screens/Difficulty";
import PresentationForm from "./screens/PresentationForm";
import RequiredElements from "./screens/RequiredElements";
import CreateTournament from "./screens/CreateTournament";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";
import TournamentCreated from "./screens/TournamentCreated";
import JudgeOrView from "./screens/JudgeOrView";
import ScoreSummary from "./screens/ScoreSummary";
import ScoresSubmitted from "./screens/ScoresSubmitted";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Connect" component={Connect} />
        <Stack.Screen name="JudgingType" component={JudgingType} />
        <Stack.Screen name="Difficulty" component={Difficulty} />
        <Stack.Screen name="PresentationForm" component={PresentationForm} />
        <Stack.Screen name="RequiredElements" component={RequiredElements} />
        <Stack.Screen name="CreateTournament" component={CreateTournament} />
        <Stack.Screen name="TournamentCreated" component={TournamentCreated} />
        <Stack.Screen name="JudgeOrView" component={JudgeOrView} />
        <Stack.Screen name="ScoreSummary" component={ScoreSummary} />
        <Stack.Screen name="ScoresSubmitted" component={ScoresSubmitted} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
