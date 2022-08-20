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
  TouchableOpacity,KeyboardAvoidingView
} from "react-native";
import { COLOURS, Items } from "../../../components/database/Database";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect } from "@react-navigation/native";
import ListItem from "../MarketScreen/ListItem";
import {  useSafeAreaInsets } from "react-native-safe-area-context"; //
import { db, auth, storage } from "../../../firebaseSdk";
import axios from "axios";
import baseURL from "../../../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Paragraph, Dialog, Portal, Appbar } from "react-native-paper";

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
      {/*<View style={styles.headerItem}>
          <Text style={{fontWeight: '700'}}>Category</Text>
        </View> */}
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

  useFocusEffect(
    useCallback(() => {
      // Get Token
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));

      axios.get(`${baseURL}/market/findUserItem/${ auth.currentUser.email}`)
      .then((res) => {
        setProductList(res.data);
        setProductFilter(res.data);
        setLoading(false);
      })

      return () => {
        setProductList();
        setProductFilter();
        setLoading(true);
      }
    }, [])
  )

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
        const products = productFilter.filter((item) => item.id !== id)
        setProductFilter(products)
      })
      .catch((error) => console.log(error));
  };

  return (
    <View
      style={{
        backgroundColor: COLOURS.white,
        flex: 1,
        width: "100%",
        height: "100%",
        
      }}
    >
        <Appbar.Header>
        <Appbar.BackAction
          onPress={() => props.navigation.navigate("Market")}
        />
        <Appbar.Content title={"Your Listing"} />
      </Appbar.Header>
     
      <View style={styles.buttonContainer1}>
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate("ProductForm")}
        >
          <Text style={styles.buttonText}>Add Product</Text>
        </TouchableOpacity> */}
      </View>

      {/*Display products uploaded by seller */}
      <View>
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
      </View>
      {/*//////////////////////////////// */}
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
