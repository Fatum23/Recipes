import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState, useMemo } from "react";
import Header from "./components/Header";
import AddRecipeButton from "./components/AddRecipeButton";
import RecipeList from "./components/RecipeList";

import { TypeRecipe, TypeSortFilter } from "../../global/types/gTypes";
import * as db from "../../global/services/db/dbService";
import { SQLError } from "expo-sqlite";

export default function MainScreen() {
  const [sortFilter, setSortFilter] =
    useState<TypeSortFilter>("От новых к старым");

  const [searchTitleFilter, setSearchTitleFilter] = useState<string>("");
  const [searchLinkFilter, setSearchLinkFilter] = useState<string>("");
  const [searchDescriptionFilter, setSearchDescriptionFilter] =
    useState<string>("");

  const [recipeTypeFilters, setRecipeTypeFilters] = useState<string[]>([]);

  const [recipes, setRecipes] = useState<TypeRecipe[]>([]);
  const [recipesFetched, setRecipesFetched] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    db.createTable();
    setRecipesFetched(false);
  }, []);

  useEffect(
    () => setRecipesFetched(false),
    [
      sortFilter,
      searchTitleFilter,
      searchLinkFilter,
      searchDescriptionFilter,
      recipeTypeFilters,
    ]
  );

  useEffect(() => {
    if (recipesFetched === false) {
      setLoading(true);
      db.getRecipes(
        sortFilter,
        searchTitleFilter,
        searchLinkFilter,
        searchDescriptionFilter,
        recipeTypeFilters,
        (recipes: TypeRecipe[]) => {
          setRecipes(recipes);
          setRecipesFetched(true);
          setLoading(false);
        },
        (error: SQLError) => {
          console.log("Failed to fetch recipes:", error);
        }
      );
    }
  }, [recipesFetched]);

  const memoizedRecipes = useMemo(() => recipes, [recipes]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        sortFilter={sortFilter}
        searchTitleFilter={searchTitleFilter}
        searchLinkFilter={searchLinkFilter}
        searchDescriptionFilter={searchDescriptionFilter}
        recipeTypeFilters={recipeTypeFilters}
        setSortFilter={setSortFilter}
        setSearchTitleFilter={setSearchTitleFilter}
        setSearchLinkFilter={setSearchLinkFilter}
        setSearchDescriptionFilter={setSearchDescriptionFilter}
        setRecipeTypeFilters={setRecipeTypeFilters}
        setRecipesFetched={setRecipesFetched}
      />
      <RecipeList
        loading={loading}
        recipes={memoizedRecipes}
        setRecipesFetched={setRecipesFetched}
        sortFilter={sortFilter}
        searchTitleFilter={searchTitleFilter}
        searchLinkFilter={searchLinkFilter}
        searchDescriptionFilter={searchDescriptionFilter}
        recipeTypeFilters={recipeTypeFilters}
      />
      <AddRecipeButton setGetRecipe={setRecipesFetched} />
    </SafeAreaView>
  );
}
