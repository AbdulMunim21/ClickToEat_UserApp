import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen, {
  screenOptions as LoginScreenOptions,
} from "../screens/LoginScreen";
import SignUpScreen, {
  screenOptions as SignUpScreenOptions,
} from "../screens/SignUpScreen";
import DashBoardScreen, {
  screenOptions as DashBoardScreenOptions,
} from "../screens/DashBoardScreen";
import CafeDetailScreen, {
  screenOptions as CafeDetailScreenOptions,
} from "../screens/CafeDetailScreen";
import OrderStatusScreen, {
  screenOptions as OrderStatusScreenOptions,
} from "../screens/OrderStatusScreen";
import OrderTrackingScreen, {
  screenOptions as OrderTrackingScreenOptions,
} from "../screens/OrderTrackingScreen";
import FeedbackScreen, {
  screenOptions as FeedbackScreenOptions,
} from "../screens/FeedbackScreen";
import FavoriteCafeScreen, {
  screenOptions as FavoriteScreenOptions,
} from "../screens/FavoriteCafeScreen";
import SplashScreen from "../screens/SplashScreen";

const UserStack = createNativeStackNavigator();
const UserFavStack = createNativeStackNavigator();
const UserTab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

const UserNavigation = () => {
  return (
    <UserStack.Navigator>
      <UserStack.Screen
        name="DashBoardScreen"
        component={DashBoardScreen}
        options={DashBoardScreenOptions}
      />
      <UserStack.Screen
        name="CafeDetailScreen"
        component={CafeDetailScreen}
        options={CafeDetailScreenOptions}
      />
      <UserStack.Screen
        name="OrderStatusScreen"
        component={OrderStatusScreen}
        options={OrderStatusScreenOptions}
      />
      <UserStack.Screen
        name="OrderTrackingScreen"
        component={OrderTrackingScreen}
        options={OrderTrackingScreenOptions}
      />
      <UserStack.Screen
        name="FeedbackScreen"
        component={FeedbackScreen}
        options={FeedbackScreenOptions}
      />
    </UserStack.Navigator>
  );
};

const UserFavNavigation = () => {
  return (
    <UserFavStack.Navigator>
      <UserFavStack.Screen
        name="FavoriteCafeScreen"
        component={FavoriteCafeScreen}
        options={FavoriteScreenOptions}
      />
    </UserFavStack.Navigator>
  );
};

const UserTabNavigation = () => {
  return (
    <UserTab.Navigator screenOptions={{ headerShown: false }}>
      <UserTab.Screen
        name="UserStackNavigator"
        component={UserNavigation}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ tintColor }) => (
            <View>
              <Icon
                style={[{ color: tintColor }]}
                size={25}
                name={"ios-home"}
              />
            </View>
          ),
          activeColor: "#615af6",
          inactiveColor: "#46f6d7",
        }}
      />
      <UserTab.Screen
        name="UserFavNavigator"
        component={UserFavNavigation}
        options={{
          tabBarLabel: "Favorite Cafe",
          tabBarIcon: ({ tintColor }) => (
            <View>
              <Icon
                style={[{ color: tintColor }]}
                size={25}
                name={"star"}
              />
            </View>
          ),
          activeColor: "#615af6",
          inactiveColor: "#46f6d7",
        }}
      />
    </UserTab.Navigator>
  );
};

export default RootNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="SplashScreen" component={SplashScreen} />
        <RootStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={LoginScreenOptions}
        />
        <RootStack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={SignUpScreenOptions}
        />
        <RootStack.Screen name="DashBoard" component={UserTabNavigation} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
