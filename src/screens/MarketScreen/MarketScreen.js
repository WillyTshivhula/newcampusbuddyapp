import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { COLOURS, Items } from "../../../components/database/Database";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useSafeAreaInsets } from "react-native-safe-area-context"; //

import baseURL from "../../../assets/common/baseUrl";
import axios from "axios";

import Searchbar from "../../../components/SearchBar";
import Header from "../Component/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
var { height, width } = Dimensions.get("window");

export default function MarketScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [products, setProducts] = useState([]);
  const [accessory, setAccessory] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  //SearchBar function
  const [value, setValue] = useState();
  function updateSearch(value) {
    //do your search logic or anything
    console.log(value);
  }

  //Async Storage starts
  //get called on scren loads
  useFocusEffect(
    useCallback(() => {
      axios
        .get(`${baseURL}/market/all`)
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [])
  );

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
            source={{ uri: data.itemUrl }}
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
        <Header headerText="Marketplace" />

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
              {loading ? (
                <View style={styles.spinner}>
                  <ActivityIndicator size="large" color="blue" />
                </View>
              ) : (
                <>
                  {products.map((data) => {
                    return <ProductCard data={data} key={data.id} />;
                  })}
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAwareScrollView>
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
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
