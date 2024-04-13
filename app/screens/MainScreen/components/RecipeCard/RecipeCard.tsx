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
import { gColors } from "../../../../global/styles/gColors";

import * as db from "../../../../global/services/db/dbService";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function RecipeCard(
  props: TypeRecipe & {
    setRecipesFetched: Dispatch<SetStateAction<boolean>>;
    loading: boolean;
    marginBottom: boolean;
    searchTitleFilter: string;
    searchLinkFilter: string;
    searchDescriptionFilter: string;
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
      flexWrap: "wrap",
    },
    recipeTypeFilter: {
      margin: 5,
      alignSelf: "flex-start",
      padding: 10,
      backgroundColor: gColors.green,
      borderRadius: 15,
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
        <HighlightText
          text={props.title}
          highlight={props.searchTitleFilter}
          color="black"
        />
      </View>
      <View style={styles.hr} />

      <View style={styles.linkContainer}>
        <Text style={{ alignSelf: "center" }}>Ссылка:</Text>
        <View style={{ flexShrink: 1, marginLeft: 5 }}>
          {props.link.indexOf("https://") === 0 ? (
            <TouchableOpacity onPress={() => Linking.openURL(props.link)}>
              <HighlightText
                text={props.link}
                highlight={props.searchLinkFilter}
                color={
                  props.link.indexOf("https://") === 0 ? "dodgerblue" : "black"
                }
              />
            </TouchableOpacity>
          ) : (
            <Text>{props.link}</Text>
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
        {JSON.parse(props.filters).map((filter: string) => (
          <View key={filter}>
            {filter !== "Понравившиеся" && (
              <View style={styles.recipeTypeFilter}>
                <Text style={{ color: "white", fontWeight: "500" }}>
                  {filter}
                </Text>
              </View>
            )}
          </View>
        ))}
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
              db.likeRecipe(props.id!, props.filters, props.setRecipesFetched)
            }
          >
            <AntDesign
              name={
                props.filters.includes("Понравившиеся") ? "heart" : "hearto"
              }
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
                filters: props.filters,
                addDate: props.addDate,
                editDate: props.editDate,
                setRecipesFetched: props.setRecipesFetched,
              });
            }}
          >
            <MaterialIcons name="edit" size={30} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              db.deleteRecipe(props.id!, props.filters, props.setRecipesFetched)
            }
          >
            <MaterialIcons name="delete" size={30} color="grey" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
