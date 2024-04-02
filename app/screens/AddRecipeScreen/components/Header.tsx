import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export default function Header({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={32} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.title}>Добавить рецепт</Text>
      </View>
      <View style={{ height: 20, width: 20 }}>
        <Text style={{ alignSelf: "center" }}></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "bold",
  },
});
