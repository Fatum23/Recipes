import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { gColors } from "../../../global/styles/gColors";

export default function Header() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Введите название рецепта..."
        />
        <TouchableOpacity>
          <SimpleLineIcons name="equalizer" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={32} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.hr} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
  },
  container: {
    height: 50,
    width: "100%",
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  input: {
    height: "100%",
    width: "75%",
    borderWidth: 1,
    borderColor: gColors.green,
    borderRadius: 10,
    padding: 10,
    // fontFamily: "Gilroy-Medium",
    fontFamily: "Montserrat-Medium",
  },
  hr: {
    paddingTop: 15,
    borderBottomColor: "rgba(52, 52, 52, 0.3)",
    borderBottomWidth: 1,
  },
});
