import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";

import MainScreen from "./screens/MainScreen/MainScreen";
import AddRecipeScreen from "./screens/AddRecipeScreen/AddRecipeScreen";
import FiltersScreen from "./screens/FiltersScreen/FiltersScreen";
import { StackParamList } from "./global/types/gTypes";

import { Alert, Linking, LogBox, Text } from "react-native";
import * as SharingIntent from "expo-share-intent";
import { useShareIntent } from "expo-share-intent";
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const Stack = createNativeStackNavigator<StackParamList>();

function App() {
  const { hasShareIntent, shareIntent, resetShareIntent, error } =
    useShareIntent({
      debug: true,
      resetOnBackground: true,
    });

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="white" style="dark" />
      <Text>{JSON.stringify(shareIntent.meta)}</Text>
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
        <Stack.Screen
          name="Filters"
          component={FiltersScreen}
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
