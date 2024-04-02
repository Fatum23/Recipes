import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function InputWarning(props: { warning: string }) {
  const styles = StyleSheet.create({
    container: {
      display: props.warning === "" ? "none" : "flex",
      marginLeft: 120,
    },
  });
  return (
    <View style={styles.container}>
      <Text>{props.warning}</Text>
    </View>
  );
}
