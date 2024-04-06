import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../../global/types/gTypes";
import { RouteProp, useNavigation } from "@react-navigation/native";

import ScreenHeader from "../../global/components/ScreenHeader";
import SortFilters from "./components/SortFilters";
import SearchInput from "./components/SearchInput";
import SearchLinkWarning from "./components/SearchLinkWarning";

export default function FiltersScreen({
  route,
}: {
  route: RouteProp<StackParamList, "Filters">;
}) {
  type NavigationProps = StackNavigationProp<StackParamList, "Filters">;
  const navigation = useNavigation<StackParamList>();

  const [searchLinkWarning, setSearchLinkWarning] = useState<string>("");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScreenHeader navigation={navigation} title="Фильтры" />
      <SortFilters
        sortFilter={route.params.sortFilter}
        setSortFilter={route.params.setSortFilter}
      />
      <SearchInput
        type="link"
        value={route.params.searchLinkFilter}
        setValue={route.params.setSearchLinkFilter}
        setSearchLinkWarning={setSearchLinkWarning}
      />
      <SearchLinkWarning warning={searchLinkWarning} />
      <SearchInput
        type="description"
        value={route.params.searchDescriptionFilter}
        setValue={route.params.setSearchDescriptionFilter}
        setSearchLinkWarning={undefined}
      />
    </SafeAreaView>
  );
}
