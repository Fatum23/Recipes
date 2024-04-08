import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function HighlightText(props: {
  text: string;
  highlight: string;
  color: string;
}) {
  const styles = StyleSheet.create({
    text: {
      color: props.color,
      fontSize: 15,
    },
  });
  return <Text style={styles.text}>{props.text}</Text>;
}
