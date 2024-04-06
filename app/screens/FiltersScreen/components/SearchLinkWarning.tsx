import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function SearchLinkWarning(props: { warning: string }) {
  const styles = StyleSheet.create({
    container: {
      display: props.warning === "" ? "none" : "flex",
      marginLeft: 120,
    },
    text: {
      color: "gold",
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.warning}</Text>
    </View>
  );
}
