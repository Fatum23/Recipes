import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export default function Header({
  navigation,
  title,
}: {
  navigation: any;
  title: string;
}) {
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={32} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={{ height: 20, width: 20 }}>
        <Text style={{ alignSelf: "center" }}></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
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
