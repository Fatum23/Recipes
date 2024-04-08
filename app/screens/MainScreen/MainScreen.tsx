import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
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

  const [favoriteFilter, setFavoriteFilter] = useState<boolean | null>(null);
  const [cakeFilter, setCakeFilter] = useState<boolean | null>(null);
  const [cupcakeFilter, setCupcakeFilter] = useState<boolean | null>(null);
  const [pieFilter, setPieFilter] = useState<boolean | null>(null);

  const [recipes, setRecipes] = useState<TypeRecipe[]>([]);
  const [getRecipes, setGetRecipes] = useState<boolean>(true);

  useEffect(() => {
    db.createTable()
    setGetRecipes(false)
  }, []);

  useEffect(() => {
    if (getRecipes === false) {
      db.getRecipes(
        (recipes: TypeRecipe[]) => {
          console.log("Fetched recipes:", recipes);
          setRecipes(recipes);
        },
        (error: SQLError) => {
          console.log("Failed to fetch recipes:", error);
        }
      );
      setGetRecipes(true);
    }
  }, [getRecipes])

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
      <RecipeList getRecipes={getRecipes} recipes={recipes} />
      <AddRecipeButton setGetRecipe={setGetRecipes} />
    </SafeAreaView>
  );
}
