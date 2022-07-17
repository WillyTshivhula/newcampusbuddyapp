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
  Keyboard,
} from "react-native";
import { useState, useEffect } from "react";
import { COLOURS, Items } from "../../../components/database/Database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context"; //
import Toast from "react-native-toast-message"
import * as ImagePicker from "expo-image-picker";
import mime from "mime";

import baseURL from "../../../assets/common/baseUrl";
import axios from "axios";

// function for tabs buttons starts
function Sell(props) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [value, setvalue] = useState("");
  const [error, setError] = useState("");
  const [item, setItem] = useState(null);
  //useState for image picker
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {

    //edit or update product
    if(!props.route.params) {
        setItem(null);
    } else {
        setItem(props.route.params.item);
        setTitle(props.route.params.item.title);
        setPrice(props.route.params.item.price.toString());
        setCategory(props.route.params.item.category);
        setCondition(props.route.params.item.condition);
        setDescription(props.route.params.item.description);
        setImage(props.route.params.item.image);
    }

    // Image Picker
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

  //upload new listing data to the database
  const addProduct = () => {
    if (
      image == "" ||
      title == "" ||
      price == "" ||
      category == "" ||
      condition == "" ||
      description == ""
    ) {
      setError("Please fill in the form correctly");
    }
    let formData = new FormData();

    const newImageUri = "file:///" + image.split("file:/").join("");

    formData.append("image", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
    });
    formData.append("name", title);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("description", description);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer ${token}",
      },
    };

    if(item !== null) {
        axios
        .put(`${baseURL}/products/${item.id}`, formData)
        .then((res) => {
            if (res.status == 200 || res.status == 201) {
              Toast.show({
                topOffset: 60,
                type: "success",
                text1: "Product successfuly updated",
                text2: "",
              });
              setTimeout(() => {
                props.navigation.navigate("MyListing");
              }, 500);
            }
          })
          .catch((error) => {
            Toast.show({
              topOffset: 60,
              type: "error",
              text1: "Something went wrong",
              text2: "Please try again",
            })
          })
    } else {
        axios
          .post(`${baseURL}/products`, formData)
          .then((res) => {
            if (res.status == 200 || res.status == 201) {
              Toast.show({
                topOffset: 60,
                type: "success",
                text1: "New Product added",
                text2: "",
              });
              setTimeout(() => {
                props.navigation.navigate("MyListing");
              }, 500);
            }
          })
          .catch((error) => {
            Toast.show({
              topOffset: 60,
              type: "error",
              text1: "Something went wrong",
              text2: "Please try again",
            });
          });
    }
    
  };

  return (
    <View
      style={{
        flex: 1,

        backgroundColor: "#03cafc",
      }}
    >
      <KeyboardAvoidingView style={styles.container}>
        {image && (
          <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
        )}
        {!image ? (
          <TouchableOpacity style={styles.noImage} onPress={() => pickImage()}>
            <Text style={styles.imageBtn}>Add an Image</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}

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
          onPress={() => addProduct()}
        >
          <Text style={styles.buttonText}>Create New Listing</Text>
        </TouchableOpacity>
        <Text style={styles.textStyle}>{value}</Text>
      </KeyboardAvoidingView>
    </View>
  );
}

function Service() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setvalue] = useState("");
  return (  
    <View style={{ flex: 1,}}>
      <KeyboardAvoidingView style={styles.container}>
        <TextInput
          style={styles.TextInput}
          placeholder={"Name"}
          placeholderTextColor={"grey"}
          onChangeText={(name) => setTitle(name)}
        />
        <TextInput
          style={styles.TextInput}
          placeholder={"Course"}
          placeholderTextColor={"grey"}
          onChangeText={(course) => setPrice(course)}
        />
        <TextInput
          style={styles.TextInput}
          placeholder={"Academic year"}
          placeholderTextColor={"grey"}
          onChangeText={(year) => setCategory(year)}
        />
        <TextInput
          style={styles.TextInput}
          placeholder={"Service Title"}
          placeholderTextColor={"grey"}
          onChangeText={(title) => setCondition(title)}
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
          onPress={() => navigation.navigate("MyCart", handleMyListing())}
        >
          <Text style={styles.buttonText}>Create New Listing</Text>
        </TouchableOpacity>
        <Text style={styles.textStyle}>{value}</Text>
      </KeyboardAvoidingView>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="Sell"
      tabBarOptions={{
        activeTintColor: "grey",
        labelStyle: { fontSize: 12 },
        style: { backgroundColor: "white", marginTop: insets.top },
      }}
    >
      <Tab.Screen
        name="Sell"
        component={Sell}
        options={{ tabBarLabel: "Sell" }}
      />
      <Tab.Screen
        name="Service"
        component={Service}
        options={{ tabBarLabel: "Service" }}
      />
    </Tab.Navigator>
  );
}
// function for tabs buttons ends

const Listing = ({ navigation }) => {
  const insets = useSafeAreaInsets();

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

      {/*Tabs button for products and item */}

      <MyTabs />

      {/*ends Tabs button for products and item */}
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
