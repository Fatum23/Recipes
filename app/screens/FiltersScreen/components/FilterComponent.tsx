import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import { gColors } from "../../../global/styles/gColors";

type TypeFilterComponent = {
  title: string;
  active: boolean | null;
  handleClick: Dispatch<SetStateAction<boolean | null>>;
};
export default function FilterComponent(props: TypeFilterComponent) {
  const styles = StyleSheet.create({
    container: {
      marginLeft: 15,
      height: 40,
      borderRadius: 15,
      overflow: "hidden",
    },
    button: {
      flex: 1,
      padding: 10,
      backgroundColor:
        props.active === null
          ? "lightgray"
          : props.active
          ? gColors.green
          : gColors.red,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    title: {
      color: props.active === null ? "black" : "white",
      fontWeight: "500",
    },
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => {
          if (props.active === null) {
            props.handleClick(true);
          } else if (props.active) {
            props.handleClick(false);
          } else if (!props.active) {
            props.handleClick(null);
          }
        }}
      >
        <View style={styles.button}>
          <Text style={styles.title}>{props.title}</Text>
          {props.active !== null && (
            <AntDesign
              name={props.active ? "checkcircle" : "closecircle"}
              size={20}
              color="white"
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
