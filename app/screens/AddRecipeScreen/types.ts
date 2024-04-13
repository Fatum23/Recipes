import { Dispatch, SetStateAction } from "react";

export type TypeInputs = {
  title: string;
  link: string;
  description: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setLink: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;

  titleWarning: string;
  linkWarning: string;

  setTitleWarning: Dispatch<SetStateAction<string>>;
  setLinkWarning: Dispatch<SetStateAction<string>>;
};

export type TypeInputComponent = {
  title: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  setTitleWarning: Dispatch<SetStateAction<string>>;
  setLinkWarning: Dispatch<SetStateAction<string>>;
};

export type TypeFilters = {
  favorite: boolean;
  cakes: boolean;
  pies: boolean;
  cupcakes: boolean;
  setFavorite: Dispatch<SetStateAction<boolean>>;
  setCakes: Dispatch<SetStateAction<boolean>>;
  setPies: Dispatch<SetStateAction<boolean>>;
  setCupcakes: Dispatch<SetStateAction<boolean>>;
};

export type TypeAddRecipeButton = {
  navigation: any;
  id?: number;
  addDate: string;
  title: string;
  link: string;
  description: string;
  filters: string[];
  setTitle: Dispatch<SetStateAction<string>>;
  setLink: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  setRecipeTypeFilters: Dispatch<SetStateAction<string[]>>;
  setTitleWarning: Dispatch<SetStateAction<string>>;
  setLinkWarning: Dispatch<SetStateAction<string>>;
  setRecipesFetched: Dispatch<SetStateAction<boolean>>;
};
