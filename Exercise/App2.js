import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


const { Screen, Navigator } = createStackNavigator();

export default class App2 extends Component {
    render() {
        return (
          <NavigationContainer>
            <Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Screen name="mainScreen" component={MainScreen} />
            </Navigator>
          </NavigationContainer>
        );
    }
}