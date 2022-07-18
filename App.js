// This 'screen' is what is first loaded when the app launches. It holds the stack navigator and loads the fonts, but doesn't directly display elements to the screen.
// It 'connects' all the screens together

import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
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
import Home from "./screens/Home";
import Connect from "./screens/Connect";
import JudgingType from "./screens/JudgingType";
import Difficulty from "./screens/Difficulty";
import AthletePresentation from "./screens/AthletePresentation";
import RequiredElements from "./screens/RequiredElements";
import TournamentCreated from "./screens/TournamentCreated";
import JudgeOrView from "./screens/JudgeOrView";
import ScoreSummary from "./screens/ScoreSummary";
import ScoresSubmitted from "./screens/ScoresSubmitted";
import SelectSkipperToView from "./screens/SelectSkipperToView";
import ViewScores from "./screens/ViewScores";
import CreateTournament from "./screens/CreateTournament";
import RoutinePresentation from "./screens/RoutinePresentation";

const Stack = createStackNavigator();

export default function App() {
  // imports Roboto fonts
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
        <Stack.Screen
          name="AthletePresentation"
          component={AthletePresentation}
        />
        <Stack.Screen name="RequiredElements" component={RequiredElements} />
        <Stack.Screen name="CreateTournament" component={CreateTournament} />
        <Stack.Screen name="TournamentCreated" component={TournamentCreated} />
        <Stack.Screen name="JudgeOrView" component={JudgeOrView} />
        <Stack.Screen name="ScoreSummary" component={ScoreSummary} />
        <Stack.Screen name="ScoresSubmitted" component={ScoresSubmitted} />
        <Stack.Screen
          name="SelectSkipperToView"
          component={SelectSkipperToView}
        />
        <Stack.Screen name="ViewScores" component={ViewScores} />
        <Stack.Screen
          name="RoutinePresentation"
          component={RoutinePresentation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
