import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { gColors } from "../../../global/styles/gColors";
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import * as db from "../../../global/services/db/dbService";
import { TypeRecipe } from "../../../global/types/gTypes";

export default function SelectedRecipesMenu(props: {
  recipes: TypeRecipe[];
  selectedRecipes: { id: number; filters: string }[];
  setSelectedRecipes: Dispatch<
    SetStateAction<{ id: number; filters: string }[]>
  >;
  setRecipesFetched: Dispatch<SetStateAction<boolean>>;
}) {
  const selectedMenuHeight = useAnimatedStyle(() => {
    return {
      height: withTiming(props.selectedRecipes.length === 0 ? 0 : 40, {
        duration: 150,
        easing: Easing.ease,
      }),
      padding: withTiming(props.selectedRecipes.length === 0 ? 0 : 10, {
        duration: 150,
        easing: Easing.ease,
      }),
    };
  });
  return (
    <Animated.View style={[styles.container, selectedMenuHeight]}>
      <View>
        <TouchableOpacity onPress={() => props.setSelectedRecipes([])}>
          <Text style={styles.text}>Отмена</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            props.setSelectedRecipes([]);
            props.setSelectedRecipes(
              props.recipes.map((recipe) => ({
                id: recipe.id!,
                filters: recipe.filters,
              }))
            );
          }}
        >
          <Text style={styles.text}>Выбрать все</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.text}>Выбрано: {props.selectedRecipes.length}</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            props.selectedRecipes.forEach((recipe) => {
              db.deleteRecipe(
                recipe.id,
                recipe.filters,
                props.setRecipesFetched
              );
            });
            props.setSelectedRecipes([]);
          }}
        >
          <Text style={styles.text}>Удалить</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    backgroundColor: gColors.green,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "white",
    fontWeight: "500",
  },
});
