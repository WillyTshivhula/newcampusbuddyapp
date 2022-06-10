import React from 'react'
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../HomeScreen/HomeScreen'
import AlertScreen from '../AlertScreen/AlertScreen'
import MarketScreen from '../MarketScreen/MarketScreen'
import NagivateScreen from '../NagivateScreen/NagivateScreen'
import ChatRoom from '../ChatRoom/ChatRoom'


const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
   
    <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Nagivate" component={NagivateScreen} />
    <Tab.Screen name="Alert" component={AlertScreen} />
    <Tab.Screen name="Chat" component={ChatRoom} />
    <Tab.Screen name="Market" component={MarketScreen} />
  </Tab.Navigator>
  
  )
}
