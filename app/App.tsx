import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";

import MainScreen from "./screens/MainScreen/MainScreen";
import AddRecipeScreen from "./screens/AddRecipeScreen/AddRecipeScreen";
import FiltersScreen from "./screens/FiltersScreen/FiltersScreen";
import { StackParamList } from "./global/types/gTypes";

import { Alert, Linking, LogBox } from "react-native";
import { ShareMenu } from "react-native-share-menu";
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const Stack = createNativeStackNavigator<StackParamList>();

function App() {
  useEffect(() => {
    const handleShareMenu = async () => {
      try {
        const sharedData = await ShareMenu.data();
        if (sharedData) {
          // Обработка полученных данных (например, sharedData.url)
          console.log("Получены данные:", sharedData);
        }
      } catch (error) {
        console.error("Ошибка при обработке данных:", error);
      }
    };

    handleShareMenu();

    // Очищаем обработчик при размонтировании компонента
    return () => {
      ShareMenu.removeListener("data", handleShareMenu);
    };
  }, []);

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
