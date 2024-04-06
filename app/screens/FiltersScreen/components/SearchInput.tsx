import { StyleSheet, View, Text, TextInput } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { gColors } from "../../../global/styles/gColors";

export default function SearchFilters(props: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  type: "link" | "description";
  setSearchLinkWarning: Dispatch<SetStateAction<string>> | undefined;
}) {
  const [value, setValue] = useState(props.value);
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
      height: props.type !== "description" ? 45 : 145,
      textAlignVertical: props.type !== "description" ? "center" : "top",
      color:
        props.type === "link"
          ? value.indexOf("https://") === 0
            ? "dodgerblue"
            : "black"
          : "black",
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {props.type === "link" ? "Ссылка" : "Описание"}:
      </Text>
      <TextInput
        style={styles.input}
        selectionColor={gColors.green}
        multiline={props.type === "description" ? true : false}
        onChangeText={(text) => {
          props.setValue(text);
          setValue(text);
          if (props.type === "link") {
            if (text !== "" && !text.includes("https://")) {
              props.setSearchLinkWarning!(
                "Ссылка должна начинаться с https://"
              );
            } else {
              props.setSearchLinkWarning!("");
            }
          }
        }}
        defaultValue={value}
      />
    </View>
  );
}
