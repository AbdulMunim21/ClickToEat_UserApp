import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUpScreen = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const [name, setName] = useState();
  const API_ENDPOINT = "https://clicktoeat-b46f5-default-rtdb.firebaseio.com/";

  const signUpHandler = async (email, pass, name, confirmPass) => {
    if (email == null || pass == null || name == null) {
      Alert.alert("Error", "Fields should not be empty", [
        { text: "OK", style: "destructive" },
      ]);
      return;
    }
    if (pass != confirmPass) {
      Alert.alert("Error", "Password Should be Same", [
        { text: "OK", style: "destructive" },
      ]);
      return;
    }
    console.log(email.length);

    if (!email.includes("@") || email.length <= 0) {
      Alert.alert("Error", "Email is not Valid", [
        { text: "OK", style: "destructive" },
      ]);
      return;
    }

    if (pass.length <= 6) {
      Alert.alert("Error", "Password Should be 7 characters or more", [
        { text: "OK", style: "destructive" },
      ]);
      return;
    }
    var response = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBCTbcaYIOInsCTmHJhEjiR7MbAmSsNHj8",
      { email: email, password: pass, returnSecureToken: true }
    );

    var resData = response.data;
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );

    console.log(expirationDate);
    const authId = resData.localId;
    await AsyncStorage.setItem(
      "userData",
      JSON.stringify({
        idToken: resData.idToken,
        localId: resData.localId,
        expiresIn: expirationDate.toISOString(),
      })
    );

    await axios.post(`${API_ENDPOINT}users/${authId}.json`, {
      email: email.trim(),
      pass: pass.trim(),
      name: name.trim(),
    });
    props.navigation.navigate("DashBoard");
  };

  return (
    <View style={styles.root}>
      <View style={styles.cardStyle}>
        <CustomTextInput
          styles={styles}
          value={name}
          onChangeText={(value) => {
            setName(value);
          }}
          title={"Name"}
        />
        <CustomTextInput
          styles={styles}
          value={email}
          onChangeText={(value) => {
            setEmail(value);
          }}
          title={"Email"}
        />

        <CustomTextInput
          styles={styles}
          value={password}
          onChangeText={(value) => {
            setPassword(value);
          }}
          title={"Password"}
          secureTextEntry={true}
        />
        <CustomTextInput
          styles={styles}
          value={confirmPass}
          onChangeText={(value) => {
            setConfirmPass(value);
          }}
          title={"Confirm Password"}
          secureTextEntry={true}
        />

        <Pressable
          style={styles.buttonStyle}
          onPress={signUpHandler.bind(this, email, password, name, confirmPass)}
        >
          <Text style={{ ...styles.buttonTextStyle, color: "white" }}>
            Sign Up
          </Text>
        </Pressable>

        <View style={styles.signUpText}>
          <Text>Already a Member ?</Text>
          <Pressable
            style={styles.LoginButton}
            onPress={() => {
              props.navigation.replace("SignUpScreen");
            }}
          >
            <Text
              style={{
                ...styles.buttonTextStyle,
                textDecorationLine: "underline",
              }}
            >
              Login
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
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
  textInputStyle: {
    width: "80%",
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
    margin: 10,
    color: "#303030",
  },
  cardStyle: {
    width: "80%",
    height: "60%",
    backgroundColor: "#d9e8ff",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    borderRadius: 20,
    elevation: 5,
  },
  buttonStyle: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    backgroundColor: "#408af7",
    borderRadius: 20,
    marginTop: 20,
    elevation: 5,
  },
  signUpText: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    padding: 20,
  },
  LoginButton: { marginLeft: 5 },
  buttonTextStyle: {
    color: "blue",

    fontSize: 15,
  },
});
