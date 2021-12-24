import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, Text, Button } from "react-native";

const DashBoardScreen = (props) => {
  return (
    <View style={styles.root}>
      <Button
        title="LogOut"
        onPress={async () => {
          await AsyncStorage.removeItem("userData");
          props.navigation.replace("LoginScreen");
        }}
      />
      <Button
        title="GoCafe"
        onPress={async () => {
         props.navigation.navigate("CafeDetailScreen")
        }}
      />
    </View>
  );
};

export default DashBoardScreen;

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
