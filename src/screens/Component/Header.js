import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar
  } from "react-native";
  import Icon from "react-native-vector-icons/FontAwesome";
export default function Header({headerText}) {
  return (
    <View style={styles.Header}>
        <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        hidden={true} />
      <View>
        <Text style={styles.textH}> 
        <Icon name="sign-out" size={40} />
        </Text>
        <Text>Logout</Text>
    </View>
    </View>
  )
}
const styles = StyleSheet.create({
    Header: {
      width: '100%',
      backgroundColor: "#E2E2E2",
      height:100,
      flexDirection:'row',
      alignItems:'flex-end',
        justifyContent:"flex-end",
        paddingRight:10,
        paddingBottom:10

    },
    textH:{
        fontSize:0,
        fontWeight:'100',
        color:'#9075E3',
        
    }
})