import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";

const SplashScreen = (props) => {
  useEffect(async () => {
    setTimeout(async () => {
      var userData = await AsyncStorage.getItem("userData");
      console.log(userData);
      const transformedData = JSON.parse(userData);
      console.log(transformedData);

      if (!transformedData) {
        props.navigation.navigate("LoginScreen");
        return;
      }

      const { idToken, localId, expiresIn } = transformedData;

      const expirationDate = new Date(expiresIn);
      if (expirationDate <= new Date() || !idToken || !localId) {
        props.navigation.navigate("LoginScreen");
        return;
      }

      props.navigation.navigate("DashBoard");
    }, 3000);
  }, []);
  return (
    <View style={styles.root}>
      <LottieView
        style={{ width: 200, height: 200 }}
        source={require("../assets/lottie/splashLottie.json")}
        autoPlay
      />
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>Click to Eat</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
