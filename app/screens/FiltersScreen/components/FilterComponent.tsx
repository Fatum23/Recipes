import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import { gColors } from "../../../global/styles/gColors";

type TypeFilterComponent = {
  title: string;
  active: boolean | null;
  handleClick: Dispatch<SetStateAction<boolean | null>>;
};
export default function FilterComponent(props: TypeFilterComponent) {
  const [active, setActive] = useState<boolean | null>(props.active);

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
        active === null ? "lightgray" : active ? gColors.green : gColors.red,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    title: {
      color: active === null ? "black" : "white",
      fontWeight: "500",
    },
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => {
          if (active === null) {
            setActive(true);
            props.handleClick(true);
          } else if (active) {
            setActive(false);
            props.handleClick(false);
          } else if (!active) {
            setActive(null);
            props.handleClick(null);
          }
        }}
      >
        <View style={styles.button}>
          <Text style={styles.title}>{props.title}</Text>
          {active !== null && (
            <AntDesign
              name={active ? "checkcircle" : "closecircle"}
              size={20}
              color="white"
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
