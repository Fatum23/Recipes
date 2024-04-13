import { SafeAreaView } from "react-native-safe-area-context";
import React, { useDebugValue, useEffect, useState } from "react";
import ScreenHeader from "../../global/components/ScreenHeader";
import Inputs from "./components/Inputs";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackParamList } from "../../global/types/gTypes";
import FiltersContainer from "../../global/components/Filters/FiltersContainer";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import BottomButtons from "./components/BottomButtons";

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
    JSON.parse(route.params.filters)
  );

  const [titleWarning, setTitleWarning] = useState("");
  const [linkWarning, setLinkWarning] = useState("");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, flexDirection: "column" }}
      behavior="padding"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1, backgroundColor: "white" }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps={"always"}
        >
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
            setRecipesFetched={route.params.setRecipesFetched}
          />
          <BottomButtons
            action={route.params.action}
            id={
              route.params.action === "Редактировать"
                ? route.params.id!
                : undefined
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
            setRecipeTypeFilters={setRecipeTypeFilters}
            setTitleWarning={setTitleWarning}
            setLinkWarning={setLinkWarning}
            setRecipesFetched={route.params.setRecipesFetched}
          />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
