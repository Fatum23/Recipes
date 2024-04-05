import { FlatList, Text, StyleSheet } from "react-native";
import React from "react";
import RecipeCard from "./RecipeCard";

const items: string[] = [...Array(100)].map((_, i) => i.toString());

const renderItem = (item: string) => {
  return <Text style={{ marginBottom: 0 }}>{item}</Text>;
};

export default function RecipeList() {
  return (
    <FlatList
      style={styles.flatlist}
      removeClippedSubviews={false}
      data={items}
      windowSize={2}
      initialNumToRender={8}
      maxToRenderPerBatch={8}
      renderItem={({ item }) => renderItem(item)}
      keyExtractor={(item) => item}
    />
  );
}

const styles = StyleSheet.create({
  flatlist: {
    backgroundColor: "white",
  },
});
