import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Dimensions,
  Picker,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { COLOURS, Items } from "../../../components/database/Database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context"; //
import { db, auth, storage } from "../../../firebaseSdk";
import * as ImagePicker from "expo-image-picker";
<<<<<<< HEAD
import { firebase } from "../../../config2";
import mime from "mime";
=======

>>>>>>> 977f87f (market)

import baseURL from "../../../assets/common/baseUrl";
import axios from "axios";
import { EmailAuthCredential } from "firebase/auth";

const ProductForm = (props) => {
  const todoRef = firebase.firestore().collection("newData");
  const insets = useSafeAreaInsets();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [value, setvalue] = useState("");
  const [error, setError] = useState("");
  const [item, setItem] = useState(null);
  const [email, setEmail] = useState("");
  //useState for image picker
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    //edit or update product
    if (!props.route.params) {
      setItem(null);
    } else {
      setItem(props.route.params.item);
      setTitle(props.route.params.item.title);
      setPrice(props.route.params.item.price.toString());
      setCondition(props.route.params.item.condition);
      setDescription(props.route.params.item.description);
      //setImage(props.route.params.item.image);
    }

    // Image Picker
    // (async () => {
    //   const galleryStatus =
    //     await ImagePicker.requestMediaLibraryPermissionsAsync();
    //   setHasGalleryPermission(galleryStatus.status === "granted");
    // })();
  }, []);

  // pick image from gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  if (hasGalleryPermission === false) {
    return <Text>No access to Internal Storage</Text>;
  }
  //image picker ends

  

  //upload new listing data to the database
  const addProduct = () => {
    if (title == "" || price == "" || condition == "" || description == "") {
      Alert.alert("Warning", "Please fill in the form correctly", [
        { text: "Ok" },
      ]);
    } else {
      const datas = {
        title: title,
        price: price,
<<<<<<< HEAD
        //image: image,
=======
        email: auth.currentUser.email,
>>>>>>> 977f87f (market)
        condition: condition,
        description: description,
      };

      if (item !== null) {
        axios
          .put(`${baseURL}/market/update/${item.id}`, datas)
          .then((res) => {
            if (res.status == 200 || res.status == 201) {
              Alert.alert("Suuccess", "Product successfuly updated", [
                { text: "Ok" },
              ]);
              setTimeout(() => {
                props.navigation.navigate("MyListings");
              }, 500);
            }
          })
          .catch((error) => {
            Alert.alert("Error", "Something went wrong, Please try again", [
              { text: "Ok" },
            ]);
          });
      } else {
<<<<<<< HEAD

        //add to firebase
        //get the timestamp
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
          image: image,
          createdAt: timestamp,
          
        };
        todoRef
          .add(data)
          .then(() => {
            // release the new field state
            setImage("");
            // release keyboard
            Keyboard.dismiss();
          })
          .catch((error) => {
            // show an alert in case of error
            alert(error);
          });
        //
        //add to MySQL
=======
        console.log(data);
>>>>>>> 977f87f (market)
        axios
          .post(`${baseURL}/market/addNew`, datas)
          .then((res) => {
            if (res.status == 200 || res.status == 201) {
              Alert.alert("Success", "New Product successfully added", [
                { text: "Ok" },
              ]);
              setTimeout(() => {
                props.navigation.navigate("MyListings");
              }, 500);
            }
          })
          .catch((error) => {
            Alert.alert("Error", "Something went wrong, Please try again", [
              { text: "Ok" },
            ]);
          });
      }
    }
  };

  return (
    <View
      style={{
        backgroundColor: "#3F569C",
        flex: 1,
        width: "100%",
        height: "100%",
        marginTop: insets.top,
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
          Create New Listing
        </Text>
      </View>

      <View
        style={{
          flex: 1,

          backgroundColor: "#03cafc",
        }}
      >
        <KeyboardAvoidingView style={styles.container}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 100, height: 100 }}
            />
          )}
          {!image ? (
            <TouchableOpacity
              style={styles.noImage}
              onPress={() => pickImage()}
            >
              <Text style={styles.imageBtn}>Add an Image</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )} 

          <TextInput
            style={styles.TextInput}
            placeholder={"Title"}
            name="title"
            id="title"
            value={title}
            placeholderTextColor={"grey"}
            onChangeText={(title) => setTitle(title)}
          />
          <TextInput
            style={styles.TextInput}
            placeholder={"Price"}
            keyboardType={"numeric"}
            name="bpricerand"
            id="price"
            value={price}
            placeholderTextColor={"grey"}
            onChangeText={(price) => setPrice(price)}
          />

          <TextInput
            style={styles.TextInput}
            placeholder={"Condition"}
            name="condition"
            id="condition"
            value={condition}
            placeholderTextColor={"grey"}
            onChangeText={(condition) => setCondition(condition)}
          />
          <TextInput
            style={styles.TextInput}
            multiline={true}
            numberOfLines={4}
            placeholder={"Description"}
            name="description"
            id="description"
            value={description}
            placeholderTextColor={"grey"}
            onChangeText={(description) => setDescription(description)}
          />

          <TouchableOpacity style={styles.button} onPress={() => addProduct()}>
            <Text style={styles.buttonText}>Create New Listing</Text>
          </TouchableOpacity>
          <Text style={styles.textStyle}>{value}</Text>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default ProductForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOURS.backgroundLight,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 50,
    heigth: 50,
    borderStyle: "solid",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    marginTop: 32,
  },
  TextInput: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#e8e8e8",
    height: 52,
    borderRadius: 10,
    paddingLeft: 5,
    marginTop: 20,
    color: COLOURS.black,
    backgroundColor: "white",
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
  imageBtn: {
    fontWeight: "bold",
    fontSize: 18,
    color: "grey",
  },
  textStyle: {
    padding: 10,
    textAlign: "center",
  },
  noImage: {
    backgroundColor: "#E9EDF3",
    borderWidth: 0.1,
    height: 100,
    width: "90%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
