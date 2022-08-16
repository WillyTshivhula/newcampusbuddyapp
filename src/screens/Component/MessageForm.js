import React from 'react'
import {
    View,
    Text,StyleSheet,TextInput,TouchableOpacity,
  } from "react-native";
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function MessageForm({ handleSubmit, text, setText, setImg }) {
  return (

    <View style={styles.formView}>

    <TextInput
      style={styles.TextInput}
      placeholder={"Message"}
      placeholderTextColor={"black"}
      onChangeText={(text) => setText(text)}
    />
     <TouchableOpacity onPress={handleSubmit}
              style={{ width: "90%",justifyContent:'center',
	            alignItems:'center',marginHorizontal:50,marginVertical:18,
              height:45,borderWidth:3,borderRadius:50,borderColor:"black"}}>
             <Text style={{textTransform:"uppercase",
		                         color:"black",
		                             fontSize:16,
		                     fontWeight:"bold"}}>
                                  send m         
             </Text>
             </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    bottomView:{
      flex:1.5,
      backgroundColor:'#fff',
      bottom:50,
      borderTopStartRadius:60,
      borderTopEndRadius:60,

    },
    TextInput: {
      width: "90%",
      borderWidth: 1,
      borderColor: "black",
      height: 52,
      borderRadius: 20,
      paddingLeft: 5,
      marginTop: 20,
      color: "black",
      textAlign : "center",
      
      
    },
    
    formView: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
  },
  forgot: {
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
    marginTop: 10,
    marginRight: 34,
  },
  button: {
    width: "90%",
    color: "black",
    height: 52,
    backgroundColor: "black",
    borderRadius: 10,
    marginTop: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

SignText: {
  color: "#5d57ff",
},
buttonText: {
  fontWeight: "bold",
  fontSize: 18,
  color:'white'
}, tinyLogo: {
  width: 150,
  height: 150,
  justifyContent:'center',
  alignItems:'center',
  alignSelf:'center',
  marginTop: 26,

},
link:{
  color: "#9075E3"
},
SignBtn: {
  width: "100%",
  display: "flex",
  alignItems: "center",
  marginTop: 20,
},
SignText: {
  color: "gray",
},

  })