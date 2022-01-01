import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Pressable,
  Image,
} from "react-native";
import axios from "axios";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_ENDPOINT = "https://clicktoeat-b46f5-default-rtdb.firebaseio.com/";
const OrderStatusScreen = (props) => {
  const cafeId = props.route.params.cafeId;
  const [isLoading, setIsLoading] = useState(true);
  const [orderBy, setOrderBy] = useState();
  const [cafeName, setCafeName] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [orderStatus, setOrderStatus] = useState("preparing");

  useEffect(async () => {
    const userData = await AsyncStorage.getItem("userData");
    const parsedData = JSON.parse(userData);
    const localId = parsedData.localId;
    const getData = await axios.get(
      `${API_ENDPOINT}orders/${cafeId}/${localId}.json`
      // "https://clicktoeat-b46f5-default-rtdb.firebaseio.com/orders/-MrgrX7jjSTfZYhWBvsT/IhwlzFVnoVeNOjffpzmwbKcL0b43.json"
    );
    const orderData = getData.data;
    const cafeData = await axios.get(`${API_ENDPOINT}cafe/${cafeId}.json`);
    const cafeName = cafeData.data.title;
    const cafeImageUrl = cafeData.data.imageUrl;
    setCafeName(cafeName);
    setImageUrl(cafeImageUrl);
    if (orderData) {
      for (var key in orderData) {
        setOrderStatus(orderData[key].status);
      }
      const user = await axios.get(`${API_ENDPOINT}users/${localId}.json`);
      const userData = user.data;
      for (var key in userData) {
        // console.log(userData[key]);
        setOrderBy(userData[key].name);
        break;
      }
    } else {
      console.log("Nothing");
    }
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <ActivityIndicator size={20} color={"blue"} />
  ) : (
    <View style={styles.root}>
      <Image
        source={{ uri: imageUrl }}
        style={{ width: "100%", height: 250 }}
      />
      <Text style={{ textAlign: "center" }}>{cafeName}</Text>
      <Text>Order By: {orderBy} </Text>
      {orderStatus == "preparing" ? (
        <LottieView
          style={{ width: "100%", height: 250 }}
          source={require("../assets/lottie/preparing.json")}
          autoPlay
        />
      ) : (
        <LottieView
          style={{ width: 200, height: 200 }}
          source={require("../assets/lottie/delivering.json")}
          autoPlay
        />
      )}
      <Text style={{ textAlign: "center", fontSize: 40 }}>{orderStatus}</Text>
      {orderStatus == "preparing" ? null : (
        <Pressable
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: 50,
            backgroundColor: "blue",
          }}
          onPress={() => {}}
        >
          <Text style={{ color: "white", fontSize: 30 }}>View on Maps</Text>
        </Pressable>
      )}
    </View>
  );
};

export default OrderStatusScreen;

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
