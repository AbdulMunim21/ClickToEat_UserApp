import React from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = () => {
  return (
    <View style={styles.root}>
      <Text>Splash Screen</Text>
      <ActivityIndicator size={"large"} color={"blue"} />
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
