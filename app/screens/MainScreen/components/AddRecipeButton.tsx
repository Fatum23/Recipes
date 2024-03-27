import { TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { gColors } from "../../../global/styles/gColors";

export default function AddRecipeButton({ navigation }: { navigation: any }) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("AddRecipe")}
    >
      <Ionicons name="add" size={36} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: gColors.green,
    borderRadius: 15,
    elevation: 10,
    padding: 15,
  },
});
