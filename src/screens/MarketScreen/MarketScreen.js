import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLOURS, Items } from "../../../components/database/Database";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useSafeAreaInsets } from "react-native-safe-area-context"; //

import baseURL from "../../../assets/common/baseUrl";
import axios from "axios";

import Searchbar from "../../../components/SearchBar";
<<<<<<< HEAD
import SearchedProducts from "./SearchedProducts";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "../../../config2";

const Home = ({ navigation }, props) => {
   const insets = useSafeAreaInsets();
=======
import Header from "../Component/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function MarketScreen({ navigation }) {
  const insets = useSafeAreaInsets();
>>>>>>> 977f87f (market)
  const [products, setProducts] = useState([]);
  
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const todoRef = firebase.firestore().collection("newData");

  //SearchBar function
  const [value, setValue] = useState();
  function updateSearch(value) {
    //do your search logic or anything
    console.log(value);
  }

  //Async Storage starts
  //get called on scren loads
  useEffect(() => {
    //setProducts(data);
    //setProductsFiltered(data);
    //setFocus(false);

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
      setProducts(users);
      setProductsFiltered(users);
      setFocus(false);
    });

    axios
      .get(`${baseURL}/market/all`)
      .then((res) => {
        setProducts(res.data);
        setProductsFiltered(res.data);
        setFocus(false);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
      setAccessory([]);
    };
  }, []);

  //Search gunction
  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => 
        i.name.toLowerCase().includes(text.toLowerCase())
        )
    )
  }

  const openList = () => {
    setFocus(true);
  }

  const onBlur = () => {
    setFocus(false);
  }

  const ProductCard = ({ data }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductInfo", {
            data: [data],
          })
        }
        style={{
          width: "48%",
          marginVertical: 14,
        }}
      >
        <View
          style={{
            //styles for each product card
            width: "100%",
            height: 100,
            borderRadius: 10,
            backgroundColor: COLOURS.backgroundLight,
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Image
            source={data.image}
            style={{
              width: "80%",
              height: "80%",
              resizeMode: "contain",
            }}
          />
        </View>
        {/*Display the product name and price in the product card */}
        <Text
          style={{
            fontSize: 12,
            color: COLOURS.black,
            fontWeight: "600",
            marginBottom: 2,
          }}
        >
          {data.title}
        </Text>

        {/*Display product Price based on category */}
        <Text>R {data.price}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAwareScrollView>
      {/* <Header headerText="Market" /> */}
      <View style={styles.container}>
        {/*Header (Campus Market title)*/}
        <View
          style={{
<<<<<<< HEAD
            marginBottom: 10,
            padding: 16,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              color: COLOURS.white,
              fontWeight: "500",
            }}
          >
            Marketplace
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("ProductForm")}>
            {/*Entypo generates the market icon (in the below codes)*/}
            <Entypo
              name="shopping-bag"
              style={{
                fontSize: 18,
                color: "white",
                padding: 12,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLOURS.backgroundLight,
                backgroundColor: COLOURS.backgroundDark.Light,
              }}
            />
          </TouchableOpacity>
        </View>
        {/* Call Searchbar component*/}
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
              onFocus={openList}
              onChangeText={(text) => searchProduct(text)}
            />
          </View>
        </View>
        {/*<Searchbar value={value} updateSearch={updateSearch} />*/}
      </View>

      <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />

      {focus == true ? (
        <SearchedProducts productsFiltered={productsFiltered} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/*Button Container*/}
          <View style={styles.buttonContainer1}>
            <TouchableOpacity
              style={styles.btnAddProduct}
              onPress={() => navigation.navigate("ProductForm")}
            >
              {/*MaterialCommunity generates the Cart icon at the right corner (in the below codes)*/}
              <Entypo
                name="shopping-bag"
                style={{
                  fontSize: 18,
                  color: COLOURS.backgroundMedium,
                  padding: 12,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroundLight,
                }}
              >
                <Text>Sell</Text>
              </Entypo>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnAddProduct}
              onPress={() => navigation.navigate("MyListings")}
            >
              {/*MaterialCommunity generates the Cart icon at the right corner (in the below codes)*/}
              <MaterialCommunityIcons
                //name="cart"
                style={{
                  fontSize: 18,
                  color: COLOURS.backgroundMedium,
                  padding: 12,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroundLight,
                }}
              >
                <Text>Products</Text>
              </MaterialCommunityIcons>
            </TouchableOpacity>
          </View>

          {/*Button Container ends here*/}

          {/*products card starts here*/}
          <View
            style={{
              padding: 16,
=======
            height: 160,
            position: "static",
            backgroundColor: "#3F569C",
            borderBottomRadius: 10,
            marginTop: insets.top,
          }}
        >
          <View
            style={{
              marginBottom: 10,
              padding: 16,
              flexDirection: "row",
              justifyContent: "space-between",
>>>>>>> 977f87f (market)
            }}
          >
            <Text
              style={{
                fontSize: 24,
                color: COLOURS.white,
                fontWeight: "500",
              }}
            >
              Marketplace
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("ProductForm")}
            >
              {/*Entypo generates the market icon (in the below codes)*/}
              <Entypo
                name="shopping-bag"
                style={{
                  fontSize: 18,
                  color: "white",
                  padding: 12,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroundLight,
                  backgroundColor: COLOURS.backgroundDark.Light,
                }}
              />
            </TouchableOpacity>
          </View>
          {/* Call Searchbar component*/}
          <Searchbar value={value} updateSearch={updateSearch} />
        </View>

        <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/*Button Container*/}
          <View style={styles.buttonContainer1}>
            <TouchableOpacity
              style={styles.btnAddProduct}
              onPress={() => navigation.navigate("ProductForm")}
            >
              {/*MaterialCommunity generates the Cart icon at the right corner (in the below codes)*/}
              <Entypo
                name="shopping-bag"
                style={{
                  fontSize: 18,
                  color: COLOURS.backgroundMedium,
                  padding: 12,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroundLight,
                }}
              >
                <Text>Sell</Text>
              </Entypo>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnAddProduct}
              onPress={() => navigation.navigate("MyListings")}
            >
              {/*MaterialCommunity generates the Cart icon at the right corner (in the below codes)*/}
              <MaterialCommunityIcons
                //name="cart"
                style={{
                  fontSize: 18,
                  color: COLOURS.backgroundMedium,
                  padding: 12,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroundLight,
                }}
              >
                <Text>Products</Text>
              </MaterialCommunityIcons>
            </TouchableOpacity>
          </View>

          {/*Button Container ends here*/}

          {/*products card starts here*/}
          <View
            style={{
              padding: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: COLOURS.black,
                    fontWeight: "500",
                    letterSpacing: 1,
                  }}
                >
                  Products
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLOURS.black,
                    fontWeight: "400",
                    opacity: 0.5,
                    marginLeft: 10,
                  }}
                ></Text>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  color: COLOURS.blue,
                  fontWeight: "400",
                }}
              >
                SeeAll
              </Text>
            </View>
            {/*calling the ProductCard reusable component display Puroduct details in the home screen*/}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}
            >
              {products.map((data) => {
                return <ProductCard data={data} key={data.id} />;
              })}
            </View>
          </View>
        </ScrollView>
<<<<<<< HEAD
      )}
    </SafeAreaView>
=======
      </View>
    </KeyboardAwareScrollView>
>>>>>>> 977f87f (market)
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: COLOURS.white,
  },
  btnContainer: {
    marginBottom: 160,
    backgroundColor: "white",
  },
  buttonContainer1: {
    margin: 20,
    alignSelf: "center",
    flexDirection: "row",
  },
  buttonText: {
    marginLeft: 4,
    color: "COLOURS.backgroundMedium",
  },
  btnAddProduct: {
    flexDirection: "row",
    borderRadius: 3,
    //padding: 10,
    margin: 5,
    justifyContent: "center",
    //background: transparent,
    //backgroundColor: COLOURS.backgroundLight,
    //width: 100,
  },
  /////
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
});
