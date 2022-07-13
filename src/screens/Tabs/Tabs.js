import React from 'react'
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../HomeScreen/HomeScreen'
import AlertScreen from '../AlertScreen/AlertScreen'
import MarketScreen from '../MarketScreen/MarketScreen'
import NagivateScreen from '../NagivateScreen/NagivateScreen'
import ChatRoom from '../ChatRoom/ChatRoom'
import {MaterialIcons} from '@expo/vector-icons'



const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
   
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor:'tomato',
      tabBarInactiveTintColor:'#9075E3',
      tabBarStyle: {borderRadius:20,height:80,left:20,right:20,position:"absolute",bottom:1,elevation:0,backgroundColor:'#E2E2E2'},
    }}
      
    
    >
    <Tab.Screen name="Home" component={HomeScreen} options={{


      tabBarIcon:({focused,color,size})=>(
        <MaterialIcons name='home'size={size}color={color}/>
      )

      }}
      />
    <Tab.Screen name="Nagivate" component={NagivateScreen} options={{

           title:'Navigate',
           tabBarIcon:({focused,color,size})=>(
          <MaterialIcons name='location-pin'size={size}color={color}/>
)

}}/>
    <Tab.Screen name="Alert" component={AlertScreen} 
    options={{

      title:'Alert',
      tabBarIcon:({focused,color,size})=>(
        <MaterialIcons name='add-alert'size={size}color={color}/>
      )

      }}/>
    <Tab.Screen name="Chat" component={ChatRoom} options={{

        title:'Chat',
        tabBarIcon:({focused,color,size})=>(
         <MaterialIcons name='chat'size={size}color={color}/>
)

}}/>
    <Tab.Screen name="Market" component={MarketScreen} 
    options={{

      title:'Market',
      tabBarIcon:({focused,color,size})=>(
        <MaterialIcons name='shopping-bag'size={size}color={color}/>
      )

      }}/>
  </Tab.Navigator>
  
  )
}
