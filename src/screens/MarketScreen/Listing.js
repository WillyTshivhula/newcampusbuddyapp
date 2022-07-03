import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import { COLOURS, Items } from "../../../components/database/Database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import mime from 'mime'
import Task from "./Task";

const Listing = ({navigation}) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [value, setvalue] = useState("");
  const [error, setError] = useState("");
  const [listItems, setListItems]= useState([]);
  //useState for image picker
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
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

  //send data to my listings
  const handleMyListing = () => {
    Keyboard.dismiss();
    setListItems([...listItems, title, price, category, condition, description])
    setTitle(null);
    setPrice(null);
    setCategory(null);
    setCondition(null);
    setDescription(null);
    
  }



  //upload new listing data to the database
  const addProduct = () => {
    if(
      image == "" ||
      title == "" ||
      price == "" ||
      category == "" ||
      condition == "" ||
      description == "" 
    ){
      setError("Please fill in the form correctly")
    }
    let formData = new FormData();
    const newImageUri = "file:///" + image.split("file:/").join("");

    formData.append("image", 
      {
        uri: newImageUri, 
        type: mime.getType(newImageUri), 
        name: newImageUri.split("/").pop()
      });
    formData.append("title", title);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("description", description);
    
    const config = {
      headers: {
        "Content-Type":"multipart/form-data",
        Authorization: 'Bearer ${token}'
      }
    }

   
  }
 //send new listing data to my Listings (my account to be managed by users)
  function myListings(){

  } 
  //add to my Listings (add to cart)
  /*
  const addToCart = async (id) => {
    let itemArray = await AsyncStorage.getItem("cartItems");
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      array.push(id);

      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        ToastAndroid.show(
          "Item Added Successfully to cart",
          ToastAndroid.SHORT
        );
        navigation.navigate("Home");
      } catch (error) {
        return error;
      }
    } else {
      let array = [];
      array.push(id);
      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        ToastAndroid.show(
          "Item Added Successfully to cart",
          ToastAndroid.SHORT
        );
        navigation.navigate("Home");
      } catch (error) {
        return error;
      }
    }
  };
  */

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
        <TouchableOpacity onPress={() => navigation.goBack()}>
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

      {/* exercises display result to send to cart */}

      {/* This is where the tasks will go! */}
      <View style={{paddingTop: 80, paddingHorizontal: 20,}}>
      <View style={{ marginTop: 30 }}>
        {
          listItems.map((item, index) => {
          return <Task key={index} text={item} />;
        })}
      </View>
      </View>
      {/* exercises display result to send to cart */}

      <KeyboardAvoidingView style={styles.container}>
        {
          image && (
          <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
        )}

        <TouchableOpacity style={styles.noImage} onPress={() => pickImage()}>
          <Text style={styles.imageBtn}>Add an Image</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.TextInput}
          placeholder={"Title"}
          placeholderTextColor={"grey"}
          onChangeText={(title) => setTitle(title)}
        />
        <TextInput
          style={styles.TextInput}
          placeholder={"Price"}
          keyboardType={"numeric"}
          placeholderTextColor={"grey"}
          onChangeText={(price) => setPrice(price)}
        />
        <TextInput
          style={styles.TextInput}
          placeholder={"Category"}
          placeholderTextColor={"grey"}
          onChangeText={(category) => setCategory(category)}
        />
        <TextInput
          style={styles.TextInput}
          placeholder={"Condition"}
          placeholderTextColor={"grey"}
          onChangeText={(condition) => setCondition(condition)}
        />
        <TextInput
          style={styles.TextInput}
          multiline={true}
          numberOfLines={4}
          placeholder={"Description"}
          placeholderTextColor={"grey"}
          onChangeText={(description) => setDescription(description)}
        />
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MyCart', handleMyListing())}
        >
          <Text style={styles.buttonText}>Create New Listing</Text>
        </TouchableOpacity>
        <Text style={styles.textStyle}>{value}</Text>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Listing;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOURS.backgroundLight,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width:50,
    heigth: 50,
    borderStyle: 'solid',
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
