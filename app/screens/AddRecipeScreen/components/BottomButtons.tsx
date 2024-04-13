import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { gColors } from "../../../global/styles/gColors";
import { TypeAddRecipeButton } from "../types";

import * as db from "../../../global/services/db/dbService";

const addRecipe = (props: TypeAddRecipeButton) => {
  db.addRecipe({
    title: props.title,
    link: props.link,
    description: props.description,
    filters: JSON.stringify(props.filters),
    addDate: new Date().toLocaleString().replace(", ", " "),
    editDate: "",
  });
  props.setRecipesFetched(false);
};

const editRecipe = (props: TypeAddRecipeButton) => {
  db.editRecipe(
    {
      id: props.id!,
      title: props.title,
      link: props.link,
      description: props.description,
      filters: JSON.stringify(props.filters),
      addDate: props.addDate,
      editDate: new Date().toLocaleString().replace(", ", " "),
    },
    props.setRecipesFetched
  );
};

export default function BottomButtons(
  props: {
    action: "Добавить" | "Редактировать";
    addDate: string;
  } & TypeAddRecipeButton
) {
  const handleApply = () => {
    if (props.title.replace(/\s/g, "") !== "") {
      props.action === "Добавить" ? addRecipe(props) : editRecipe(props);
      props.navigation.goBack();
    } else {
      props.setTitleWarning("Заполните это поле");
    }
  };

  const handleDiscard = () => {
    props.setTitle("");
    props.setLink("");
    props.setDescription("");
    props.setRecipeTypeFilters([]);
    props.setTitleWarning("");
    props.setLinkWarning("");
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.discardButton}
          activeOpacity={0.4}
          onPress={handleDiscard}
        >
          <Text style={styles.discardText}>Сбросить все</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.applyButton}
          activeOpacity={0.4}
          onPress={handleApply}
        >
          <Text style={styles.applyText}>{props.action} рецепт</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  applyButton: {
    backgroundColor: gColors.green,
    paddingTop: 15,
    paddingRight: 20,
    paddingBottom: 15,
    paddingLeft: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  applyText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  discardButton: {
    alignItems: "center",
    backgroundColor: "whitesmoke",
    paddingTop: 15,
    paddingRight: 20,
    paddingBottom: 15,
    paddingLeft: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  discardText: {
    color: gColors.green,
    fontSize: 20,
    fontWeight: "600",
  },
});
