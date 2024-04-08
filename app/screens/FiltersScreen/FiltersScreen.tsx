import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList, TypeSortFilter } from "../../global/types/gTypes";
import { RouteProp, useNavigation } from "@react-navigation/native";

import ScreenHeader from "../../global/components/ScreenHeader";
import SortFilters from "./components/SortFilters";
import SearchInput from "./components/SearchInput";
import SearchLinkWarning from "./components/SearchLinkWarning";
import RecipeTypeFilters from "./components/RecipeTypeFilters";
import BottomButtons from "./components/BottomButtons";

export default function FiltersScreen({
  route,
}: {
  route: RouteProp<StackParamList, "Filters">;
}) {
  type NavigationProps = StackNavigationProp<StackParamList, "Filters">;
  const navigation = useNavigation<NavigationProps>();

  const [sortFilter, setSortFilter] = useState<TypeSortFilter>(
    route.params.sortFilter
  );

  const [searchTitleFilter, setSearchTitleFilter] = useState<string>(
    route.params.searchTitleFilter
  );
  const [searchLinkFilter, setSearchLinkFilter] = useState<string>(
    route.params.searchLinkFilter
  );
  const [searchDescriptionFilter, setSearchDescriptionFilter] =
    useState<string>(route.params.searchDescriptionFilter);

  const [favoriteFilter, setFavoriteFilter] = useState<boolean | null>(
    route.params.favoriteFilter
  );
  const [cakeFilter, setCakeFilter] = useState<boolean | null>(
    route.params.cakeFilter
  );
  const [cupcakeFilter, setCupcakeFilter] = useState<boolean | null>(
    route.params.cupcakeFilter
  );
  const [pieFilter, setPieFilter] = useState<boolean | null>(
    route.params.pieFilter
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScreenHeader navigation={navigation} title="Фильтры" />
      <SortFilters sortFilter={sortFilter} setSortFilter={setSortFilter} />
      <SearchInput
        type="link"
        value={searchLinkFilter}
        setValue={setSearchLinkFilter}
      />
      <SearchLinkWarning searchLinkFilter={searchLinkFilter} />
      <SearchInput
        type="description"
        value={searchDescriptionFilter}
        setValue={setSearchDescriptionFilter}
      />
      <RecipeTypeFilters
        favorite={favoriteFilter}
        cakes={cakeFilter}
        cupcakes={cupcakeFilter}
        pies={pieFilter}
        setFavorite={setFavoriteFilter}
        setCakes={setCakeFilter}
        setCupcakes={setCupcakeFilter}
        setPies={setPieFilter}
      />
      <BottomButtons
        sortFilter={sortFilter}
        searchTitleFilter={searchTitleFilter}
        searchLinkFilter={searchLinkFilter}
        searchDescriptionFilter={searchDescriptionFilter}
        favoriteFilter={favoriteFilter}
        cakeFilter={cakeFilter}
        cupcakeFilter={cupcakeFilter}
        pieFilter={pieFilter}
        setLocalSortFilter={setSortFilter}
        setLocalSearchTitleFilter={setSearchTitleFilter}
        setLocalSearchLinkFilter={setSearchLinkFilter}
        setLocalSearchDescriptionFilter={setSearchDescriptionFilter}
        setLocalFavoriteFilter={setFavoriteFilter}
        setLocalCakeFilter={setCakeFilter}
        setLocalCupcakeFilter={setCupcakeFilter}
        setLocalPieFilter={setPieFilter}
        setSortFilter={route.params.setSortFilter}
        setSearchTitleFilter={route.params.setSearchTitleFilter}
        setSearchLinkFilter={route.params.setSearchLinkFilter}
        setSearchDescriptionFilter={route.params.setSearchDescriptionFilter}
        setFavoriteFilter={route.params.setFavoriteFilter}
        setCakeFilter={route.params.setCakeFilter}
        setCupcakeFilter={route.params.setCupcakeFilter}
        setPieFilter={route.params.setPieFilter}
      />
    </SafeAreaView>
  );
}
