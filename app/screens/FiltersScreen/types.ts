import { Dispatch, SetStateAction } from "react";

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
