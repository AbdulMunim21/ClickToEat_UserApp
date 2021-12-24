import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "./SplashScreen";
import axios from "axios";

const LoginScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();

  useEffect(async () => {
    var userData = await AsyncStorage.getItem("userData");
    console.log(userData);
    const transformedData = JSON.parse(userData);
    console.log(transformedData);

    if (!transformedData) {
      setIsLoading(false);
      return;
    }

    const { idToken, localId, expiresIn } = transformedData;

    const expirationDate = new Date(expiresIn);
    if (expirationDate <= new Date() || !idToken || !localId) {
      setIsLoading(false);

      return;
    }

    props.navigation.navigate("DashBoard");
  }, []);

  const loginHandler = async (email, pass) => {
    var response = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBCTbcaYIOInsCTmHJhEjiR7MbAmSsNHj8",
      { email: email, password: pass, returnSecureToken: true }
    );
    var resData = response.data;
    console.log(response.data);
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    await AsyncStorage.setItem(
      "userData",
      JSON.stringify({
        idToken: resData.idToken,
        localId: resData.localId,
        expiresIn: expirationDate.toISOString(),
      })
    );

    props.navigation.navigate("DashBoard");
    console.log("Hello");
  };

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <View style={styles.root}>
      <View style={styles.cardStyle}>
        <TextInput
          style={styles.textInputStyle}
          placeholder="Email"
          value={email}
          onChangeText={(value) => {
            setEmail(value);
          }}
          required
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="Password"
          value={password}
          onChangeText={(value) => {
            setPassword(value);
          }}
          secureTextEntry
          keyboardAppearance="light"
          required
        />
        <Pressable
          style={styles.buttonStyle}
          onPress={loginHandler.bind(this, email, password)}
        >
          <Text style={{ ...styles.buttonTextStyle, color: "white" }}>
            Login
          </Text>
        </Pressable>

        <View style={styles.signUpText}>
          <Text>Don't have an Account?</Text>
          <Pressable
            style={styles.signUpButton}
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
              SignUp
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

export const screenOptions = (navData) => {
  return {
    tabBarStyle: { display: "none" },
  };
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
  signUpButton: { marginLeft: 10 },
  buttonTextStyle: {
    color: "blue",

    fontSize: 15,
  },
});
