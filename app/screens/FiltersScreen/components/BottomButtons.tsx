import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TypeFilterScreen } from "../../../global/types/gTypes";
import { gColors } from "../../../global/styles/gColors";
import { TypeBottomButtons } from "../types";
import { useNavigation } from "@react-navigation/native";

export default function BottomButtons(props: TypeBottomButtons) {
  const navigation = useNavigation();

  const handleDiscard = (props: TypeBottomButtons) => {
    props.setLocalSortFilter("От новых к старым");
    props.setLocalSearchLinkFilter("");
    props.setLocalSearchDescriptionFilter("");
    props.setLocalFavoriteFilter(null);
    props.setLocalCakeFilter(null);
    props.setLocalCupcakeFilter(null);
    props.setLocalPieFilter(null);
    props.setSortFilter("От новых к старым");
    props.setSearchLinkFilter("");
    props.setSearchDescriptionFilter("");
    props.setFavoriteFilter(null);
    props.setCakeFilter(null);
    props.setCupcakeFilter(null);
    props.setPieFilter(null);
  };
  const handleApply = (props: TypeFilterScreen) => {
    props.setSortFilter(props.sortFilter);
    props.setSearchLinkFilter(props.searchLinkFilter);
    props.setSearchDescriptionFilter(props.searchDescriptionFilter);
    props.setFavoriteFilter(props.favoriteFilter);
    props.setCakeFilter(props.cakeFilter);
    props.setCupcakeFilter(props.cupcakeFilter);
    props.setPieFilter(props.pieFilter);

    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.discardButton}
          activeOpacity={0.4}
          onPress={() => handleDiscard(props)}
        >
          <Text style={styles.discardText}>Сбросить все</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.applyButton}
          activeOpacity={0.4}
          onPress={() => handleApply(props)}
        >
          <Text style={styles.applyText}>Применить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
    alignItems: "center",
  },
  discardButton: {
    backgroundColor: "whitesmoke",
    paddingTop: 15,
    paddingRight: 20,
    paddingBottom: 15,
    paddingLeft: 20,
    borderRadius: 10,
  },
  applyButton: {
    marginTop: 10,
    backgroundColor: gColors.green,
    paddingTop: 15,
    paddingRight: 20,
    paddingBottom: 15,
    paddingLeft: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  discardText: {
    color: gColors.green,
    fontSize: 20,
    fontWeight: "600",
  },
  applyText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
});
