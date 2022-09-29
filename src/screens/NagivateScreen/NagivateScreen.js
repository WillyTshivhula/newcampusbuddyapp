import React, { useState } from 'react';
import image from "../../../assets/images/bg2.jpg";
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants'
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  height,
  Button,
  StatusBar,
} from "react-native";

import { COLORS, SIZES, FONTS } from "../../../constants";
//import CustomButton from '../../../../Authentication/src/components/CustomButton';
import { LinearGradient } from "expo-linear-gradient";
import { Center } from "native-base";

export default function NagivateScreen({ navigation }) {
  function nav(value) {
    navigation.navigate(value);
  }
  const [result, setResult] = useState(null);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('https://willytshivhula.github.io/WhoAmI.github.io/');
    setResult(result);
  };
  function renderHeader() {
    return (
      <View
        style={{
          height: SIZES.height > 700 ? "65%" : "60%",
        }}
      >
        <ImageBackground
          source={require("../../../assets/images/Newbg.jpg")}
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
          resizeMode="cover"
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[COLORS.transparent, COLORS.black]}
            style={{
              height: 200,
              justifyContent: "flex-end",
              paddingHorizonal: SIZES.padding,
            }}
          >
            <Text
              style={{
                width: "88%",
                color: COLORS.white,
                ...FONTS.largeTitle,
                lineHeight: 45,
                fontWeight: "bold",
                left: 23,
                padding:20
              }}
            >
              Campus <Text style={styles.span}>Buddy</Text>
            </Text>
            
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  }
  const myTouch = () => {
   
  };
  // Dont forget use replace so that user wont be able to go back

  function renderDetail() {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/*Description*/}
      
        <Text
          style={{
            marginTop: SIZES.radius,
            width: "80%",
            color: COLORS.gray,
            ...FONTS.body3,
            marginLeft : 80,
            alignContent: "center",
            justifyContent: "center"
          }}
        >
          Live session made easy !
        </Text>

        {/*Buttoms*/}

        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          {/*Login*/}
          <View style={styles.container}>
            <TouchableOpacity onPress={_handlePressButtonAsync} style={styles.area}>
              <Text style={styles.paragraph}>Join Live</Text>
            </TouchableOpacity>

            
          </View>

          {/*New User*/}

          {/*Guest*/}
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
      }}
    >
      <StatusBar barStyle={"light-content"} />
      {/*Header*/}
      {renderHeader()}

      {/*detail*/}
      {renderDetail()}
    </View>
  );
}

const styles = StyleSheet.create({
  area: {
    marginVertical: -5,
    height: 50,
    marginHorizontal: 10,
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#f9004d",
    alignItems: "center",
    marginTop: -80
  },
  paragraph: {
    textTransform: "uppercase",
    color: "#f9004d",
    fontSize: 16,
    fontWeight: "bold",
  },
  span :{
    color: "#f9004d",
  }
});
