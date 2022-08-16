import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  SafeAreaView,
  View,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { COLOURS, Items } from "../../../components/database/Database";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect } from "@react-navigation/native";
import ListItem from "../MarketScreen/ListItem";
import { useSafeAreaInsets } from "react-native-safe-area-context"; //
import { db, auth, storage } from "../../../firebaseSdk";
import axios from "axios";
import baseURL from "../../../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "../../../config2";

var { height, width } = Dimensions.get("window");

const ListHeader = () => {
  return (
    <View elevation={1} style={styles.listHeader}>
      <View style={styles.headerItem}></View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "700" }}>Brand</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "700" }}>Name</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "700" }}>Price</Text>
      </View>
    </View>
  );
};

const ManageListings = (props) => {
  const insets = useSafeAreaInsets();
  const [productList, setProductList] = useState();
  const [productFilter, setProductFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  const [users, setUsers] = useState([]);
  const todoRef = firebase.firestore().collection("newData");

  useFocusEffect(
    useCallback(() => {
      //get data from firebase
      todoRef.onSnapshot((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          const { image /*text*/ } = doc.data();
          users.push({
            id: doc.id,
            //heading,
            image,
            //text,
          });
        });
        //setUsers(users);
        setProductList(users);
        setProductFilter(users);
        setLoading(false);
      });

      /////
      // Get Token
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));

      axios
        .get(`${baseURL}/market/findUserItem/${auth.currentUser.email}`)
        .then((res) => {
          setProductList(res.data);
          setProductFilter(res.data);
          setLoading(false);
        });

      return () => {
        setProductList();
        setProductFilter();
        setLoading(true);
      };
    }, [])
  );

  //searchBar function
  const searchProduct = (text) => {
    if (text == "") {
      setProductFilter(productList);
    }
    setProductFilter(
      productList.filter((i) =>
        i.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  // Delete Product Function
  const deleteProduct = (id) => {
    axios
      .delete(`${baseURL}/market/remove/${id}`)
      .then((res) => {
        const products = productFilter.filter((item) => item.id !== id);
        setProductFilter(products);
      })
      .catch((error) => console.log(error));
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: COLOURS.white,
        flex: 1,
        width: "100%",
        height: "100%",
        marginTop: insets.top,
      }}
    >
      <View
        style={{
          height: "20%",
          position: "static",
          backgroundColor: "#3F569C",
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
          <TouchableOpacity onPress={() => props.navigation.navigate("Market")}>
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
            Products
          </Text>
        </View>

        {/*Search bar */}
        <View style={[styles.container1]}>
          <View style={styles.searchContainer}>
            <View style={styles.vwSearch}>
              <Image
                style={styles.icSearch}
                source={require("../../../assets/images/ic_search.png")}
              />
            </View>
            <TextInput
              placeholder="Search"
              style={styles.textInput}
              onChangeText={(text) => searchProduct(text)}
            />
          </View>
        </View>
      </View>

      {/*Button Container*/}
      <View style={styles.buttonContainer1}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate("ProductForm")}
        >
          <Text style={styles.buttonText}>Add Product</Text>
        </TouchableOpacity>
      </View>

      {/*Display products uploaded by seller */}
      <ScrollView>
        {loading ? (
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        ) : (
          <FlatList
            data={productFilter}
            ListHeaderComponent={ListHeader}
            renderItem={({ item, index }) => (
              <ListItem
                {...item}
                navigation={props.navigation}
                index={index}
                delete={deleteProduct}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </ScrollView>
      {/*//////////////////////////////// */}
    </SafeAreaView>
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
    backgroundColor: COLOURS.backgroundLight,
    borderRadius: 10,
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLOURS.backgroundMedium,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },

  listHeader: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "gainsboro",
  },
  headerItem: {
    margin: 3,
    width: width / 6,
  },
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },

  //SearchBar styles
  txtError: {
    marginTop: "2%",
    width: "89%",
    color: "white",
  },
  vwClear: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    // backgroundColor: 'green',
    flex: 1,
  },

  vwSearch: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    // width: 40,
    // backgroundColor: 'red'
  },
  icSearch: {
    height: 18,
    width: 18,
  },
  searchContainer: {
    backgroundColor: "white",
    width: "90%",
    height: 40,
    flexDirection: "row",
    borderRadius: 15,
  },
  container1: {
    height: 80,
    alignItems: "center",
    // height: '100%', width: '100%'
  },
  btnContainer: {
    marginBottom: 160,
    backgroundColor: "white",
  },
  buttonContainer1: {
    margin: 5,
    alignSelf: "center",
    flexDirection: "row",
  },
  buttonText: {
    marginLeft: 4,
    color: COLOURS.backgroundMedium,
    fontWeight: "bold",
  },
  btnAddProduct: {
    flexDirection: "row",
    borderRadius: 3,
    padding: 10,
    margin: 5,
    justifyContent: "center",
    //background: transparent,
    backgroundColor: "#62b1f6",
    width: 100,
  },
});
