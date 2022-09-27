import React, {useState, useCallback} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Avatar } from "react-native-paper";
import { COLOURS, Items } from "../../../components/database/Database";
import { useFocusEffect } from "@react-navigation/native";
import baseURL from "../../../assets/common/baseUrl";
import { Appbar } from "react-native-paper";
import axios from "axios";
export default function MyBuddies({navigation}) {
    //const { data } = route.params;

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
      }, [navigation])
    );

    const MyBuddiesCard = ({data}) => {
        return (
          <View
            style={{
              borderWidth: 1,
              borderColor: "#d1d1d1",
              borderRadius: 10,
              backgroundColor: "#fff",
              marginVertical: 5,
              padding: 10,
            }}
          >
            <View style={styles.root}>
              <Avatar.Image
                source={{ uri: data.itemUrl }}
                style={styles.image}
                size={60}
              />

              <View style={styles.rightContainer}>
                <Text style={styles.name}>{data.title}</Text>
                <Text>Information System</Text>
                <Text>APB</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                //padding: 25,
                //margin: 25,
              }}
            >
              <TouchableOpacity
                style={styles.addButton}
                onPress={() =>{}}
              >
                <Text style={styles.buttonText}>Video</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {}}
              >
                <Text style={styles.buttonText}>Chat</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
    }

  return (
    <View
      style={{
        //backgroundColor: COLOURS.white,
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => navigation.navigate("BuddyScreen")}
        />
        <Appbar.Content title={"My Buddies"} />
      </Appbar.Header>
      
      <View style={styles.page}>
        {loading ? (
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        ) : (
          <>
            {users.map((data) => {
              return <MyBuddiesCard data={data} key={data.id} />;
            })}
          </>
        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
  root: {
    flexDirection: "row",
  },
  image: {
    //flex: 2,
    //height: 150,
    //resizeMode: 'contain',
    backgroundColor: "#fff",
    marginTop: 5,
  },
  rightContainer: {
    padding: 10,
    flex: 3,
    marginLeft: 10,
  },
  name: {
    //fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    //fontWeight: "bold",
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
