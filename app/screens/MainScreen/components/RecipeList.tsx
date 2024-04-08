import {
  FlatList,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import RecipeCard from "./RecipeCard/RecipeCard";
import { gColors } from "../../../global/styles/gColors";

import { TypeRecipe } from "../../../global/types/gTypes";

export default function RecipeList(props: {
  loading: boolean;
  recipes: TypeRecipe[];
  setRecipesFetched: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        contentContainerStyle={styles.content}
        removeClippedSubviews={false}
        data={props.recipes}
        windowSize={2}
        initialNumToRender={50}
        maxToRenderPerBatch={50}
        renderItem={({ item, index }) => (
          <RecipeCard
            id={item.id}
            title={item.title}
            link={item.link}
            description={item.description}
            favorite={item.favorite}
            cake={item.cake}
            cupcake={item.cupcake}
            pie={item.pie}
            addDate={item.addDate}
            editDate={item.editDate}
            marginBottom={index + 1 === props.recipes.length}
            setRecipesFetched={props.setRecipesFetched}
          />
        )}
        automaticallyAdjustsScrollIndicatorInsets={false}
        keyExtractor={(item) => item.id!.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  flatlist: {
    width: "100%",
    backgroundColor: "white",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  noRecipes: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
