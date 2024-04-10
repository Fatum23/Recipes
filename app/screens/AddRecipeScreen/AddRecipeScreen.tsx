import { SafeAreaView } from "react-native-safe-area-context";
import React, { useDebugValue, useEffect, useState } from "react";
import ScreenHeader from "../../global/components/ScreenHeader";
import Inputs from "./components/Inputs";
import Filters from "./components/Filters";
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

  const [favorite, setFavorite] = useState(route.params.favorite);
  const [cakes, setCakes] = useState(route.params.cake);
  const [cupcakes, setCupcakes] = useState(route.params.cupcake);
  const [pies, setPies] = useState(route.params.pie);

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
      {/* <Filters
        favorite={favorite}
        cakes={cakes}
        pies={pies}
        cupcakes={cupcakes}
        setFavorite={setFavorite}
        setCakes={setCakes}
        setPies={setPies}
        setCupcakes={setCupcakes}
      /> */}
      <FiltersContainer />
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
        favorite={favorite}
        cakes={cakes}
        pies={pies}
        cupcakes={cupcakes}
        setTitle={setTitle}
        setLink={setLink}
        setDescription={setDescription}
        setTitleWarning={setTitleWarning}
        setRecipesFetched={route.params.setRecipesFetched}
      />
    </SafeAreaView>
  );
}
