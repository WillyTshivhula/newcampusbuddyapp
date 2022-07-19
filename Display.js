/*
import React, {useState} from "react";
import { StyleSheet, Text, View } from "react-native";
import AddPostView from "./AddPostView";
import ImagePicker from 'react-native-image-crop-picker';

const Display = () => {
    const[images, setImages] =useState( initialState, []);

    const openImagePicker = () => {
        let imageList = [];

        ImagePicker.openPicker( options, {
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            compressImageQuality: 0.8,
            maxFiles:10,
            mediaType: 'any',
            includeBase64: true,
        })
        .then(response => {
            console.log('Response: ', response);
            response.map(image => {
                imageList.push({
                    filename: image.filename,
                    path: image.path,
                    data: image.data,
                });
            });
            setImages(imageList);
        })
        .catch(e => console.log('Error: ',e.message));
    };

  return (
    <AddPostView newImages={images} addImage={openImagePicker}/>
      
  );
};

export default Display;

const styles = StyleSheet.create({});

*/