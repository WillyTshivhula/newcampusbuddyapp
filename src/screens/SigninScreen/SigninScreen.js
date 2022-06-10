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

export default function SigninScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [err ,setErro] = useState(false)

  function nav(value) {
    navigation.navigate(value);
  }
  function signIn() {
    const data = {
      usernameOrEmail: username,
      password: password,
    };
  
    axios
      .post("http://192.168.0.157:8080/api/auth/signin", data)
      .then((data) => {
        nav('Tabs')
        console.log(data.data.body);
      })
      .catch((err) => console.log(err));
  }
  return (
    <View style={styles.mainView}>
      <View style={styles.topView}>
        <Image source={Logo} style={{ width: 190, height: 80 }} />
      </View>
      <View style={styles.bottonView}>
        <Text style={styles.heading}>Welcome back</Text>
        <View style={styles.formView}>
          <TextInput
            style={styles.TextInput}
            placeholder={"Email Address"}
            placeholderTextColor={"#fff"}
            onChangeText={(username) => setUsername(username)}
          />
          { err ? <Text>Username is required</Text> : <Text></Text>}
          <TextInput
            style={styles.TextInput}
            placeholder={"Password"}
            placeholderTextColor={"#fff"}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
          <TouchableOpacity style={styles.forgot} onPress={() => nav("Forgot")}>
            <Text style={styles.SignText}>Forgot Password ?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={signIn}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.SignBtn} onPress={() => nav("SignUp")}>
          <Text style={styles.SignText}>Sign up</Text>
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
