import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

const CustomTextInput = (props) => {
  return (
    <TextInput
      style={props.styles.textInputStyle}
      placeholder={props.title}
      value={props.value}
      onChangeText={props.onChangeText}
      required
      secureTextEntry={props.secureTextEntry}
    />
  );
};

export default CustomTextInput;
