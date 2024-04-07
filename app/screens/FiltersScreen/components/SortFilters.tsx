import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TypeSortFilter } from "../../../global/types/gTypes";
export default function SortFilters(props: {
  sortFilter: TypeSortFilter;
  setSortFilter: Dispatch<SetStateAction<TypeSortFilter>>;
}) {
  const styles = StyleSheet.create({
    container: {
      marginTop: 25,
    },
    title: {
      marginLeft: 10,
      fontSize: 22,
      fontWeight: "bold",
    },
    picker: {
      width: props.sortFilter.includes("-") ? 110 : 230,
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Сортировать по: </Text>
      <Picker
        selectedValue={props.sortFilter}
        mode="dropdown"
        onValueChange={(value) => {
          props.setSortFilter(value);
        }}
        style={styles.picker}
      >
        <Picker.Item label="А-Я" value="А-Я" />
        <Picker.Item label="Я-А" value="Я-А" />
        <Picker.Item label="От новых к старым" value="От новых к старым" />
        <Picker.Item label="От старых к новым" value="От старых к новым" />
      </Picker>
    </View>
  );
}
