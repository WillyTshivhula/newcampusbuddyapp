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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context"; //
import { db, auth, storage } from "../../../firebaseSdk";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import { Paragraph, Dialog, Portal, Appbar } from "react-native-paper";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

import baseURL from "../../../assets/common/baseUrl";
import axios from "axios";

var { height, width } = Dimensions.get("window");
const UploadProfile = (props) => {
  const insets = useSafeAreaInsets();
  const [value, setvalue] = useState("");
  const [item, setItem] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [path, setPath] = useState(null);

  useEffect(() => {
    
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

  const testUp = async () => {
    if(item !== null){
      setLoading(true);
      addProduct(image);
    }else{
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

  //upload new listing data to the database
  const addProduct = (imageLink) => {
      const data = {
        pictureULR:imageLink,
          userEmail:auth.currentUser.email
      }
      console.log(data)
    axios
    .post(`http://192.168.0.157:8080/api/upload/new`, data)
    .then((res) => {
      setLoading(false);
      if (res.status == 200 || res.status == 201) {
        Alert.alert("Success", "Profile successfully updated", [
          { text: "Ok" },
        ]);
        setTimeout(() => {
          props.navigation.navigate("Tabs");
        }, 500);
      }
    })
    .catch((error) => {
        console.log(error);
      setLoading(false);
      Alert.alert("Success", "Something went wrong, Please try again", [
        { text: "Ok" },
      ]);
    });
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
          onPress={() => props.navigation.navigate("Tabs")}
        />
        <Appbar.Content title={"Updating profile"} />
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
            <TouchableOpacity
                  style={styles.button}
                  onPress={() => testUp()}
                >
                  <Text style={styles.buttonText}>Update Profile</Text>
                </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default UploadProfile;

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
    marginLeft:20,
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
