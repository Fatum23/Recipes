import { SafeAreaView } from "react-native-safe-area-context";
import React, { useDebugValue, useEffect, useState } from "react";
import ScreenHeader from "../../global/components/ScreenHeader";
import Inputs from "./components/Inputs";
import AddRecipeButton from "./components/AddRecipeButton";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackParamList } from "../../global/types/gTypes";
import FiltersContainer from "../../global/components/Filters/FiltersContainer";

export default function AddRecipeScreen({
  route,
}: {
  route: RouteProp<StackParamList, "AddRecipe">;
}) {
  const navigation = useNavigation();
  const [title, setTitle] = useState(route.params.title);
  const [link, setLink] = useState(route.params.link);
  const [description, setDescription] = useState(route.params.description);

  const [recipeTypeFilters, setRecipeTypeFilters] = useState<string[]>(
    route.params.filters
  );

  const [titleWarning, setTitleWarning] = useState("");
  const [linkWarning, setLinkWarning] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScreenHeader
        navigation={navigation}
        title={route.params.action + " рецепт"}
      />
      <Inputs
        title={title}
        link={link}
        description={description}
        setTitle={setTitle}
        setLink={setLink}
        setDescription={setDescription}
        titleWarning={titleWarning}
        linkWarning={linkWarning}
        setTitleWarning={setTitleWarning}
        setLinkWarning={setLinkWarning}
      />
      <FiltersContainer
        activeFilters={recipeTypeFilters}
        setActiveFilters={setRecipeTypeFilters}
      />
      <AddRecipeButton
        action={route.params.action}
        id={
          route.params.action === "Редактировать" ? route.params.id! : undefined
        }
        addDate={route.params.addDate}
        navigation={navigation}
        title={title}
        link={link}
        description={description}
        filters={recipeTypeFilters}
        setTitle={setTitle}
        setLink={setLink}
        setDescription={setDescription}
        setTitleWarning={setTitleWarning}
        setRecipesFetched={route.params.setRecipesFetched}
      />
    </SafeAreaView>
  );
}
