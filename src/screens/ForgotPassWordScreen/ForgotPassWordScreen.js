import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Logo from "../../../assets/images/Logo_1.jpg";
import axios from "axios";

export default function ForgotPassWordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  function register() {
    const data = {
      email: email,
      newPassword: newPassword,
    };
  
  axios
  .put("http://10.0.0.7:8080/api/auth/reset", data)
  
  .then((data) => {
    nav('Tabs')
    console.log(data.data.body);
  })
  .catch((err) => console.log(err));
  
}
  function nav() {
    navigation.navigate("SignIn");
  }
  return (
    <View style={styles.mainView}>
      <View style={styles.topView}>
        <Image source={Logo} style={{ width: 190, height: 80 }} />
      </View>
      <View style={styles.bottonView}>
        <Text style={styles.heading}>Reset password</Text>
        <View style={styles.formView}>
          <TextInput
            style={styles.TextInput}
            placeholder={"Email Address"}
            placeholderTextColor={"#fff"}
            onChangeText={(email) => setEmail(email)}
          />
          <TextInput
            style={styles.TextInput}
            placeholder={"New Password"}
            placeholderTextColor={"#fff"}
            secureTextEntry={true}
            onChangeText={(newPassword) => setNewPassword(newPassword)}
          />
          <TouchableOpacity style={styles.button} onPress={register}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.SignBtn} onPress={nav}>
          <Text style={styles.SignText}>Back to sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    marginTop: 40,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  topView: {
    width: "100%",
    height: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bottonView: {
    width: "100%",
    height: "70%",
    backgroundColor: "#474749",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  heading: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
    marginLeft: 30,
    marginTop: 60,
  },
  formView: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 40,
  },
  TextInput: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#fff",
    height: 52,
    borderRadius: 10,
    paddingLeft: 5,
    marginTop: 20,
    color: "#fff",
  },
  button: {
    width: "90%",
    color: "#000",
    height: 52,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  SignText: {
    color: "gray",
  },
  SignBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: 20,
  },
  forgot: {
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
    marginTop: 20,
    marginRight: 34,
  },
});
