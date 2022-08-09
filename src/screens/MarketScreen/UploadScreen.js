<<<<<<< HEAD
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList, Pressable, Alert, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../../../config'

const UploadScreen = () => {
    //fetch images from local storage of mobile device
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const [users, setUsers] = useState([]);
    const todoRef = firebase.firestore()

    const pickImage = async () => {
        // No permissions request is neccessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        });

        const source = {uri: result.uri};
        console.log(source);
        setImage(source);
    };

    const uploadImage = async () => {
        setUploading(true);
        const response = await fetch( image.uri)
        const blob = await response.blob();
        const filename = image.uri.substring(image.uri.lastIndexOf('/')+1);
        var ref = firebase.storage().ref().child(filename).put(blob);

        try {
            await ref;
        } catch (e) {
            console.log(e);
        }
        setUploading(false);
        Alert.alert(
            'Photo uploade..!!'
        );
        setImage(null);
    };


  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
            <Text style={styles.buttonText}>Pick an Image</Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
            {image && <Image source={{uri: image.uri}} style={{ width:300, height:300}}/>}
            <TouchableOpacity style={styles.uploadButton}onPress={uploadImage} >
                <Text style={styles.buttonText}>
                    Upload Image
                </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default UploadScreen
=======
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Pressable,
  Alert,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
//import { firebase } from "../../../config";
import { firebase } from "../../../config2";


const UploadScreen = () => {
  //fetch images from local storage of mobile device
  const todoRef = firebase.firestore().collection("newData");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [users, setUsers] = useState([]);
  //const todoRef = firebase.firestore();

  const pickImage = async () => {
    // No permissions request is neccessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const source = { uri: result.uri };
    console.log(source);
    setImage(source);
  };

  const uploadImage = async () => {
    setUploading(true);
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);
    //var ref = ref().child(filename).put(blob);
    //var ref = firebase.storage().ref().child(filename).put(blob);
    
    try {
      if(image && image.length > 0){
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
            image:blob,
            createdAt: timestamp
        };
        todoRef
            .add(data)
            .then(() => {
              setImage('');
            })
      }
      //await ref;
    } catch (e) {
      console.log(e);
    }
    setUploading(false);
    Alert.alert("Photo uploade..!!");
    setImage(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an Image</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {image && (
          <Image
            source={{ uri: image.uri }}
            style={{ width: 300, height: 300 }}
          />
        )}
        <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
          <Text style={styles.buttonText}>Upload Image</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UploadScreen;
>>>>>>> 8197af2 (market)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000",
    justifyContent: "center",
  },
  selectButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
<<<<<<< HEAD
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer:{
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center',
    
  }
});
=======
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: "center",
  },
});
>>>>>>> 8197af2 (market)
