import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

import ScreenHeader from "../../global/components/ScreenHeader";
import SortFilters from "./components/SortFilters";
import { TypeFilterScreen, TypeRoute } from "../../global/types/gTypes";
import { Text } from "react-native";

export default function FiltersScreen(props: {
  navigation: any;
  route: TypeRoute;
}) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScreenHeader navigation={props.navigation} title="Фильтры" />
      <SortFilters />
      <Text>{props.route.params.searchTitleFilter}</Text>
    </SafeAreaView>
  );
}
