import { Dispatch, SetStateAction } from "react";
import { TypeFilterScreen, TypeSortFilter } from "../../global/types/gTypes";

export type TypeRecipeTypeFilters = {
  favorite: boolean | null;
  cakes: boolean | null;
  pies: boolean | null;
  cupcakes: boolean | null;
  setFavorite: Dispatch<SetStateAction<boolean | null>>;
  setCakes: Dispatch<SetStateAction<boolean | null>>;
  setPies: Dispatch<SetStateAction<boolean | null>>;
  setCupcakes: Dispatch<SetStateAction<boolean | null>>;
};

export type TypeBottomButtons = TypeFilterScreen & {
  setLocalSortFilter: Dispatch<SetStateAction<TypeSortFilter>>;
  setLocalSearchTitleFilter: Dispatch<SetStateAction<string>>;
  setLocalSearchLinkFilter: Dispatch<SetStateAction<string>>;
  setLocalSearchDescriptionFilter: Dispatch<SetStateAction<string>>;
  setActiveFilters: Dispatch<SetStateAction<string[]>>;
};
