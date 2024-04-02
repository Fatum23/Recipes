import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainScreen from "./screens/MainScreen/MainScreen";
import AddRecipeScreen from "./screens/AddRecipeScreen/AddRecipeScreen";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

function App() {
  const [fontsLoaded] = useFonts({
    "Gilroy-Medium": require("./global/assets/fonts/Gilroy-Medium.ttf"),
    "Montserrat-Medium": require("./global/assets/fonts/Montserrat-Medium.ttf"),
  });
  if (fontsLoaded) {
    SplashScreen.hideAsync();
  } else {
    return;
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="white" style="dark" />
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddRecipe"
          component={AddRecipeScreen}
          options={{
            headerShown: false,
            animation: "slide_from_bottom",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default registerRootComponent(App);
