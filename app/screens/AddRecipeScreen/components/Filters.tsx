import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import FilterComponent from "./FilterComponent";
import { TypeFilters } from "../types";

export default function Filters(props: TypeFilters) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 15,
    },
  });
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <FilterComponent
          title="Понравившиеся"
          active={props.favorite}
          handleClick={props.setFavorite}
        />
        <FilterComponent
          title="Торты"
          active={props.cakes}
          handleClick={props.setCakes}
        />
        <FilterComponent
          title="Пироги"
          active={props.pies}
          handleClick={props.setPies}
        />
        <FilterComponent
          title="Пирожные"
          active={props.cupcakes}
          handleClick={props.setCupcakes}
        />
      </ScrollView>
    </View>
  );
}
