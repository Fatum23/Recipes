import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { gColors } from "../../../global/styles/gColors";

export default function BottomButtons({ navigation }: { navigation: any }) {
  const handleButtonClick = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.4}
        onPress={handleButtonClick}
      >
        <Text style={styles.text}>Добавить рецепт</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: gColors.green,
    paddingTop: 15,
    paddingRight: 20,
    paddingBottom: 15,
    paddingLeft: 20,
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
});
