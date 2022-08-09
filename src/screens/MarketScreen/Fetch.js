import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Pressable, Image } from "react-native";
import { firebase } from '../../../config2';


const Fetch = () => {

    const [users, setUsers] = useState([]);
    const todoRef = firebase.firestore().collection('newData');

    useEffect(async () => {
        todoRef
        .onSnapshot(
            querySnapshot => {
                const users = []
                querySnapshot.forEach((doc) => {
                    const { heading, image /*text*/ } = doc.data()
                    users.push({
                        id: doc.id,
                        heading,
                        image
                        //text,
                    })
                })
                setUsers(users)
            }
        )
    }, [])

  return (
    <View style={{ flex: 1, marginTop: 100 }}>
      <FlatList
        style={{ height: "100%" }}
        data={users}
        numColumns={1}
        renderItem={({ item }) => (
          <Pressable style={styles.container}>
            <View style={styles.innerContainer}>
              <Text style={styles.itemHeading}>{item.heading}</Text>
              {/* <Text style={styles.itemText}>{item.text}</Text> */}
              <Image
                source={item.image }
                style={{ width: 300, height: 300 }}
              />
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default Fetch;

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#e5e5e5',
        padding: 15,
        borderRadius:15,
        margin: 5,
        marginHorizontal:10,
        borderWidth: 2,
        borderColor: 'red',
    },
    innerContainer:{
        alignItems: 'center',
        flexDirection: 'column',
    },
    itemHeading:{
        fontWeight: 'bold'
    },
    itemText:{
        fontWeight:'300',
    }
});
