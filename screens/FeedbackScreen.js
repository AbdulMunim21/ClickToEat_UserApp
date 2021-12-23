import React from "react";
import { View, StyleSheet, Text } from "react-native";

const FeedbackScreen = (props) => {
  return <View style={styles.root}></View>;
};

export default FeedbackScreen;

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
