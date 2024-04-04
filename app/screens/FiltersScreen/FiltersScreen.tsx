import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

import ScreenHeader from "../../global/components/ScreenHeader";
import SortFilters from "./components/SortFilters";

export default function FiltersScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScreenHeader navigation={navigation} title="Фильтры" />
      <SortFilters />
    </SafeAreaView>
  );
}
