import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  ScrollView,
  Pressable,
  Alert,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CustomItem from "../components/CustomItem";
import ItemModel from "../models/ItemModel";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_ENDPOINT = "https://clicktoeat-b46f5-default-rtdb.firebaseio.com/";
const CafeDetailScreen = (props) => {
  const cafeId = props.route.params.cafeId;
  const title = props.route.params.title;
  const description = props.route.params.description;
  const imageUrl = props.route.params.imageUrl;
  const rating = props.route.params.rating;
  const [stars, setStars] = useState([1, 2, 3, 4, 5]);
  const [listItems, setListItems] = useState([]);
  const [exist, setExist] = useState(true);
  const [isFav, setIsFav] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(async () => {
    var data = await AsyncStorage.getItem("userData");
    var exist = false;
    data = JSON.parse(data);
    const localId = data.localId;
    const getData = await axios.get(
      `${API_ENDPOINT}users/${localId}/favorite.json`
    );
    var array = [];
    const cafeData = getData.data;
    console.log(cafeData);
    for (const key in cafeData) {
      // console.log(cafeData[key].favoriteCafe);
      array.push({ cafeId: cafeData[key].favoriteCafe, id: key });
    }

    // console.log(array);

    for (var i = 0; i < array.length; i++) {
      if (array[i].cafeId == cafeId) {
        console.log("exist");
        setIsFav(true);

        break;
      }
    }

    const response = await axios.get(
      `${API_ENDPOINT}cafe/${cafeId}/listItems.json`
    );
    const resData = response.data;
    if (resData == null) {
      console.log("doesnt have any items");
      setExist(false);
      return;
    }

    var data = [];
    for (const key in resData) {
      const id = key;
      const title = resData[key].name;
      const imageUrl = resData[key].imageUrl;
      const price = resData[key].price;
      const sizes = resData[key].size;
      var Item = new ItemModel(id, title, imageUrl, price, sizes);
      // console.log("Model: " + Item);
      data.push(Item);
    }
    // console.log(data);
    setListItems(data);
  }, []);

  useEffect(() => {
    props.navigation.setParams({
      isFav: isFav,
      changeFav: changeFav,
      cafeId: cafeId,
    });
  }, [isFav]);

  const changeFav = () => {
    setIsFav(!isFav);
  };

  const addOrderList = (itemName, itemPrice) => {
    console.log({ itemName: itemName, itemPrice: itemPrice });
    setOrders([...orders, { itemName: itemName, itemPrice: itemPrice }]);
    props.navigation.setParams({
      isFav: isFav,
      changeFav: changeFav,
      orders: orders,
    });
  };
  return (
    <View style={styles.root}>
      <View
        style={{
          width: "100%",
          height: 200,
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: imageUrl }}
          style={{ width: "80%", height: "100%" }}
        />
      </View>
      <Text>{title}</Text>
      <Text>{description}</Text>
      <View style={{ flexDirection: "row" }}>
        {stars.map((item) => {
          return item <= rating ? (
            <Icon name="ios-star"></Icon>
          ) : (
            <Icon name="ios-star-outline"></Icon>
          );
        })}
      </View>
      {exist ? (
        <FlatList
          data={listItems}
          style={{
            width: "100%",
            margin: 20,
          }}
          keyExtractor={(item, index) => {
            return index;
          }}
          renderItem={(itemData) => {
            return (
              <CustomItem
                title={itemData.item.title}
                imageUrl={itemData.item.imageUrl}
                price={itemData.item.price}
                addOrderList={addOrderList}
              />
            );
          }}
        />
      ) : (
        <Text style={{ fontSize: 40, marginTop: 100 }}>
          No Item Added by Cafe Owner{" "}
        </Text>
      )}
    </View>
  );
};

export default CafeDetailScreen;

export const screenOptions = (navData) => {
  const title = navData.route.params.title;
  const cafeId = navData.route.params.cafeId;
  var isFav = navData.route.params.isFav;
  const changeFav = navData.route.params.changeFav;

  const orders = navData.route.params.orders;

  return {
    title: title,
    // headerLeft: () => {
    //   return <Button title="Go Back" />;
    // },
    headerRight: () => {
      return (
        <View style={{ flexDirection: "row" }}>
          <Pressable
            onPress={async () => {
              var data = await AsyncStorage.getItem("userData");
              var exist = false;
              data = JSON.parse(data);
              const localId = data.localId;
              const getData = await axios.get(
                `${API_ENDPOINT}users/${localId}/favorite.json`
              );
              var array = [];
              const cafeData = getData.data;
              console.log(cafeData);
              for (const key in cafeData) {
                console.log(cafeData[key].favoriteCafe);
                array.push({ cafeId: cafeData[key].favoriteCafe, id: key });
              }

              console.log(array);
              var id = "";

              for (var i = 0; i < array.length; i++) {
                if (array[i].cafeId == cafeId) {
                  console.log("exist");
                  exist = true;
                  id = array[i].id;
                  break;
                }
              }

              if (exist) {
                await axios.delete(
                  `${API_ENDPOINT}users/${localId}/favorite/${id}.json`
                );
              } else {
                await axios.post(
                  `${API_ENDPOINT}users/${localId}/favorite.json`,
                  {
                    favoriteCafe: cafeId,
                  }
                );
              }
              changeFav();
            }}
            style={{ marginRight: 20 }}
          >
            <Icon name={isFav ? "ios-star" : "ios-star-outline"} size={20} />
          </Pressable>
          <Pressable
            onPress={() => {
              navData.navigation.navigate("OrderNowScreen", {
                orders: orders,
                cafeId: cafeId,
              });
            }}
          >
            <Icon name="cart" size={20} />
          </Pressable>
        </View>
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
