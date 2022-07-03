import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLOURS, Items } from "../../../components/database/Database";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


import Searchbar from "../../../components/SearchBar";

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [accessory, setAccessory] = useState([]);
  const [books, setBooks] = useState([]);

  //SearchBar function
  const [value, setValue] = useState();
  function updateSearch(value) {
    //do your search logic or anything
    console.log(value);
  }

  //Async Storage starts
  //get called on scren loads
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  //get data from DB start...
  const getDataFromDB = () => {
    let productList = [];
    let accessoryList = [];
    let bookList = [];
    for (let index = 0; index < Items.length; index++) {
      if (Items[index].category == "product") {
        productList.push(Items[index]);
      } else if (Items[index].category == "accessory") {
        accessoryList.push(Items[index]);
      } else if (Items[index].category == "book") {
        bookList.push(Items[index]);
      }
    }

    setProducts(productList);
    setAccessory(accessoryList);
    setBooks(bookList);
  };
  //Async Storage ends

  //create a product reusable card

  const ProductCard = ({ data }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductInfo", { productID: data.id })
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
            source={data.productImage}
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
          {data.productName}
        </Text>

        {/*Display product Price based on category */}
        <Text>R {data.productPrice}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/*Header (Campus Market title)*/}
      <View
        style={{ height: "20%", position:'static', backgroundColor: "#3F569C", borderRadius: 10 }}
      >
        <View
          style={{
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
          <TouchableOpacity onPress={() => navigation.navigate("Listing")}>
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
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 16,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("MyCart")}>
            {/*MaterialCommunity generates the Cart icon at the right corner (in the below codes)*/}
            <MaterialCommunityIcons
              name="cart"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLOURS.backgroundLight,
              }}
            />
            <Text>Update</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("MyListings")}>
            {/*MaterialCommunity generates the Cart icon at the right corner (in the below codes)*/}
            <MaterialCommunityIcons
              name="cart"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLOURS.backgroundLight,
              }}
            >
            <Text>My Listings</Text>
            </MaterialCommunityIcons>
          </TouchableOpacity>
        </View>

        {/*products card*/}
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

        {/*Duplicate (accessory card)*/}
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
                Accessories
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
            {accessory.map((data) => {
              return <ProductCard data={data} key={data.id} />;
            })}
          </View>
        </View>

        {/*Duplicate (Books card)*/}
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
                Books
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
            {books.map((data) => {
              return <ProductCard data={data} key={data.id} />;
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: COLOURS.white,
  },
});
