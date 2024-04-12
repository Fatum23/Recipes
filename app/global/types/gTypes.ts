import { RouteProp } from "@react-navigation/native";
import { Dispatch, SetStateAction } from "react";

export type StackParamList = {
  Main: undefined;
  AddRecipe: {
    action: "Добавить" | "Редактировать";
    setRecipesFetched: Dispatch<SetStateAction<boolean>>;
  } & TypeRecipe;
  Filters: TypeFilterScreen;
};

export type TypeFilterScreen = {
  sortFilter: TypeSortFilter;
  searchTitleFilter: string;
  searchLinkFilter: string;
  searchDescriptionFilter: string;
  recipeTypeFilters: string[];
  setSortFilter: Dispatch<SetStateAction<TypeSortFilter>>;
  setSearchTitleFilter: Dispatch<SetStateAction<string>>;
  setSearchLinkFilter: Dispatch<SetStateAction<string>>;
  setSearchDescriptionFilter: Dispatch<SetStateAction<string>>;
  setRecipeTypeFilters: Dispatch<SetStateAction<string[]>>;
};

export type TypeSortFilter =
  | "А-Я"
  | "Я-А"
  | "От новых к старым"
  | "От старых к новым";

export type TypeRoute = RouteProp<{ params: TypeFilterScreen }, "params">;

export type TypeRecipe = {
  id?: number;
  title: string;
  link: string;
  description: string;
  filters: string[];
  addDate: string;
  editDate: string;
};

export type TypeFilter = {
  id?: number;
  title: string;
  count: number;
};
