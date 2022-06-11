import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import Logo from "../../../assets/images/Logo_1.jpg";
import axios from "axios";

export default function SignUpScreen({ navigation }) {
  const [name, setname] = useState("");
  const [username, setUsername] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function signUp() {
    const data = {
      name: name,
      username: username,
      course: course,
      email: email,
      password: password,
    };

    
    axios
    .post("http://10.0.0.7:8080/api/auth/signup", data)
    
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
        {/* <Image source={Logo} style={{ width: 190, height: 80 }} /> */}
      </View>
      <View style={styles.bottonView}>
        <Text style={styles.heading}>Create account</Text>
        <View style={styles.formView}>
          <TextInput
            style={styles.TextInput}
            placeholder={"Full Name"}
            placeholderTextColor={"#fff"}
            onChangeText={(name) => setname(name)}
          />
          <TextInput
            style={styles.TextInput}
            placeholder={"Username"}
            placeholderTextColor={"#fff"}
            onChangeText={(username) => setUsername(username)}
          />
          <TextInput
            style={styles.TextInput}
            placeholder={"Course"}
            placeholderTextColor={"#fff"}
            onChangeText={(course) => setCourse(course)}
          />
          <TextInput
            style={styles.TextInput}
            placeholder={"Email Address"}
            placeholderTextColor={"#fff"}
            onChangeText={(email) => setEmail(email)}
          />
          <TextInput
            style={styles.TextInput}
            placeholder={"Password"}
            placeholderTextColor={"#fff"}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
          <TouchableOpacity style={styles.button} onPress={signUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.SignBtn}>
          <Text style={styles.SignText} onPress={nav}>
            Back to sign in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainView: {
    marginTop: 0,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  topView: {
    width: "100%",
    height: "0%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bottonView: {
    width: "100%",
    height: "100%",
    backgroundColor: "#474749",
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
});
