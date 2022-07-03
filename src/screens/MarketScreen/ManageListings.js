import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { COLOURS, Items } from "../../../components/database/Database";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Searchbar from "../../../components/SearchBar";
import { SearchBar } from "react-native-screens";

const ManageListings = ({ navigation }) => {
  //Search bar
  const [value, setValue] = useState();
  function updateSearch(value) {
    //do your search logic or anything
    console.log(value);
  }

  return (
    <View
      style={{
        backgroundColor: "#3F569C",
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          paddingTop: 16,
          paddingHorizontal: 16,

          alignItems: "center",
          paddingBottom: 16,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <MaterialCommunityIcons
            name="chevron-left"
            style={{
              fontSize: 18,
              color: COLOURS.backgroundDark,
              padding: 12,
              backgroundColor: COLOURS.backgroundLight,
              borderRadius: 12,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 24,
            color: COLOURS.white,
            fontWeight: "500",
            marginLeft: 30,
          }}
        >
          My Listings
        </Text>
      </View>
      <Searchbar value={value} updateSearch={updateSearch} />
      <View style={styles.container}></View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Listing")}
        >
          <Text style={styles.buttonText}>Create New Listing</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ManageListings;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOURS.backgroundLight,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "90%",
    color: "#000",
    height: 52,
    backgroundColor: "#3F569C",
    borderRadius: 10,
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
});
