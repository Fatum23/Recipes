import {
  FlatList,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import { gColors } from "../../../global/styles/gColors";

import { TypeRecipe } from "../../../global/types/gTypes";
import * as db from "../../../global/services/db/dbService";
import { SQLError } from "expo-sqlite";

const renderItem = (item: TypeRecipe) => {
  return <Text style={{ marginBottom: 0 }}>{item.title}</Text>;
};

export default function RecipeList() {
  const [recipes, setRecipes] = useState<TypeRecipe>();
  const [getRecipes, setGetRecipes] = useState<boolean>(false);

  useEffect(() => {
    db.getRecipes(
      (recipes: TypeRecipe[]) => {
        console.log("Fetched recipes:", recipes);
        setRecipes(recipes);
      },
      (error: SQLError) => {
        console.log("Failed to fetch recipes:", error);
      }
    );
    setGetRecipes(true);
  }, []);
  return (
    <View style={styles.container}>
      {getRecipes ? (
        <FlatList
          style={styles.flatlist}
          removeClippedSubviews={false}
          data={recipes}
          windowSize={2}
          initialNumToRender={8}
          maxToRenderPerBatch={8}
          renderItem={({ item }) => (
            <View style={{ backgroundColor: "red", width: 100, height: 100 }}>
              <Text>{item.title}</Text>
            </View>
          )}
          keyExtractor={(item) => item.title}
        />
      ) : (
        <ActivityIndicator color={gColors.green} size={"large"} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  flatlist: {
    backgroundColor: "white",
  },
});
