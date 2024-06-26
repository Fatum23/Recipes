import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { gColors } from "../../../global/styles/gColors";
import { StackParamList, TypeFilterScreen } from "../../../global/types/gTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

export default function Header(
  props: TypeFilterScreen & {
    setRecipesFetched: Dispatch<SetStateAction<boolean>>;
  }
) {
  type NavigationProp = StackNavigationProp<StackParamList, "Filters">;
  const navigation = useNavigation<NavigationProp>();

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
      width: "85%",
      borderWidth: 1,
      borderColor: gColors.green,
      borderRadius: 10,
      padding: 10,
    },
    filtersApplied: {
      width: 10,
      height: 10,
      backgroundColor: gColors.red,
      borderRadius: 5,
      position: "absolute",
    },
    hr: {
      paddingTop: 15,
      borderBottomColor: "rgba(52, 52, 52, 0.3)",
      borderBottomWidth: 1,
    },
  });

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
          <SimpleLineIcons
            name="equalizer"
            size={32}
            color={
              props.sortFilter === "От новых к старым" &&
              props.searchLinkFilter === "" &&
              props.searchDescriptionFilter === "" &&
              props.recipeTypeFilters.length === 0
                ? "black"
                : gColors.green
            }
          />
        </TouchableOpacity>
      </View>
      <View style={styles.hr} />
    </View>
  );
}
