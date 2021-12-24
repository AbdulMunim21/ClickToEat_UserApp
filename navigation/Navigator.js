import React from "react";
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
      <UserTab.Screen name="UserStackNavigator" component={UserNavigation} />
      <UserTab.Screen name="UserFavNavigator" component={UserFavNavigation} />
    </UserTab.Navigator>
  );
};

export default RootNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
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
