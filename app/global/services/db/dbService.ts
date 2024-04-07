import * as sqlite from "expo-sqlite";
import { TypeRecipe } from "../../types/gTypes";

const db = sqlite.openDatabase("recipes.db");

export const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(`CREATE TABLE IF NOT EXISTS recipes(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      link TEXT,
      description TEXT,
      favorite INTEGER NULL,
      cake INTEGER NULL,
      cupcake INTEGER NULL,
      pie INTEGER NULL
    )`);
  });
};

export const addRecipe = (recipe: TypeRecipe) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO recipes (title, link, description, favorite, cake, cupcake, pie) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        recipe.title,
        recipe.link,
        recipe.description,
        recipe.favorite !== null ? Number(recipe.favorite) : null,
        recipe.cake !== null ? Number(recipe.cake) : null,
        recipe.cupcake !== null ? Number(recipe.cupcake) : null,
        recipe.pie !== null ? Number(recipe.pie) : null,
      ],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) {
          console.log("Recipe added successfully");
        } else {
          console.log("Failed to add recipe");
        }
      },
      (_, error) => {
        console.log(error);
        return false;
      }
    );
  });
};

export const getRecipes = (
  successCallback: (recipes: TypeRecipe[]) => void,
  errorCallback: (error: sqlite.SQLError) => void
) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM recipes",
      [],
      (_, { rows }) => {
        const recipes: TypeRecipe[] = rows._array;
        successCallback(recipes);
      },
      (_, error) => {
        errorCallback(error);
        return false;
      }
    );
  });
};
