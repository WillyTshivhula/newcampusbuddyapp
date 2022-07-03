// @refresh reset

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, TextInput, View, YellowBox, Button,TouchableOpacity, Image,Text,Animated, ScrollView } from 'react-native'

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import Ionicons from '@expo/vector-icons/Ionicons';
import * as WebBrowser from 'expo-web-browser';



const firebaseConfig = {
  
    apiKey: "AIzaSyCgRYUDfcR6miFnpIYHjvmN86IZoiwnSTo",
    authDomain: "react-native-chat-1d28b.firebaseapp.com",
    projectId: "react-native-chat-1d28b",
    storageBucket: "react-native-chat-1d28b.appspot.com",
    messagingSenderId: "114561333119",
    appId: "1:114561333119:web:ffcf8c49c693fdbaf20c4a"
  
}

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

YellowBox.ignoreWarnings(['Setting a timer for a long period of time'])

const db = firebase.firestore()
const chatsRef = db.collection('chats')

export default function App() {
    const [user, setUser] = useState(null)
    const [name, setName] = useState('')
    const [messages, setMessages] = useState([])
    

    useEffect(() => {
        readUser()
        const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
            const messagesFirestore = querySnapshot
                .docChanges()
                .filter(({ type }) => type === 'added')
                .map(({ doc }) => {
                    const message = doc.data()
                    //createdAt is firebase.firestore.Timestamp instance
                    //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
                    return { ...message, createdAt: message.createdAt.toDate() }
                })
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            appendMessages(messagesFirestore)
        })
        return () => unsubscribe()
    }, [])

    const appendMessages = useCallback(
        (messages) => {
            setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
        },
        [messages]
    )

    async function readUser() {
        const user = await AsyncStorage.getItem('user')
        if (user) {
            setUser(JSON.parse(user))
        }
    }
    async function handlePress() {
        const _id = Math.random().toString(36).substring(7)
        const user = { _id, name }
        await AsyncStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    }
    async function handleSend(messages) {
        const writes = messages.map((m) => chatsRef.add(m))
        await Promise.all(writes)
    }

   

      

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const handlePresss=()=>{
        Animated.timing(fadeAnim, {
            toValue:1,
            duration:5000,
            useNativeDriver:true,
        }).start();
    }

    

    if (!user) {
        return (
            <ScrollView>
            <View style={styles.container}>
                
                 <View style={styles.circle} />
                   <View style={{marginTop:64}}>
                   <Image source={require("../../../assets/images/chatlogo.png")} style={{width:120,height:120,alignSelf: "center"}}/>
            </View>

            <View style={{marginHorizontal:32}}>
            <Text style={styles.header}>Username</Text>
                <TextInput style={styles.input} placeholder="Campus Buddy Chat " value={name} onChangeText={setName} />

                <Text style={styles.text}>
             By Login in to Campus Buddy chat, you confirm that you accept our 
             <Text style={styles.link} onPress={async () => {
             await WebBrowser.openAuthSessionAsync('https://www.example.com', 'https://www.google.com');
             }}>Terms of Use</Text> and
             <Text style={styles.link} onPress={async () => {
             await WebBrowser.openAuthSessionAsync('https://www.example.com', 'https://www.google.com');
             }}> Privacy Policy </Text> </Text>



           
                <TouchableOpacity style={styles.button} onPress={handlePresss}>
                <Text style={styles.text}>
                     Accept
                </Text>
                </TouchableOpacity>
           

                <Animated.View style={{opacity:fadeAnim}}>

                <View style={{alignItems:"flex-end",marginTop:5}}>
                <TouchableOpacity style={styles.continue} onPress={handlePress}>
                    <Ionicons name="md-arrow-forward" size={24} color ="#FFF"/>
                </TouchableOpacity>
                
                </View>

                </Animated.View>


            </View>
        </View>

        </ScrollView>
        )
    }
    return <GiftedChat messages={messages} user={user} onSend={handleSend} />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#F4F5F7"
    },
    input: {
        height:50,
        width: '100%',
        borderWidth: 2,
        padding: 15,
        marginBottom: 20,
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        marginTop: 10,
        paddingHorizontal:16,
        color:"#514E5A",
        fontWeight:"600",
        borderRadius:30,
        height:50

    },
    header:{
        fontWeight: "800",
        fontSize:30,
        color: "#514E5A",
        marginTop:32,
        
    },
    
    continue:{
        width: 70,
        height:70,
        borderRadius:70/2,
        backgroundColor: "#9075E3",
        alignItems: "center",
        justifyContent: "center"
    },

    circle:{
        width : 200,
        height:700,
        borderRadius:500/2,
        backgroundColor: "#E2E2E2",
        position : "absolute",
        left: -105,
        top:-20,
        color:"#F4F5F7",
    },
    link:{
        color: "#9075E3"
      },
      button:{
        backgroundColor:"#9075E3",
        width:100,
        borderRadius:15,
        padding:15,
        margin:5,
        alignItems: "center",
        justifyContent: "center",
        alignSelf:"center"
        
    },
    anim:{
        backgroundColor:"tomato",
        width:200,
        padding:15,
        borderRadius:15,
    }
    
})

