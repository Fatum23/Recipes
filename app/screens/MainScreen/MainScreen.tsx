import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import Header from "./components/Header";
import AddRecipeButton from "./components/AddRecipeButton";
import RecipeList from "./components/RecipeList";

export default function MainScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <RecipeList />
      <AddRecipeButton navigation={navigation} />
    </SafeAreaView>
  );
}
