import { RouteProp } from "@react-navigation/native";
import { Dispatch, SetStateAction } from "react";
export type TypeFilterScreen = {
  sortFilter: TypeSortFilter;
  searchTitleFilter: string;
  searchLinkFilter: string;
  searchDescriptionFilter: string;
  favoriteFilter: boolean | null;
  cakeFilter: boolean | null;
  pieFilter: boolean | null;
  cupcakeFilter: boolean | null;
  setSortFilter: Dispatch<SetStateAction<TypeSortFilter>>;
  setSearchTitleFilter: Dispatch<SetStateAction<string>>;
  setSearchLinkFilter: Dispatch<SetStateAction<string>>;
  setSearchDescriptionFilter: Dispatch<SetStateAction<string>>;
  setFavoriteFilter: Dispatch<SetStateAction<boolean | null>>;
  setCakeFilter: Dispatch<SetStateAction<boolean | null>>;
  setCupcakeFilter: Dispatch<SetStateAction<boolean | null>>
  setPieFilter: Dispatch<SetStateAction<boolean | null>>;
};

export type TypeSortFilter =
  | "А-Я"
  | "Я-А"
  | "От новых к старым"
  | "От старых к новым";

export type TypeRoute = RouteProp<{ params: TypeFilterScreen }, 'params'>