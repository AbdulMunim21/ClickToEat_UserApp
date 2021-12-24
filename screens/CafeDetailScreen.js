import React from "react";
import { View, StyleSheet, Text } from "react-native";

const CafeDetailScreen = (props) => {
  return (
    <View style={styles.root}>
      <Text>{props.route.params.title}</Text>
    </View>
  );
};

export default CafeDetailScreen;

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
