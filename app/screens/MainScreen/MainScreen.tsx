import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import AddRecipeButton from "./components/AddRecipeButton";
import RecipeList from "./components/RecipeList";

import { TypeSortFilter } from "../../global/types/gTypes";

export default function MainScreen() {
  const [sortFilter, setSortFilter] =
    useState<TypeSortFilter>("От новых к старым");

  const [searchTitleFilter, setSearchTitleFilter] = useState<string>("");
  const [searchLinkFilter, setSearchLinkFilter] = useState<string>("");
  const [searchDescriptionFilter, setSearchDescriptionFilter] =
    useState<string>("");

  const [favoriteFilter, setFavoriteFilter] = useState<boolean | null>(null);
  const [cakeFilter, setCakeFilter] = useState<boolean | null>(null);
  const [cupcakeFilter, setCupcakeFilter] = useState<boolean | null>(null);
  const [pieFilter, setPieFilter] = useState<boolean | null>(null);

  useEffect(
    () =>
      console.log(
        sortFilter,
        searchTitleFilter,
        searchLinkFilter,
        searchDescriptionFilter,
        favoriteFilter,
        cakeFilter,
        cupcakeFilter,
        pieFilter
      ),
    [
      sortFilter,
      searchTitleFilter,
      searchLinkFilter,
      searchDescriptionFilter,
      favoriteFilter,
      cakeFilter,
      cupcakeFilter,
      pieFilter,
    ]
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        sortFilter={sortFilter}
        searchTitleFilter={searchTitleFilter}
        searchLinkFilter={searchLinkFilter}
        searchDescriptionFilter={searchDescriptionFilter}
        favoriteFilter={favoriteFilter}
        cakeFilter={cakeFilter}
        cupcakeFilter={cupcakeFilter}
        pieFilter={pieFilter}
        setSortFilter={setSortFilter}
        setSearchTitleFilter={setSearchTitleFilter}
        setSearchLinkFilter={setSearchLinkFilter}
        setSearchDescriptionFilter={setSearchDescriptionFilter}
        setFavoriteFilter={setFavoriteFilter}
        setCakeFilter={setCakeFilter}
        setCupcakeFilter={setCupcakeFilter}
        setPieFilter={setPieFilter}
      />
      <RecipeList />
      <AddRecipeButton />
    </SafeAreaView>
  );
}
