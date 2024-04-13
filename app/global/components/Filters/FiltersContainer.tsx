import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AntDesign } from "@expo/vector-icons";

import * as db from "../../services/db/dbService";
import { TypeFilter } from "../../types/gTypes";
import { gColors } from "../../styles/gColors";
import FilterComponent from "./FilterComponent";
import ModalComponent from "./ModalComponent";

export default function FiltersContainer(props: {
  activeFilters: string[];
  setActiveFilters: Dispatch<SetStateAction<string[]>>;
  setRecipesFetched: Dispatch<SetStateAction<boolean>>;
}) {
  const [filters, setFilters] = useState<TypeFilter[]>([]);
  const memoizedFilters = useMemo(() => filters, [filters]);
  const [filtersFetched, setFiltersFetched] = useState<boolean>(true);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => setFiltersFetched(false), []);
  useEffect(() => setFiltersFetched(false), [search]);

  useEffect(() => {
    if (filtersFetched === false) {
      db.getFilters(search, (result: TypeFilter[]) => {
        setFilters(result);
        setFiltersFetched(true);
      });
    }
  }, [filtersFetched]);

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Найти фильтр..."
          onChangeText={(text) => setSearch(text)}
          defaultValue={search}
        />
      </View>
      <View style={styles.addFilterView}>
        <TouchableOpacity
          style={styles.addFilter}
          activeOpacity={0.4}
          onPress={() => setModalVisible(true)}
        >
          <AntDesign name="plus" size={24} color={gColors.green} />
          <Text style={{ color: gColors.green, fontWeight: "500" }}>
            Добавить фильтр
          </Text>
        </TouchableOpacity>
      </View>
      <ModalComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setFiltersFetched={setFiltersFetched}
      />
      {filters.length === 0 && search !== "" ? (
        <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 20 }}>
          Такие фильтры не найдены...
        </Text>
      ) : (
        <View style={{ alignItems: "flex-start" }}>
          <FlatList
            horizontal
            style={styles.filtersView}
            removeClippedSubviews={false}
            showsVerticalScrollIndicator={true}
            data={memoizedFilters}
            windowSize={2}
            initialNumToRender={50}
            maxToRenderPerBatch={50}
            renderItem={({ item }) => (
              <FilterComponent
                key={item.id!.toString()}
                id={item.id!}
                title={item.title}
                count={item.count}
                active={props.activeFilters.includes(item.title)}
                handleClick={(title: string, deleting: boolean) =>
                  props.setActiveFilters((prevState) => {
                    if (props.activeFilters.includes(title)) {
                      return prevState.filter((filter) => filter !== title);
                    } else if (!deleting) {
                      return prevState.concat(title);
                    }
                    return prevState;
                  })
                }
                setFiltersFetched={setFiltersFetched}
                setRecipesFetched={props.setRecipesFetched}
              />
            )}
            automaticallyAdjustsScrollIndicatorInsets={false}
            keyExtractor={(item) => item.id!.toString()}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 180,
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    padding: 5,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: gColors.green,
    borderRadius: 10,
    width: 200,
    height: 40,
    marginRight: 10,
  },
  addFilterView: {
    alignSelf: "flex-start",
    marginTop: 10,
  },
  addFilter: {
    padding: 10,
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  filtersView: {
    marginTop: 20,
    paddingBottom: 20,
  },
});
