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

export default function RecipeList(props: {
  getRecipes: boolean;
  recipes: TypeRecipe[];
}) {
  return (
    <View style={styles.container}>
      {props.getRecipes ? (
        <FlatList
          style={styles.flatlist}
          contentContainerStyle={styles.content}
          removeClippedSubviews={false}
          data={props.recipes}
          windowSize={2}
          initialNumToRender={8}
          maxToRenderPerBatch={8}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "whitesmoke",
                width: 100,
                height: 100,
                margin: 10,
              }}
            >
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
  },
  flatlist: {
    width: "100%",
    backgroundColor: "white",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
});
