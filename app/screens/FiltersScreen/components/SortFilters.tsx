import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
export default function SortFilters() {

  return (
    <View>
      <Picker
        selectedValue={"courses"}
        style={{ height: 50, width: 250 }}
        mode="dropdown"
      >
        <Picker.Item label="Courses" value="courses" />
        <Picker.Item label="Data-Structures" value="DSA" />
        <Picker.Item label="ReactJs" value="react" />
        <Picker.Item label="C++" value="cpp" />
        <Picker.Item label="Python" value="py" />
        <Picker.Item label="Java" value="java" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
