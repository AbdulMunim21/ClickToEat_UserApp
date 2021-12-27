import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomCafeDisplay from "../components/CustomCafeDisplay";

const API_ENDPOINT = "https://clicktoeat-b46f5-default-rtdb.firebaseio.com/";

const FavoriteCafeScreen = (props) => {
  const [favList, setFavList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(async () => {
    const asyncData = await AsyncStorage.getItem("userData");
    const JSON_AsyncData = JSON.parse(asyncData);
    const localId = JSON_AsyncData.localId;

    const favData = await axios.get(
      `${API_ENDPOINT}users/${localId}/favorite.json`
    );

    const parsedData = favData.data;
    const favCafeList = [];
    for (const key in parsedData) {
      favCafeList.push({ id: key, cafe: parsedData[key].favoriteCafe });
    }

    const originalData = [];

    for (var i = 0; i < favCafeList.length; i++) {
      const response = await axios.get(
        `${API_ENDPOINT}cafe/${favCafeList[i].cafe}.json`
      );
      const parsedCafeData = response.data;

      const id = favCafeList[i].cafe;
      const title = parsedCafeData.title;
      const imageUrl = parsedCafeData.imageUrl;
      const rating = parsedCafeData.rating;
      const description = parsedCafeData.description;

      originalData.push({
        id: id,
        title: title,
        imageUrl: imageUrl,
        rating: rating,
        description: description,
      });
    }

    console.log(originalData);
    setFavList(originalData);
    setIsLoading(false);
  }, []);

  const showDetails = (id, title, description, imageUrl, rating) => {
    props.navigation.navigate("CafeDetailScreen", {
      cafeId: id,
      imageUrl: imageUrl,
      title: title,
      description: description,
      rating: rating,
    });
  };
  return (
    <View style={styles.root}>
      {isLoading ? (
        <ActivityIndicator size={20} color={"blue"} />
      ) : (
        <FlatList
          data={favList}
          style={{ width: "80%" }}
          keyExtractor={(item, index) => {
            return index;
          }}
          renderItem={(itemData) => {
            return (
              <CustomCafeDisplay
                id={itemData.item.id}
                title={itemData.item.title}
                imageUrl={itemData.item.imageUrl}
                description={itemData.item.description}
                rating={itemData.item.rating}
                showDetails={showDetails}
              />
            );
          }}
        />
      )}
    </View>
  );
};

export default FavoriteCafeScreen;

export const screenOptions = (navData) => {
  return {};
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
