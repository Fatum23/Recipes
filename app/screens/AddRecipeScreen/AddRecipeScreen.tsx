import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import Header from "./components/Header";
import Inputs from "./components/Inputs";
import Filters from "./components/Filters";
import AddRecipeButton from "./components/AddRecipeButton";

export default function AddRecipeScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header navigation={navigation} />
      <Inputs />
      <Filters />
      <AddRecipeButton navigation={navigation} />
    </SafeAreaView>
  );
}
