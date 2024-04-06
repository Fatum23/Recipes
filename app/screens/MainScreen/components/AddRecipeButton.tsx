import { TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { gColors } from "../../../global/styles/gColors";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../../../global/types/gTypes";

export default function AddRecipeButton() {
  type NavigationProps = StackNavigationProp<StackParamList, "AddRecipe">;
  const navigation = useNavigation<NavigationProps>();
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
