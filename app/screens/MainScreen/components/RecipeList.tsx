import {
  FlatList,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import RecipeCard from "./RecipeCard/RecipeCard";
import { gColors } from "../../../global/styles/gColors";

import { TypeRecipe, TypeSortFilter } from "../../../global/types/gTypes";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";

export default function RecipeList(props: {
  loading: boolean;
  recipes: TypeRecipe[];
  setRecipesFetched: Dispatch<SetStateAction<boolean>>;

  sortFilter: TypeSortFilter;
  searchTitleFilter: string;
  searchLinkFilter: string;
  searchDescriptionFilter: string;
  favoriteFilter: boolean | null;
  cakeFilter: boolean | null;
  pieFilter: boolean | null;
  cupcakeFilter: boolean | null;
}) {
  const recipesOpacity = useSharedValue(0);
  const recipesOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(props.loading ? 0 : 1, {
        duration: 150,
        easing: Easing.linear,
      }),
    };
  });

  const loadingOpacity = useSharedValue(1);
  const loadingOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(props.loading ? 1 : 0, {
        duration: 150,
        easing: Easing.linear,
      }),
    };
  });

  const noRecipesOpacity = useSharedValue(1);
  const noRecipesOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(
        !props.loading &&
          props.recipes.length === 0 &&
          props.sortFilter === "От новых к старым" &&
          props.searchTitleFilter === "" &&
          props.searchLinkFilter === "" &&
          props.searchDescriptionFilter === "" &&
          props.favoriteFilter === null &&
          props.cakeFilter === null &&
          props.cupcakeFilter === null &&
          props.pieFilter === null
          ? 1
          : 0,
        {
          duration: 150,
          easing: Easing.linear,
        }
      ),
    };
  });

  const noRecipesFoundOpacity = useSharedValue(0);
  const noRecipesFoundOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(
        !props.loading &&
          props.recipes.length === 0 &&
          (props.sortFilter !== "От новых к старым" ||
            props.searchTitleFilter !== "" ||
            props.searchLinkFilter !== "" ||
            props.searchDescriptionFilter !== "" ||
            props.favoriteFilter !== null ||
            props.cakeFilter !== null ||
            props.cupcakeFilter !== null ||
            props.pieFilter !== null)
          ? 1
          : 0,
        {
          duration: 150,
          easing: Easing.linear,
        }
      ),
    };
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <Animated.FlatList
        style={[styles.flatlist, recipesOpacityStyle]}
        contentContainerStyle={styles.content}
        removeClippedSubviews={false}
        data={props.recipes}
        windowSize={2}
        initialNumToRender={50}
        maxToRenderPerBatch={50}
        renderItem={({ item, index }) => (
          <RecipeCard
            id={item.id}
            title={item.title}
            link={item.link}
            description={item.description}
            favorite={item.favorite}
            cake={item.cake}
            cupcake={item.cupcake}
            pie={item.pie}
            addDate={item.addDate}
            editDate={item.editDate}
            marginBottom={index + 1 === props.recipes.length}
            setRecipesFetched={props.setRecipesFetched}
          />
        )}
        automaticallyAdjustsScrollIndicatorInsets={false}
        keyExtractor={(item) => item.id!.toString()}
      />
      <Animated.View style={[loadingOpacityStyle, { position: "absolute" }]}>
        <ActivityIndicator size={50} color={gColors.green} />
      </Animated.View>
      <Animated.View style={[noRecipesOpacityStyle, { position: "absolute" }]}>
        <Text style={styles.noRecipes}>Пока что нет рецептов...</Text>
      </Animated.View>
      <Animated.View
        style={[noRecipesFoundOpacityStyle, { position: "absolute" }]}
      >
        <Text style={styles.noRecipes}>Такие рецепты не найдены...</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  flatlist: {
    width: "100%",
    backgroundColor: "white",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  noRecipes: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
