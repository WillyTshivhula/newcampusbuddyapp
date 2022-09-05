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
  KeyboardAvoidingView,
  Modal,
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
import { Paragraph, Dialog, Portal, Appbar } from "react-native-paper";
import { Avatar } from "react-native-paper";
var { height, width } = Dimensions.get("window");
import Icon from "react-native-vector-icons/FontAwesome";
const ManageListings = (props) => {
  const insets = useSafeAreaInsets();
  const [productList, setProductList] = useState();
  const [productFilter, setProductFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  useFocusEffect(
    useCallback(() => {
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

  const Item = ({ title, itemUrl, index, onPress }) => (
    <TouchableOpacity
      style={[
        styles.item,
        { backgroundColor: index % 2 == 0 ? "white" : "gainsboro" },
      ]}
      onPress={onPress}
    >
      <Avatar.Image source={{ uri: itemUrl }} size={60} />

      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      itemUrl={item.itemUrl}
      index={item.index}
      onPress={() => {
        setSelectedId(item);
        setModalVisible(true);
      }}
    />
  );
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

      <View style={styles.buttonContainer1}></View>

      <View>
        {loading ? (
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        ) : (
          <FlatList
            data={productFilter}
            // ListHeaderComponent={ListHeader}
            // renderItem={({ item, index }) => (
            //   <ListItem
            //     {...item}
            //     navigation={props.navigation}
            //     index={index}
            //     delete={deleteProduct}
            //   />
            // )}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          />
        )}
      </View>
      {/*//////////////////////////////// */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              underlayColor="#E8E8E8"
              onPress={() => {
                setModalVisible(false);
              }}
              style={{
                alignSelf: "flex-end",
                position: "absolute",
                top: 5,
                right: 10,
              }}
            >
              <Icon name="close" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnEdit}
              onPress={() => [
                props.navigation.navigate("ProductForm", { item: selectedId }),
                setModalVisible(false),
              ]}
            >
              <Text style={styles.textStyle}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnDelete}
              onPress={() => [
                deleteProduct(selectedId.id),
                setModalVisible(false),
              ]}
            >
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ManageListings;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
  },
  title: {
    fontSize: 24,
    flex: 5,
    fontWeight: "600",
    marginTop: 15,
    marginLeft: 10,
  },
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnEdit: {
    flexDirection: "row",
    borderRadius: 3,
    padding: 10,
    margin: 5,
    justifyContent: "center",
    //background: transparent,
    backgroundColor: "#62b1f6",
    width: 100,
  },
  btnDelete: {
    flexDirection: "row",
    borderRadius: 3,
    padding: 10,
    margin: 5,
    justifyContent: "center",
    //background: transparent,
    width: 100,
    backgroundColor: "#f40105",
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
