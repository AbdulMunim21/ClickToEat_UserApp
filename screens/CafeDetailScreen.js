import axios from "axios";
import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

const CafeDetailScreen = (props) => {
  const id = props.route.params.cafeId;
  const title = props.route.params.title;
  const description = props.route.params.description;
  const imageUrl = props.route.params.imageUrl;
  const rating = props.route.params.rating;
  const API_ENDPOINT = "https://clicktoeat-b46f5-default-rtdb.firebaseio.com/";

  useEffect(async () => {
    const response = await axios.get(`${API_ENDPOINT}cafe/${id}.json`);
    const resData = response.data;
  }, []);
  return (
    <View style={styles.root}>
      <Text>{props.route.params.title}</Text>
    </View>
  );
};

export default CafeDetailScreen;

export const screenOptions = (navData) => {
  const title = navData.route.params.title;

  return {
    title: title,
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
