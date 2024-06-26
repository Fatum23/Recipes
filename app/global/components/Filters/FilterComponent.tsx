import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import * as Haptics from "expo-haptics";
import Modal from "react-native-modal";

import { gColors } from "../../../global/styles/gColors";
import * as db from "../../services/db/dbService";

type TypeFilterComponent = {
  id: number;
  title: string;
  count: number;
  active: boolean;
  handleClick: (title: string, deleting: boolean) => void;
  setFiltersFetched: Dispatch<SetStateAction<boolean>>;
  setRecipesFetched: Dispatch<SetStateAction<boolean>>;
};
export default function FilterComponent(props: TypeFilterComponent) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  const styles = StyleSheet.create({
    container: {
      height: 40,
      borderRadius: 15,
      overflow: "hidden",
      alignSelf: "flex-start",
      marginRight: 10,
    },
    button: {
      flex: 1,
      padding: 10,
      backgroundColor: props.active ? gColors.green : "lightgray",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    title: {
      color: props.active ? "white" : "black",
      fontWeight: "500",
    },

    modal: {
      backgroundColor: "whitesmoke",
      width: "90%",
      borderRadius: 20,
      elevation: 20,
    },
  });
  return (
    <View style={styles.container}>
      <Modal
        animationIn="fadeInUpBig"
        animationOut="fadeOutDownBig"
        isVisible={modalVisible}
        style={{ alignItems: "center" }}
        onBackButtonPress={() => setModalVisible(false)}
        customBackdrop={
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={{ flex: 1 }}></View>
          </TouchableWithoutFeedback>
        }
      >
        <View style={styles.modal}>
          <Text
            style={{
              paddingTop: 5,
              paddingLeft: 5,
              paddingRight: 5,
              alignSelf: "center",
              fontSize: 18,
            }}
          >
            Удалить фильтр "{selectedFilter}"?
          </Text>
          <View
            style={{
              justifyContent: "space-around",
              marginTop: 20,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                padding: 10,
              }}
            >
              <Text style={{ color: gColors.red, fontSize: 18 }}>Нет</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                padding: 10,
              }}
              onPress={() => {
                props.handleClick(props.title, true);
                db.deleteFilter(
                  props.id,
                  props.title,
                  props.setFiltersFetched,
                  props.setRecipesFetched
                );
              }}
            >
              <Text style={{ color: gColors.green, fontSize: 18 }}>Да</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => props.handleClick(props.title, false)}
        onLongPress={() => {
          if (props.title !== "Понравившиеся") {
            setSelectedFilter(props.title);
            Haptics.selectionAsync();
            setModalVisible(true);
          }
        }}
      >
        <View style={styles.button}>
          <Text style={styles.title}>{props.title}</Text>
          <Text
            style={{
              color: props.active ? "gainsboro" : "#989898",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {props.count}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
