import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { AntDesign } from "@expo/vector-icons";

import { gColors } from "../../../global/styles/gColors";

type TypeFilterComponent = {
  title: string;
  active: boolean;
  handleClick: Dispatch<SetStateAction<boolean>>;
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
      backgroundColor: props.active ? gColors.green : "lightgray",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    title: {
      color: props.active ? "white" : "black",
      fontWeight: "500",
    },
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => props.handleClick(props.active ? false : true)}
      >
        <View style={styles.button}>
          <Text style={styles.title}>{props.title}</Text>
          {props.active && (
            <AntDesign name="closecircle" size={20} color="white" />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
