import React, { useEffect } from "react";
import { TouchableOpacity, Image, StyleSheet, Text } from "react-native";

import ENV from "../env";

const MapPreview = (props) => {
  let imagePreviewUrl;
  console.log("My Location ", props.location);

  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${ENV.googleApiKey}`;
  }

  return (
    <TouchableOpacity onPress={props.googleMaps} style={{ ...styles.mapPreview }}>
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        <Text>No Location</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});

export default MapPreview;
