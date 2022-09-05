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
  ImageBackground,
  Button,
  ActivityIndicator,
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
<<<<<<< HEAD
import { firebase } from "../../../config2";
import mime from "mime";
=======

>>>>>>> 977f87f (market)
=======
import mime from "mime";
import { Paragraph, Dialog, Portal, Appbar } from "react-native-paper";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
>>>>>>> 99ade3d (market)

import baseURL from "../../../assets/common/baseUrl";
import axios from "axios";

var { height, width } = Dimensions.get("window");
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
  const [uploadedImg, setUploadedImg] = useState("");
  //useState for image picker
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [path, setPath] = useState(null);
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
      setImage(props.route.params.item.itemUrl);
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
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const uploadurl = result.uri.substring(result.uri.lastIndexOf("/") + 1);
    setPath(uploadurl);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
<<<<<<< HEAD
  if (hasGalleryPermission === false) {
    return <Text>No access to Internal Storage</Text>;
  }
  //image picker ends

  

=======
  const testUp = async () => {
    if (item !== null) {
      setLoading(true);
      addProduct(image);
    } else {
      setLoading(true);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image, true);
        xhr.send(null);
      });
      const fileRef = ref(getStorage(), path);
      const result = await uploadBytes(fileRef, blob);
      blob.close();
      return await getDownloadURL(fileRef).then((url) => {
        addProduct(url);
      });
    }
  };
>>>>>>> 99ade3d (market)
  //upload new listing data to the database
  const addProduct = (imageLink) => {
    if (title == "" || price == "" || condition == "" || description == "") {
      Alert.alert("Warning", "Please fill in the form correctly", [
        { text: "Ok" },
      ]);
      setLoading(false);
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
        itemUrl: imageLink,
      };

      if (item !== null) {
        axios
          .put(`${baseURL}/market/update/${item.id}`, datas)
          .then((res) => {
            setLoading(false);
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
            setLoading(false);
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
<<<<<<< HEAD
>>>>>>> 977f87f (market)
=======
        // setLoading(true);
>>>>>>> 99ade3d (market)
        axios
          .post(`${baseURL}/market/addNew`, datas)
          .then((res) => {
            setLoading(false);
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
<<<<<<< HEAD
            Alert.alert("Error", "Something went wrong, Please try again", [
=======
            setLoading(false);
            Alert.alert("Success", "Something went wrong, Please try again", [
>>>>>>> 99ade3d (market)
              { text: "Ok" },
            ]);
          });
      }
    }
  };

  return (
    <View
      style={{
        // backgroundColor: "#3F569C",
        flex: 1,
        width: "100%",
        height: "100%",
        // marginTop: insets.top,
      }}
    >
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => props.navigation.navigate("Market")}
        />
        <Appbar.Content title={"Create New Listing"} />
      </Appbar.Header>

      <ScrollView
        style={{
          flex: 1,
        }}
      >
        {loading ? (
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        ) : (
          <View style={styles.container}>
            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  height: Dimensions.get("window").height / 2.5,
                }}
              />
            )}
            {!image ? (
              <ImageBackground
                source={require("../../../assets/images/bg1.jpg")}
                style={{
                  height: Dimensions.get("window").height / 2.5,
                }}
              >
                <View>
                  <Button
                    style={styles.tinyLogo}
                    title="Pick an image from camera roll"
                    onPress={pickImage}
                  />
                </View>
              </ImageBackground>
            ) : null}

            <View style={styles.bottomView}>
              <View style={styles.formView}>
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

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => testUp()}
                >
                  <Text style={styles.buttonText}>Create New Listing</Text>
                </TouchableOpacity>
                <Text style={styles.textStyle}>{value}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ProductForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOURS.backgroundLight,
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
  formView: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
  },
  bottomView: {
    flex: 1.5,
    backgroundColor: "#fff",
    // bottom:50,
    position: "relative",
    top: -30,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
  tinyLogo: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 26,
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
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
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
