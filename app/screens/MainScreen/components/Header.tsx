import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { gColors } from "../../../global/styles/gColors";
import { StackParamList, TypeFilterScreen } from "../../../global/types/gTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

export default function Header(props: TypeFilterScreen) {
  type NavigationProp = StackNavigationProp<StackParamList, "Filters">;
  const navigation = useNavigation<NavigationProp>();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Введите название рецепта..."
          onChangeText={(text) => props.setSearchTitleFilter(text)}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Filters", { ...props })}
        >
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
  },
  hr: {
    paddingTop: 15,
    borderBottomColor: "rgba(52, 52, 52, 0.3)",
    borderBottomWidth: 1,
  },
});
