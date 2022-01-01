import React from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const CustomItem = (props) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Image
            source={{ uri: props.imageUrl }}
            style={{ height: 75, width: 100 }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 20, padding: 10 }}>{props.title}</Text>
          <Text style={{ fontSize: 20, padding: 10 }}>$ {props.price}.00</Text>
        </View>
        <Pressable
          style={{
            borderRadius: 20,
            backgroundColor: "#a0a1a3",
            height: 50,
            width: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={props.addOrderList.bind(this, props.title, props.price)}
        >
          <Icon size={25} name={"add"} color={"white"} />
        </Pressable>
      </View>
    </View>
  );
};

export default CustomItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    width: "95%",
    height: 100,
    padding: 10,
    margin: 10,
    alignContent: "center",
    backgroundColor: "pink",
    elevation: 5,
  },
});
