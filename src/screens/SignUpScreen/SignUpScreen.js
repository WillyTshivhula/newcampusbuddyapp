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
  TouchableOpacity,ImageBackground,Dimensions
} from "react-native";
import Logo from "../../../assets/images/Logo_1.jpg";
import axios from "axios";
import { auth, db } from "../../../firebaseSdk";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function SignUpScreen({ navigation }) {
  const [name, setname] = useState("");
  const [username, setUsername] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUp() {
    const data = {
      name: name,
      username: username,
      course: course,
      email: email,
      password: password,
    };
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });
    } catch (err) {
        console.log(err);
    }
    axios
      .post(
        "http://campusapi-env.eba-pdyrxrjw.us-east-1.elasticbeanstalk.com/api/auth/signup",
        data
      )
      .then((data) => {
        setLoading(false);
        nav("Tabs");
        console.log(data.data.body);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }

  function nav() {
    navigation.navigate("SignIn");
  }

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground
        source={require("../../../assets/images/bg1.jpg")}
        style={{
          height: Dimensions.get("window").height / 3.5,
        }}
      >
        <View>
          <Image
            style={styles.tinyLogo}
            source={require("../../../assets/images/bglogin1.png")}
          />
        </View>
      </ImageBackground>
      <View style={styles.bottonView}>
          <Text style={styles.heading}>Create account</Text>
          <View style={styles.formView}>
            <TextInput
              style={styles.TextInput}
              placeholder={"Full Name"}
              placeholderTextColor={"black"}
              onChangeText={(name) => setname(name)}
            />
            <TextInput
              style={styles.TextInput}
              placeholder={"Username"}
              placeholderTextColor={"black"}
              onChangeText={(username) => setUsername(username)}
            />
            <TextInput
              style={styles.TextInput}
              placeholder={"Course"}
              placeholderTextColor={"black"}
              onChangeText={(course) => setCourse(course)}
            />
            <TextInput
              style={styles.TextInput}
              placeholder={"Email Address"}
              placeholderTextColor={"black"}
              onChangeText={(email) => setEmail(email)}
            />
            <TextInput
              style={styles.TextInput}
              placeholder={"Password"}
              placeholderTextColor={"black"}
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />

            <Text style={styles.text}>
              By Login in to Campus Buddy App, you confirm that you accept our
              <Text
                style={styles.link}
                onPress={async () => {
                  await WebBrowser.openAuthSessionAsync(
                    "https://www.example.com",
                    "https://www.google.com"
                  );
                }}
              >
                Terms of Use
              </Text>{" "}
              and
              <Text
                style={styles.link}
                onPress={async () => {
                  await WebBrowser.openAuthSessionAsync(
                    "https://www.example.com",
                    "https://www.google.com"
                  );
                }}
              >
                {" "}
                Privacy Policy{" "}
              </Text>{" "}
            </Text>

            <TouchableOpacity
              onPress={signUp}
              style={{
                width: "75%",
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 50,
                marginVertical: 28,
                height: 45,
                borderWidth: 3,
                borderRadius: 50,
                borderColor: "black",
              }}
            >
              {loading ? (
                <Text
                  style={{
                    textTransform: "uppercase",
                    color: "black",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  loading...
                </Text>
              ) : (
                <Text
                  style={{
                    textTransform: "uppercase",
                    color: "black",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  SIGN UP
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.SignBtn}>
            <Text style={styles.SignText} onPress={nav}>
              Back to sign in
            </Text>
          </TouchableOpacity>
        </View>

    </KeyboardAwareScrollView>
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
  bottomView: {
    flex: 1.5,
    backgroundColor: "#fff",
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
  heading: {
    color: "#A898CF",
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 30,
    marginTop: 50,
  },
  formView: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 28,
  },
  TextInput: {
    width: "90%",
    borderWidth: 1,
    borderColor: "grey",
    height: 52,
    borderRadius: 20,
    paddingLeft: 5,
    marginTop: 20,
    color: "black",
    textAlign: "center",
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
    marginBottom: 20,
  },
  tinyLogo: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 26,
  },
  link: {
    color: "#9075E3",
  },
  text: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 20,
  },
});
