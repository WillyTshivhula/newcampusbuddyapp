import React, { useState, useEffect } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import Header from "../Component/Header";
// import Device from 'expo-device';
import * as Location from "expo-location";
import axios from "axios";
import { List, MD3Colors, Appbar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

export default function NavMapsScreen(props) {
  const openMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&dir_action=navigate&travelmode=walking`;
    Linking.openURL(url);
  };
  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => props.navigation.navigate("Tabs")} />
        <Appbar.Content title={"Campus Tour"} />
      </Appbar.Header>
      <View style={styles.container}>
        <List.Section>
          <List.Subheader>ABP Campus</List.Subheader>
          <List.Item
            onPress={() =>
              openMaps("-26.180845929006125", "28.015511803229327")
            }
            title="JU APB Library"
            left={() => <List.Icon icon="crosshairs" />}
          />
          <List.Item
            onPress={() => openMaps("-26.183310701855", "28.015855125948992")}
            title="UJ APB Campus Health Offices"
            left={() => <List.Icon icon="crosshairs" />}
          />
          <List.Item
            onPress={() => openMaps("-26.1771699664507", "28.017814945725227")}
            title="UJ APB Bus Station"
            left={() => <List.Icon icon="crosshairs" />}
          />
          <List.Item
            onPress={() => openMaps("-26.18022972764837", "28.016133653898965")}
            title="UJ APB Student Center"
            left={() => <List.Icon icon="crosshairs" />}
          />
            <List.Item
            onPress={() => openMaps("-26.18022972764837", "28.016133653898965")}
            title="UJ APB Student Center"
            left={() => <List.Icon icon="crosshairs" />}
          />
        </List.Section>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
