import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { gColors } from "../../../global/styles/gColors";
import { TypeAddRecipeButton } from "../types";

import * as db from "../../../global/services/db/dbService";
import { TypeRecipe } from "../../../global/types/gTypes";

const addRecipe = (props: TypeAddRecipeButton) => {
  db.addRecipe({
    title: props.title,
    link: props.link,
    description: props.description,
    favorite: props.favorite,
    cake: props.cakes,
    cupcake: props.cupcakes,
    pie: props.pies,
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
      favorite: props.favorite,
      cake: props.cakes,
      cupcake: props.cupcakes,
      pie: props.pies,
      addDate: new Date().toLocaleString().replace(", ", " "),
      editDate: "",
    },
    props.setRecipesFetched
  );
};

export default function BottomButtons(
  props: { action: "Добавить" | "Редактировать" } & TypeAddRecipeButton
) {
  const handleButtonClick = () => {
    if (props.title !== "") {
      props.action === "Добавить" ? addRecipe(props) : editRecipe(props);
      props.navigation.goBack();
    } else {
      props.setTitleWarning("Заполните это поле");
    }
  };

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View>
      {!isKeyboardVisible && (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.4}
            onPress={handleButtonClick}
          >
            <Text style={styles.text}>{props.action} рецепт</Text>
          </TouchableOpacity>
        </View>
      )}
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
