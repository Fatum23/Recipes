import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { gColors } from "../../../global/styles/gColors";

type TypeInputComponent = {
  title: string;
};
export default function InputComponent(props: TypeInputComponent) {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 20,
      paddingLeft: 10,
    },
    text: {
      fontSize: 20,
      fontWeight: "bold",
      width: 100,
    },
    input: {
      marginLeft: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: gColors.green,
      borderRadius: 10,
      width: "70%",
      marginRight: 10,
      height: props.title !== "Описание" ? 45 : 145,
      textAlignVertical: props.title !== "Описание" ? "center" : "top",
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.title}:</Text>
      <TextInput style={styles.input} selectionColor={gColors.green} multiline={true} />
    </View>
  );
}
