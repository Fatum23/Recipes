import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import Modal from "react-native-modal";
import { gColors } from "../../styles/gColors";
import * as db from "../../services/db/dbService";
import { TypeFilter } from "../../types/gTypes";

export default function ModalComponent(props: {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  setFiltersFetched: Dispatch<SetStateAction<boolean>>;
}) {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputPlaceholder, setInputPlaceholder] = useState<
    | "Введите название фильтра..."
    | "Заполните это поле"
    | "Такой фильтр уже существует"
  >("Введите название фильтра...");
  return (
    <Modal
      animationIn="fadeInUpBig"
      animationOut="fadeOutDownBig"
      isVisible={props.modalVisible}
      style={{ alignItems: "center" }}
      hasBackdrop={false}
      onBackButtonPress={() => props.setModalVisible(false)}
    >
      <View style={styles.modal}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}>Добавить фильтр</Text>
          <TextInput
            style={styles.input}
            placeholder={inputPlaceholder}
            defaultValue={inputValue}
            placeholderTextColor={
              !inputPlaceholder.includes("Введите") ? gColors.red : "black"
            }
            onChangeText={(text) => {
              setInputValue(text);
              setInputPlaceholder("Введите название фильтра...");
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={{ padding: 10 }}
            onPress={() => {
              props.setModalVisible(false);
              setInputValue("");
              setInputPlaceholder("Введите название фильтра...");
            }}
          >
            <Text style={{ color: gColors.red, fontSize: 18 }}>Отмена</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 10 }}
            onPress={() => {
              if (inputValue !== "") {
                db.getFilters(inputValue, (result: TypeFilter[]) => {
                  if (result.length === 0) {
                    db.addFilter(inputValue);
                    props.setFiltersFetched(false);
                    props.setModalVisible(false);
                    setInputValue("");
                    setInputPlaceholder("Введите название фильтра...");
                  } else {
                    setInputValue("");
                    setInputPlaceholder("Такой фильтр уже существует");
                  }
                });
              } else {
                setInputPlaceholder("Заполните это поле");
              }
            }}
          >
            <Text style={{ color: gColors.green, fontSize: 18 }}>Добавить</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: "80%",
    height: 180,
    backgroundColor: "whitesmoke",
    borderRadius: 20,
    elevation: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    paddingTop: 10,
  },
  input: {
    marginTop: 20,
    height: 50,
    width: "90%",
    borderBottomWidth: 1,
    borderColor: gColors.green,
  },
});
