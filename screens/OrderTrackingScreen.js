import React from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView from "react-native-maps";

const OrderTrackingScreen = (props) => {
  const location = props.route.params.location;
  const mapRegion = {
    latitude: location.lat,
    longitude: location.lng,
    latitudeDelta: 0.092,
    longitudeDelta: 0.0421,
  };
  return <MapView region={mapRegion} style={{ flex: 1 }} />;
};

export default OrderTrackingScreen;

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
