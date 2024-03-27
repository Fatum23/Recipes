import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import Header from "./components/Header";

export default function AddRecipeScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header navigation={navigation} />
    </SafeAreaView>
  );
}
