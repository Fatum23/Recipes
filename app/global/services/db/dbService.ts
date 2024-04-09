import * as sqlite from "expo-sqlite";
import { TypeRecipe, TypeSortFilter } from "../../types/gTypes";
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
  sortFilter: TypeSortFilter,
  searchTitleFilter: string,
  searchLinkFilter: string,
  searchDescriptionFilter: string,
  successCallback: (recipes: TypeRecipe[]) => void,
  errorCallback: (error: sqlite.SQLError) => void
) => {
  let query = "SELECT * FROM recipes ";
  let params = [];
  let conditions = [];

  if (searchTitleFilter !== "") {
    conditions.push(`WHERE title LIKE '%' || ? || '%'`);
    params.push(searchTitleFilter);
  }
  if (searchLinkFilter !== "") {
    conditions.push(`WHERE link LIKE '%' || ? || '%'`);
    params.push(searchLinkFilter);
  }
  if (searchDescriptionFilter !== "") {
    conditions.push(`WHERE description LIKE '%' || ? || '%'`);
    params.push(searchDescriptionFilter);
  }

  if (conditions.length > 0) {
    query += conditions.join(" AND ");
  }

  if (sortFilter === "От новых к старым") {
    query += " ORDER BY id DESC";
  }
  if (sortFilter === "От старых к новым") {
    query += " ORDER BY id ASC";
  }
  if (sortFilter === "А-Я") {
    query +=
      " ORDER BY CASE WHEN title GLOB '[0-9]*' THEN 2 ELSE 1 END, LOWER(title) ASC";
  }
  if (sortFilter === "Я-А") {
    query +=
      " ORDER BY CASE WHEN title GLOB '[0-9]*' THEN 2 ELSE 1 END, LOWER(title) DESC";
  }
  db.transaction((tx) => {
    console.log(query);
    tx.executeSql(
      query,
      params,
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
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE recipes SET favorite = ? WHERE id = ?",
      [Number(like), id],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          setRecipesFetched(false);
          console.log("Row updated successfully");
        } else {
          console.log("No rows updated");
        }
      },
      (_, err: sqlite.SQLError) => {
        console.log(err);
        return false;
      }
    );
  });
};

export const editRecipe = (
  recipe: TypeRecipe,
  setRecipesFetched: Dispatch<SetStateAction<boolean>>
) => {
  console.log(recipe);
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE recipes SET title = ?, link = ?, description = ?, favorite = ?, cake = ?, cupcake = ?, pie = ?, addDate = ?, editDate = ?  WHERE id = ?",
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
        recipe.id!,
      ],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          setRecipesFetched(false);
          console.log("Row updated successfully");
        } else {
          console.log("No rows updated");
        }
      },
      (_, err: sqlite.SQLError) => {
        console.log(err);
        return false;
      }
    );
  });
};

export const deleteRecipe = (
  id: number,
  setRecipesFetched: Dispatch<SetStateAction<boolean>>
) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM recipes WHERE id = ?",
      [id],
      (tx, result) => {
        if (result.rowsAffected > 0) {
          setRecipesFetched(false);
        } else {
          console.log("Recipe not found");
        }
      },
      (tx, error) => {
        console.log(error);
        return false;
      }
    );
  });
};
