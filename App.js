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
import Presentation from "./screens/Presentation";
import RequiredElements from "./screens/RequiredElements";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDdNAcu8hC_byZZiYNsr29IiO7W8qMhmbA",
  authDomain: "ijru-judging.firebaseapp.com",
  projectId: "ijru-judging",
  storageBucket: "ijru-judging.appspot.com",
  messagingSenderId: "913527365011",
  appId: "1:913527365011:web:ddf8317e770f0ba24f1c66",
  measurementId: "G-J5WWL2X9MD",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

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
        <Stack.Screen name="Presentation" component={Presentation} />
        <Stack.Screen name="RequiredElements" component={RequiredElements} />
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
