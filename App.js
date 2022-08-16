import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./src/screens/SigninScreen/SigninScreen";
import SignUpScreen from "./src/screens/SignUpScreen/SignUpScreen";
import ForgotPassWordScreen from "./src/screens/ForgotPassWordScreen/ForgotPassWordScreen";
import Tabs from "./src/screens/Tabs/Tabs";
import OnBoardScreen from "./src/screens/OnboardingScreen/onBoardScreen";
import ProductInfo from "./src/screens/MarketScreen/ProductInfo";
import ManageListings from "./src/screens/MarketScreen/ManageListings";
import ListItem from "./src/screens/MarketScreen/ListItem";
import MarketScreen from "./src/screens/MarketScreen/MarketScreen";
import ChatRoom from "./src/screens/ChatRoom/ChatRoom";
import ProductForm from "./src/screens/MarketScreen/ProductForm";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="onBoardScreen">
        {/* <Stack.Screen name="Chat" component={ChatRoom} options={{headerShown:false}}/> */}
        {/* <Stack.Screen name="Home" component={MarketScreen} options={{headerShown:false}}/> */}
        <Stack.Screen
          name="ProductForm"
          component={ProductForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListItem"
          component={ListItem}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyListings"
          component={ManageListings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductInfo"
          component={ProductInfo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Forgot"
          component={ForgotPassWordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="onBoardScreen"
          component={OnBoardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
