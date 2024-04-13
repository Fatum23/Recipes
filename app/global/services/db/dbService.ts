import * as sqlite from "expo-sqlite";
import { TypeFilter, TypeRecipe, TypeSortFilter } from "../../types/gTypes";
import { Dispatch, SetStateAction } from "react";

const db = sqlite.openDatabase("recipes.db");

export const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(`CREATE TABLE IF NOT EXISTS recipes(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      link TEXT,
      description TEXT,
      filters TEXT,
      addDate TEXT,
      editDate TEXT
    )`);
    tx.executeSql(`CREATE TABLE IF NOT EXISTS filters(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      count INTEGER
    )`);
  });
  getFilters("Понравившиеся", (filters: TypeFilter[]) => {
    if (filters.length === 0) {
      addFilter("Понравившиеся");
    }
  });
};

export const addRecipe = (recipe: TypeRecipe) => {
  console.log(recipe.filters);
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO recipes (title, link, description, filters, addDate, editDate) VALUES (?, ?, ?, ?, ?, ?)",
      [
        recipe.title,
        recipe.link,
        recipe.description,
        recipe.filters,
        recipe.addDate,
        recipe.editDate,
      ],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) {
          JSON.parse(recipe.filters).forEach((filter: string) =>
            editFilter(filter, "increase")
          );
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
  recipeTypeFilters: string[],
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
    tx.executeSql(
      query,
      params,
      (_, { rows }) => {
        const recipes: TypeRecipe[] = rows._array;
        if (recipeTypeFilters.length === 0) {
          successCallback(recipes);
        } else {
          let filteredRecipes: TypeRecipe[] = [];
          recipes.forEach((recipe) => {
            if (
              recipeTypeFilters.every((filter) =>
                JSON.parse(recipe.filters).includes(filter)
              )
            ) {
              filteredRecipes.push(recipe);
            }
          });
          successCallback(filteredRecipes);
        }
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
  filters: string,
  setRecipesFetched: Dispatch<SetStateAction<boolean>>
) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE recipes SET filters = ? WHERE id = ?",
      [
        JSON.stringify(
          JSON.parse(filters).includes("Понравившиеся")
            ? JSON.parse(filters).filter(
                (filter: string) => filter !== "Понравившиеся"
              )
            : JSON.parse(filters).concat("Понравившиеся")
        ),
        id,
      ],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          editFilter(
            "Понравившиеся",
            JSON.parse(filters).includes("Понравившиеся")
              ? "decrease"
              : "increase"
          );
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
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM recipes WHERE id = ?",
      [recipe.id!],
      (_, { rows }) => {
        const filters = JSON.parse(rows._array[0].filters);
        console.log(filters);
        filters.forEach((filter: string) => editFilter(filter, "decrease"));
      },
      (_, error) => {
        console.log(error);
        return false;
      }
    );
    tx.executeSql(
      "UPDATE recipes SET title = ?, link = ?, description = ?, filters = ?, addDate = ?, editDate = ?  WHERE id = ?",
      [
        recipe.title,
        recipe.link,
        recipe.description,
        recipe.filters,
        recipe.addDate,
        recipe.editDate,
        recipe.id!,
      ],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          JSON.parse(recipe.filters).forEach((filter: string) =>
            editFilter(filter, "increase")
          );
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
  filters: string,
  setRecipesFetched: Dispatch<SetStateAction<boolean>>
) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM recipes WHERE id = ?",
      [id],
      (tx, result) => {
        JSON.parse(filters).forEach((filter: string) =>
          editFilter(filter, "decrease")
        );
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

export const checkRecipeExists = (
  key: "Название" | "Ссылка",
  value: string,
  setWarning: Dispatch<SetStateAction<string>>
) => {
  const sqlKey = key === "Название" ? "title" : "link";

  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM recipes WHERE " + sqlKey + " = ?",
      [value],
      (_, { rows }) => {
        const recipes: TypeRecipe[] = rows._array;
        if (recipes.length !== 0 && value !== "") {
          setWarning(
            "Рецепт с " +
              (key === "Название" ? "таким названием" : "такой ссылкой") +
              " уже существует"
          );
        } else {
          setWarning("");
        }
      },
      (_, error) => {
        console.log(error);
        return false;
      }
    );
  });
};

