import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const CustomCafeDisplay = (props) => {
  const id = props.id;
  const imageUrl = props.imageUrl;
  const title = props.title;
  const description = props.description;
  const rating = props.rating;
  const [stars, setStars] = useState([1, 2, 3, 4, 5]);

  // console.log(imageUrl);
  return (
    <Pressable
      style={{ width: "100%", height: 400 }}
      onPress={props.showDetails.bind(
        this,
        id,
        title,
        description,
        imageUrl,
        rating
      )}
    >
      <View style={styles.card}>
        <Image style={styles.imageStyle} source={{ uri: imageUrl }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "80%",
            margin: 20,
          }}
        >
          <Text style={{ fontSize: 20, color: "black" }}>{title}</Text>
          <View style={{ flexDirection: "row" }}>
            {stars.map((item, index) => {
              return item <= rating ? (
                <Icon key={index} name="ios-star"></Icon>
              ) : (
                <Icon key={index} name="ios-star-outline"></Icon>
              );
            })}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default CustomCafeDisplay;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 300,
    marginVertical: 20,
    backgroundColor: "#f5f0f0",
    elevation: 10,
    overflow: "hidden",
    borderRadius: 20,
  },
  imageStyle: {
    width: "100%",
    height: "75%",
    borderRadius: 20,
    overflow: "hidden",
  },
});
