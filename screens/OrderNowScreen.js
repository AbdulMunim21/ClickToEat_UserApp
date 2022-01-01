import React, { useEffect } from "react";
import { View, StyleSheet, Text, Pressable, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";

const OrderNowScreen = (props) => {
  const orders = props.route.params.orders;
  const cafeId = props.route.params.cafeId;
  const API_ENDPOINT = "https://clicktoeat-b46f5-default-rtdb.firebaseio.com/";

  const addOrder = async () => {
    const userData = await AsyncStorage.getItem("userData");
    const jsonData = JSON.parse(userData);
    var totalPrice = 0;
    const localId = jsonData.localId;
    for (var key in orders) {
      totalPrice += orders[key].itemPrice;
    }

    await axios.post(`${API_ENDPOINT}orders/${cafeId}/${localId}.json`, {
      cafeId: cafeId,
      userId: localId,
      orders: orders,
      totalPrice: totalPrice,
      status: "preparing",
    });

    props.navigation.setParams({ cafeId: cafeId, localId: localId });
    props.navigation.navigate("OrderStatusScreen", {
      cafeId: cafeId,
      
    });
  };

  return orders ? (
    <View
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "100%",
          height: 50,
          elevation: 4,
          backgroundColor: "#edabab",
        }}
      ></View>
      <FlatList
        data={orders}
        keyExtractor={(item, index) => {
          return index;
        }}
        renderItem={(itemData) => {
          return (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "75%",
              }}
            >
              <Text>{itemData.item.itemName}</Text>
              <Text>$ {itemData.item.itemPrice}</Text>
            </View>
          );
        }}
      />
      <Pressable
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",

          backgroundColor: "blue",
          height: 50,
        }}
        onPress={addOrder}
      >
        <Text style={{ color: "white", fontSize: 20 }}>Order Now</Text>
      </Pressable>
    </View>
  ) : (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>No Orders</Text>
      {/* <Image source={{ uri: food }} style={{ width: 50, height: 50 }} /> */}
    </View>
  );
};

export default OrderNowScreen;

export const screenOptions = (navData) => {
  const cafeId = navData.route.params.cafeId;
  const localId = navData.route.params.localId;
  return {
    headerRight: () => {
      return (
        <Pressable
          onPress={() => {
            navData.navigation.navigate("OrderStatusScreen", {
              cafeId: cafeId,
              localId: localId,
            });
          }}
        >
          <Icon name="file-tray" color={"black"} size={30} />
        </Pressable>
      );
    },
  };
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
