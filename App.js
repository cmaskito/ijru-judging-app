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
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";

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

  const skippersColRef = collection(db, "skippers");

  // useEffect(() => {
  //   const getSkippers = async () => {
  //     const data = await getDocs(skippersColRef);
  //     console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };
  //   getSkippers();
  // }, []);

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
