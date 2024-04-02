import { SafeAreaView } from "react-native-safe-area-context";
import React, { useDebugValue, useEffect, useState } from "react";
import Header from "./components/Header";
import Inputs from "./components/Inputs";
import Filters from "./components/Filters";
import AddRecipeButton from "./components/AddRecipeButton";

export default function AddRecipeScreen({ navigation }: { navigation: any }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  const [favorite, setFavorite] = useState(false);
  const [cakes, setCakes] = useState(false);
  const [pies, setPies] = useState(false);
  const [cupcakes, setCupcakes] = useState(false);

  const [titleWarning, setTitleWarning] = useState("");
  const [linkWarning, setLinkWarning] = useState("");

  useEffect(() => {
    console.log(title, link, description, favorite, cakes, pies, cupcakes);
  }, [title, link, description, favorite, cakes, pies, cupcakes]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header navigation={navigation} />
      <Inputs
        title={title}
        link={link}
        description={description}
        setTitle={setTitle}
        setLink={setLink}
        setDescription={setDescription}
        titleWarning={titleWarning}
        linkWarning={linkWarning}
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
        titleWarning={titleWarning}
        linkWarning={linkWarning}
        setTitleWarning={setTitleWarning}
        setLinkWarning={setLinkWarning}
      />
    </SafeAreaView>
  );
}
