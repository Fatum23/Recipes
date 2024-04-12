import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
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
  recipeTypeFilters: string[];
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
          props.recipeTypeFilters.length === 0
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
            props.recipeTypeFilters.length !== 0)
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
        showsVerticalScrollIndicator={true} // Enable the scrollbar on Android
        scrollIndicatorInsets={{ right: 10 }}
        data={props.recipes}
        windowSize={2}
        initialNumToRender={50}
        maxToRenderPerBatch={50}
        renderItem={({ item, index }: { item: TypeRecipe; index: number }) => (
          <RecipeCard
            id={item.id}
            title={typeof JSON.parse(item.filters)}
            link={item.link}
            description={item.description}
            filters={item.filters}
            addDate={item.addDate}
            editDate={item.editDate}
            marginBottom={index + 1 === props.recipes.length}
            loading={props.loading}
            setRecipesFetched={props.setRecipesFetched}
            searchTitleFilter={props.searchTitleFilter}
            searchLinkFilter={props.searchLinkFilter}
            searchDescriptionFilter={props.searchDescriptionFilter}
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
