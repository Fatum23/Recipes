import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { StackParamList, TypeRecipe } from "../../../../global/types/gTypes";
import HighlightText from "./HighlightText";
import RecipeTypeFilter from "./RecipeTypeFilter";
import { gColors } from "../../../../global/styles/gColors";

import * as db from "../../../../global/services/db/dbService";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function RecipeCard(
  props: TypeRecipe & {
    setRecipesFetched: Dispatch<SetStateAction<boolean>>;
    marginBottom: boolean;
  }
) {
  const navigation =
    useNavigation<NavigationProp<StackParamList, "AddRecipe">>();
  const styles = StyleSheet.create({
    container: {
      width: Dimensions.get("screen").width * 0.875,
      backgroundColor: "whitesmoke",
      margin: 20,
      borderRadius: 10,
      elevation: 5,
    },
    title: {
      alignItems: "center",
      padding: 5,
    },
    hr: {
      borderBottomColor: "rgba(52, 52, 52, 0.3)",
      borderBottomWidth: 1,
    },
    linkContainer: {
      flexDirection: "row",
      margin: 5,
    },
    descriptionContainer: {
      flexDirection: "row",
      margin: 5,
    },
    recipeTypeFiltersContainer: {
      flexDirection: "row",
      padding: 10,
      justifyContent: "space-evenly",
    },
    bottomContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 5,
    },
    bottomRightContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginRight: 5,
    },
  });

  return (
    <View
      style={[styles.container, props.marginBottom && { marginBottom: 110 }]}
    >
      <View style={styles.title}>
        <HighlightText text={props.title} highlight="" color="black" />
      </View>
      <View style={styles.hr} />

      <View style={styles.linkContainer}>
        <Text style={{ alignSelf: "center" }}>Ссылка:</Text>
        <View style={{ flexShrink: 1, marginLeft: 5 }}>
          {props.link.indexOf("https://") === 0 && (
            <TouchableOpacity onPress={() => Linking.openURL(props.link)}>
              <HighlightText
                text={props.link}
                highlight=""
                color={
                  props.link.indexOf("https://") === 0 ? "dodgerblue" : "black"
                }
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={{ alignSelf: "center" }}>Описание:</Text>
        <View style={{ flexShrink: 1, marginLeft: 5 }}>
          {props.description !== "" && (
            <HighlightText
              text={props.description}
              highlight=""
              color="black"
            />
          )}
        </View>
      </View>
      <View style={styles.hr}></View>

      <View style={styles.recipeTypeFiltersContainer}>
        <RecipeTypeFilter type="Торты" active={props.cake} />
        <RecipeTypeFilter type="Пирожные" active={props.cupcake} />
        <RecipeTypeFilter type="Пироги" active={props.pie} />
      </View>
      <View style={styles.hr}></View>

      <View style={styles.bottomContainer}>
        <View>
          <Text>доб: {props.addDate}</Text>
          <Text>ред: {props.editDate}</Text>
        </View>
        <View style={styles.bottomRightContainer}>
          <TouchableOpacity
            onPress={() =>
              db.likeRecipe(props.id!, !props.favorite, props.setRecipesFetched)
            }
          >
            <AntDesign
              name={props.favorite ? "heart" : "hearto"}
              size={30}
              color={gColors.red}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddRecipe", {
                action: "Редактировать",
                id: props.id,
                title: props.title,
                link: props.link,
                description: props.description,
                favorite: !!props.favorite,
                cake: !!props.cake,
                cupcake: !!props.cupcake,
                pie: !!props.pie,
                addDate: props.addDate,
                editDate: props.editDate,
                setRecipesFetched: props.setRecipesFetched,
              });
            }}
          >
            <MaterialIcons name="edit" size={30} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => db.deleteRecipe(props.id!, props.setRecipesFetched)}
          >
            <MaterialIcons name="delete" size={30} color="grey" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}