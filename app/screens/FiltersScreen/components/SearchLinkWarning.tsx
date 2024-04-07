import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function SearchLinkWarning(props: { searchLinkFilter: string }) {
  const styles = StyleSheet.create({
    container: {
      display: props.searchLinkFilter === "" ? "none" : "flex",
      marginLeft: 120,
    },
    text: {
      color: "gold",
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {!props.searchLinkFilter.includes("https://")
          ? "Ссылка должна начинаться с https://"
          : ""}
      </Text>
    </View>
  );
}
