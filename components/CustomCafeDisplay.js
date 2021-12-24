import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

const CustomCafeDisplay = (props) => {
  const imageUrl = props.imageUrl;
  const title = props.title;
  const description = props.description;
  const rating = props.rating;
  return (
    <Pressable
      style={{ width: "100%", height: 400 }}
      onPress={props.showDetails.bind(
        this,
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
          <Text style={{ fontSize: 20, color: "black" }}>
            {rating} / 5 Rating
          </Text>
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
