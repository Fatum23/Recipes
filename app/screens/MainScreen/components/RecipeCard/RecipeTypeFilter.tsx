import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { gColors } from "../../../../global/styles/gColors";

export default function RecipeTypeFilter(props: {
  type: "Торты" | "Пирожные" | "Пироги";
  active: boolean | null;
}) {
  const styles = StyleSheet.create({
    view: {
      borderRadius: 15,
      height: 40,
      padding: 10,
      marginRight: 15,
      backgroundColor: props.active ? gColors.green : "lightgray",
      flexDirection: "row",
      alignItems: "center",
    },
    text: {
      color: props.active ? "white" : "black",
      fontWeight: "500",
    },
  });
  return (
    <View style={styles.view}>
      <Text style={styles.text}>{props.type}</Text>
    </View>
  );
}
