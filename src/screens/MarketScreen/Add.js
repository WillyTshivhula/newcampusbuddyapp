import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, Image} from 'react-native'
import React, { useState, useEffect } from 'react';
import { firebase } from "../../../config2";
import * as ImagePicker from "expo-image-picker";

const Add = () => {
    const todoRef = firebase.firestore().collection('newData');
    const [addData, setAddData] = useState('');
    ///
    const [image, setImage] = useState(null);
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


    //add a new field
    const addField = () => {
        // check if we have new field data
        if (addData && addData.length > 0){
            //get the timestamp
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                heading: addData,
                image: image,
                createdAt: timestamp
            };
            todoRef
                .add(data)
                .then(() => {
                    // release the new field state
                    setAddData('');
                    // release keyboard
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    // show an alert in case of error
                    alert(error);
                })
        }
    }

    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add some text"
            placeholderTextColor="#aaaaaa"
            onChangeText={(heading) => setAddData(heading)}
            value={addData}
            multiline={true}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick an Image</Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          {image && (
            <Image
              source={{ uri: image.uri }}
              style={{ width: 300, height: 300 }}
            />
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={addField}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: "row",
    height: 80,
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: "#788eec",
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: "center",
  },
});

export default Add;