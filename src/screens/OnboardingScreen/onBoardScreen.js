import React from "react";
import image from "../../../assets/images/bg2.jpg";

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

export default function OnBoardScreen({ navigation }) {
  function nav(value) {
    navigation.navigate(value);
  }

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
              A Virtual Campus At Your Fingertips
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
            width: "90%",
            color: COLORS.gray,
            ...FONTS.body3,
          }}
        >
          CampusBuddy, Chat, Navigate , Buy and Sell Etc.
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
            <TouchableOpacity onPress={() => nav("SignIn")} style={styles.area}>
              <Text style={styles.paragraph}>SIGN IN</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => nav("SignUp")}
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
                marginVertical: 5,
                height: 45,
                borderWidth: 1,
                borderRadius: 50,
                borderColor: "white",
              }}
            >
              <Text
                style={{
                  textTransform: "uppercase",
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                NEW USER
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={myTouch}
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
                marginVertical: 5,
                height: 45,
                borderRadius: 50,
              }}
            >
              <Text
                style={{
                  color: "#868686",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Guest
              </Text>
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
    marginVertical: 5,
    height: 50,
    marginHorizontal: 10,
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#f9004d",
    alignItems: "center",
  },
  paragraph: {
    textTransform: "uppercase",
    color: "#f9004d",
    fontSize: 16,
    fontWeight: "bold",
  },
});