export const addFilter = (title: string) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO filters (title, count) VALUES (?, ?)",
      [title, 0],
      (_, { rowsAffected }) => {
        console.log(
          rowsAffected > 0
            ? "Filters updated successfully"
            : "Filters didn't update"
        );
      },
      (_, error) => {
        console.log(error);
        return false;
      }
    );
  });
};

export const getFilters = (
  search: string,
  successCallback: (filters: TypeFilter[]) => void
) => {
  let query: string = "SELECT * FROM filters";
  let params: any[] = [];

  if (search !== "") {
    query += " WHERE title LIKE '%' || ? || '%'";
    params.push(search);
  }
  db.transaction((tx) => {
    tx.executeSql(
      query,
      params,
      (_, { rows }) => {
        successCallback(rows._array);
      },
      (_, error) => {
        console.log(error);
        return false;
      }
    );
  });
};

export const checkFilterExists = (
  title: string,
  successCallback: (filters: TypeFilter[]) => void
) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM filters WHERE title = ?",
      [title],
      (_, { rows }) => {
        successCallback(rows._array);
      },
      (_, error) => {
        console.log(error);
        return false;
      }
    );
  });
};

export const getFilterCount = (
  title: string,
  successCallback: (count: number) => void
) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM filters WHERE title = ?",
      [title],
      (_, { rows }) => {
        successCallback(rows._array[0]["count"]);
      },
      (_, error) => {
        console.log(error);
        return false;
      }
    );
  });
};

export const editFilter = (title: string, editWay: "increase" | "decrease") => {
  let count: number = 0;
  getFilterCount(title, (result: number) => (count = result));
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE filters SET count = ? WHERE title = ?",
      [editWay === "increase" ? count + 1 : count - 1, title],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          console.log("Filter updated successfully");
        } else {
          console.log("Filter not updated");
        }
      },
      (_, err: sqlite.SQLError) => {
        console.log(err);
        return false;
      }
    );
  });
};

export const deleteFilter = (
  id: number,
  title: string,
  setFiltersFetched: Dispatch<SetStateAction<boolean>>,
  setRecipesFetched: Dispatch<SetStateAction<boolean>>
) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM filters WHERE id = ?",
      [id],
      (tx, result) => {
        if (result.rowsAffected > 0) {
          console.log("Filter deleted successfully");
        } else {
          console.log("Filter not found");
        }
      },
      (tx, error) => {
        console.log(error);
        return false;
      }
    );
    tx.executeSql(
      "SELECT * FROM recipes WHERE filters LIKE '%' || ? || '%'",
      [title],
      (_, { rows }) => {
        rows._array.forEach((recipe: TypeRecipe) =>
          deleteFilterFromRecipe(recipe.id!, recipe.filters, title)
        );
        setFiltersFetched(false);
        setRecipesFetched(false);
      },
      (_, error) => {
        console.log(error);
        return false;
      }
    );
  });
};

const deleteFilterFromRecipe = (
  recipeId: number,
  recipeFilters: string,
  filter: string
) => {
  const updatedFilters: string[] = JSON.parse(recipeFilters).filter(
    (recipeFilter: string) => recipeFilter != filter
  );
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE recipes SET filters = ? WHERE id = ?",
      [JSON.stringify(updatedFilters), recipeId],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          console.log("Recipe filters updated successfully");
        } else {
          console.log("Recipe filters not updated");
        }
      },
      (_, err: sqlite.SQLError) => {
        console.log(err);
        return false;
      }
    );
  });
};
