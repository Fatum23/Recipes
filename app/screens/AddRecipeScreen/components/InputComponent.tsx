import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { gColors } from "../../../global/styles/gColors";
import { TypeInputComponent } from "../types";
import * as db from "../../../global/services/db/dbService";

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
      color:
        props.title === "Ссылка"
          ? props.value.indexOf("https://") === 0
            ? "dodgerblue"
            : "black"
          : "black",
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.title}:</Text>
      <TextInput
        style={styles.input}
        selectionColor={gColors.green}
        multiline={props.title === "Описание" ? true : false}
        onChangeText={(text) => {
          props.setValue(text);
          // if (props.title === "Ссылка") {
          //   if (text !== "" && !text.includes("https://")) {
          //     props.setLinkWarning("Ссылка должна начинаться с https://");
          //   } else {
          //     props.setLinkWarning("");
          //   }
          // }
          // if (props.title === "Название" && text !== "") {
          //   props.setTitleWarning("");
          // }
          if (props.title === "Название") {
            db.checkRecipeExists(props.title, text, props.setTitleWarning);
          }
          if (props.title === "Ссылка") {
            db.checkRecipeExists(props.title, text, props.setLinkWarning);
          }
        }}
        defaultValue={props.value}
      />
    </View>
  );
}
