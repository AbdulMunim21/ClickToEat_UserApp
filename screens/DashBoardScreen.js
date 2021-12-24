import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, Text, Button, FlatList } from "react-native";
import axios from "axios";
import CafeModel from "../models/CafeModel";
import CustomCafeDisplay from "../components/CustomCafeDisplay";

const DashBoardScreen = (props) => {
  const [cafeList, setCafeList] = useState([]);
  const API_ENDPOINT = "https://clicktoeat-b46f5-default-rtdb.firebaseio.com/";
  useEffect(async () => {
    var response = await axios.get(`${API_ENDPOINT}cafe.json`);
    const resData = response.data;
    const ListOfCafe = [];
    for (var key in resData) {
      const title = resData[key].title;
      const description = resData[key].description;
      const imageUrl = resData[key].imageUrl;
      const rating = resData[key].rating;
      var cafe = new CafeModel(
        title,
        description,
        imageUrl,
        rating
        // listOfItems
      );

      ListOfCafe.push(cafe);
    }
    setCafeList(ListOfCafe);
  }, []);

  const showDetails = (title,description,imageUrl,rating) => {
    props.navigation.navigate("CafeDetailScreen", {
      imageUrl: imageUrl,
      title: title,
      description: description,
      rating: rating,
    });
  };
  return (
    <View style={styles.root}>
      <FlatList
        data={cafeList}
        style={{ width: "96%" }}
        keyExtractor={(item, index) => {
          return index;
        }}
        renderItem={(itemData) => {
          return (
            <CustomCafeDisplay
              title={itemData.item.title}
              imageUrl={itemData.item.imageUrl}
              description={itemData.item.description}
              rating={itemData.item.rating}
              showDetails={showDetails}
            />
          );
        }}
      />
      {/* <Button
        title="Add Cafe"
        onPress={async () => {
          const title = "2 Cafe";
          const description = "Small Cafe";
          const imageUrl =
            "https://image.shutterstock.com/image-photo/blur-focus-interior-loft-style-600w-1918933985.jpg";
          const rating = "5";
          const listOfItems = [];

          await axios
            .post(`${API_ENDPOINT}cafe.json`, {
              title: title,
              description: description,
              imageUrl: imageUrl,
              rating: rating,
              // listOfItems: listOfItems,
            })
            .catch((e) => {
              console.error(e);
            });
        }}
      /> */}
    </View>
  );
};

export default DashBoardScreen;

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
