import React from "react";
import { View, StyleSheet, Text } from "react-native";

const SignUpScreen = (props) => {
  return <View style={styles.root}></View>;
};

export default SignUpScreen;

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
