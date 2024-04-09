import * as sqlite from "expo-sqlite";
import { TypeRecipe } from "../../types/gTypes";
import { Dispatch, SetStateAction } from "react";

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
      pie INTEGER NULL,
      addDate TEXT,
      editDate TEXT
    )`);
  });
};

export const addRecipe = (recipe: TypeRecipe) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO recipes (title, link, description, favorite, cake, cupcake, pie, addDate, editDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        recipe.title,
        recipe.link,
        recipe.description,
        Number(recipe.favorite),
        Number(recipe.cake),
        Number(recipe.cupcake),
        Number(recipe.pie),
        recipe.addDate,
        recipe.editDate,
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
  search: string,
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

export const likeRecipe = async (
  id: number,
  like: boolean,
  setRecipesFetched: Dispatch<SetStateAction<boolean>>
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE recipes SET favorite = ? WHERE id = ?',
        [Number(like), id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            resolve('Row updated successfully');
          } else {
            resolve('No rows updated');
          }
        },
        (err) => {
          reject(new Error('Error updating row: ' + err.message));
        }
      );
    });
  });
};
