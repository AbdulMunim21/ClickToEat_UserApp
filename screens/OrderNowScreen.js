import React from "react";
import { View, StyleSheet, Text } from "react-native";

const OrderNowScreen = (props) => {
  return (
    <View style={styles.root}>
      <Text>Order Now Screen</Text>
    </View>
  );
};

export default OrderNowScreen;

export const screenOptions = (navData) => {
  return {};
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
