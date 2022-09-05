import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../HomeScreen/HomeScreen";
import AlertScreen from "../AlertScreen/AlertScreen";
import MarketScreen from "../MarketScreen/MarketScreen";
import NagivateScreen from "../NagivateScreen/NagivateScreen";
import ChatRoom from "../ChatRoom/ChatRoom";
import { MaterialIcons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createMaterialBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#9075E3"
      labelStyle={{ fontSize: 12 }}
      barStyle={{ backgroundColor: "#E2E2E2" }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Nagivate"
        component={NagivateScreen}
        options={{
          tabBarLabel: "Nagivate",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="location-pin" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Alert"
        component={AlertScreen}
        options={{
          tabBarLabel: "Alert",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="add-alert" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatRoom}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="chat" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Market"
        component={MarketScreen}
        options={{
          tabBarLabel: "Market",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="shopping-bag" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
