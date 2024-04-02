import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { gColors } from "../../../global/styles/gColors";
import { TypeAddRecipeButton } from "../types";

const checkNotEmpty = (props: TypeAddRecipeButton) => {
  if (props.title === "") {
    props.setTitleWarning("Заполните это поле");
  } else {
    props.setTitleWarning("");
  }
};

const checkValidLink = (props: TypeAddRecipeButton) => {
  if (props.link.indexOf("https://") !== 0) {
    props.setLinkWarning("Ссылка должна начитьнаться с https://");
  } else {
    props.setLinkWarning("");
  }
};

export default function BottomButtons(props: TypeAddRecipeButton) {
  const handleButtonClick = () => {
    checkNotEmpty(props);
    checkValidLink(props);

    if (props.titleWarning === "" && props.linkWarning === "") {
      props.navigation.goBack();
    }
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
