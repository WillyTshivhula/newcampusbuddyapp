import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Header from "../Component/Header";
import { COLOURS, Items } from "../../../components/database/Database";
import { useFocusEffect } from "@react-navigation/native";

import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context"; //

import baseURL from "../../../assets/common/baseUrl";
import axios from "axios";
import { Avatar } from "react-native-paper";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
var { height, width } = Dimensions.get("window");

export default function BuddyScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      axios
        .get(`${baseURL}/market/all`)
        .then((res) => {
          setUsers(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [])
  );

  const ProductCard = ({ data }) => {
    return (
      <View
        style={{
          width: "48%",
          marginVertical: 14,
        }}
      >
        <View
          style={{
            borderWidth: 1,
            borderColor: "#d1d1d1",
            borderRadius: 10,
            backgroundColor: "#fff",
            padding: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 5,
            }}
          >
            <Avatar.Image
              source={{ uri: data.itemUrl }}
              size={60}
              style={{
                backgroundColor: "#fff",
              }}
            />
            <View style={styles.rightContainer}>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.title}>{data.title}</Text>
          <Text>Information System</Text>
          <Text>APB</Text>
        </View>
        
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header headerText="Chatroom" />
      <TouchableOpacity
        style={{
          // width: "86%",
          height: 25,
          backgroundColor: COLOURS.blue,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 5,
        }}
        onPress={() => navigation.navigate("MyBuddies")}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: "500",
            letterSpacing: 1,
            color: COLOURS.white,
            textTransform: "uppercase",
          }}
        >
          My Buddies
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          padding: 10,
        }}
      >
        {loading ? (
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        ) : (
          <>
            {users.map((data) => {
              return <ProductCard data={data} key={data.id} />;
            })}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: COLOURS.white,
    // flex: 1,
    // width: "100%",
    // height: "100%",
  },
  title: {
    //fontSize: 18,
    fontWeight: "bold",
  },
  rightContainer: {
    padding: 10,
    //flex: 3,
  },
  addButton: {
    backgroundColor: "black",
    width: 60,
    height: 30,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: "#d1d1d1",
    // padding: 10,
  },
  buttonText: {
    color: "#fff",
    //fontSize: 22,
  },
});
