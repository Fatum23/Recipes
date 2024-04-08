import { SafeAreaView } from "react-native-safe-area-context";
import React, { useDebugValue, useEffect, useState } from "react";
import ScreenHeader from "../../global/components/ScreenHeader";
import Inputs from "./components/Inputs";
import Filters from "./components/Filters";
import AddRecipeButton from "./components/AddRecipeButton";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackParamList } from "../../global/types/gTypes";

export default function AddRecipeScreen({route}: {route: RouteProp<StackParamList, "AddRecipe">}) {
  const navigation = useNavigation()
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  const [favorite, setFavorite] = useState(false);
  const [cakes, setCakes] = useState(false);
  const [pies, setPies] = useState(false);
  const [cupcakes, setCupcakes] = useState(false);

  const [titleWarning, setTitleWarning] = useState("");
  const [linkWarning, setLinkWarning] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScreenHeader navigation={navigation} title="Добавить рецепт" />
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
      <Filters
        favorite={favorite}
        cakes={cakes}
        pies={pies}
        cupcakes={cupcakes}
        setFavorite={setFavorite}
        setCakes={setCakes}
        setPies={setPies}
        setCupcakes={setCupcakes}
      />
      <AddRecipeButton
        navigation={navigation}
        title={title}
        link={link}
        description={description}
        favorite={favorite}
        cakes={cakes}
        pies={pies}
        cupcakes={cupcakes}
        setTitle={setTitle}
        setLink={setLink}
        setDescription={setDescription}
        setTitleWarning={setTitleWarning}
        setGetRecipes={route.params.setGetRecipes}
      />
    </SafeAreaView>
  );
}
