import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import * as db from "../../services/db/dbService";
import { TypeFilter } from "../../types/gTypes";

export default function FiltersContainer() {
  const [filters, setFilters] = useState<TypeFilter[]>([]);
  useEffect(() => {
    db.getFilters("", (result: TypeFilter[]) => {
      setFilters(result);
    });
  }, []);
  return (
    <View style={styles.container}>
      {filters.map((filter) => {
        return <Text key={filter.id!}>{filter.title}</Text>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 270,
    backgroundColor: "red",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
});
