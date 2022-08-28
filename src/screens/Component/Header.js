import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar
  } from "react-native";
export default function Header({headerText}) {
  return (
    <View style={styles.Header}>
        <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        hidden={true} />
      <View>
        {/* <Text style={styles.textH}> 
          {headerText}
        </Text> */}
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
      alignItems:'center',
      justifyContent:'center'

    },
    textH:{
        fontSize:20,
        fontWeight:'400',
        color:'#9075E3'
    }
})