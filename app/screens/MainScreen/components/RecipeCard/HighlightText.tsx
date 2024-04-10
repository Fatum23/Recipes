import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { gColors } from "../../../../global/styles/gColors";

export default function HighlightText(props: {
  text: string;
  highlight: string;
  color: string;
}) {
  const styles = StyleSheet.create({
    contaíner: {
      flexDirection: "row",
    },
    text: {
      color: props.color,
      fontSize: 15,
    },
  });

  const index = props.text.includes(props.highlight)
    ? props.text.indexOf(props.highlight)
    : 0;
  const highlight = props.text.includes(props.highlight) ? props.highlight : "";

  return (
    <View>
      {!props.text.includes(props.highlight) ? (
        <Text>{props.text}</Text>
      ) : (
        <View style={{flexDirection: "row"}}>
          <Text style={styles.text}>{props.text.substring(0, index)}</Text>
          <Text style={{ color: gColors.green, fontSize: 15 }}>
            {highlight}
          </Text>
          <Text style={styles.text}>
            {props.text.substring(index + props.highlight.length)}
          </Text>
        </View>
      )}
    </View>
  );
}
