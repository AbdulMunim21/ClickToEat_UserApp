import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  StyleSheet,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import axios from "axios";
import CafeModel from "../models/CafeModel";
import Icon from "react-native-vector-icons/Ionicons";
import CustomCafeDisplay from "../components/CustomCafeDisplay";

const DashBoardScreen = (props) => {
  const [cafeList, setCafeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const API_ENDPOINT = "https://clicktoeat-b46f5-default-rtdb.firebaseio.com/";
  useEffect(async () => {
    var response = await axios.get(`${API_ENDPOINT}cafe.json`);
    const resData = response.data;
    console.log(resData);
    const ListOfCafe = [];
    for (var key in resData) {
      const id = key;
      const title = resData[key].title;
      const description = resData[key].description;
      const imageUrl = resData[key].imageUrl;
      const rating = resData[key].rating;
      var cafe = new CafeModel(
        id,
        title,
        description,
        imageUrl,
        rating
        // listOfItems
      );

      ListOfCafe.push(cafe);
    }
    console.log("HEEHEE" + ListOfCafe);
    setCafeList(ListOfCafe);
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
        <ActivityIndicator size={50} color={"blue"} />
      ) : (
        <FlatList
          data={cafeList}
          style={{ width: "96%" }}
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

export default DashBoardScreen;

export const screenOptions = (navData) => {
  return {
    headerRight: () => {
      return (
        <Pressable
          onPress={async () => {
            await AsyncStorage.removeItem("userData");
            navData.navigation.replace("LoginScreen");
          }}
        >
          <Icon size={25} name={"exit"} />
        </Pressable>
      );
    },
  };
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
