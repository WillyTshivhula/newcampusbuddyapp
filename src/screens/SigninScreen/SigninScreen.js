import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import Logo from "../../../assets/images/Logo_1.jpg";
import axios from "axios";
import { updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../../../firebaseSdk";
import { signInWithEmailAndPassword } from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SigninScreen({ navigation }) {
  const [email, setUsername] = useState("lloyd123@mail.com");
  const [password, setPassword] = useState(12345678);
  const [loading, setLoading] = useState(false);
  function nav(value) {
    navigation.navigate(value);
  }
  async function signIn() {
    const data = {
      usernameOrEmail: email,
      password: password,
    };
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      await updateDoc(doc(db, "users", result.user.uid), {
        isOnline: true,
      });
    } catch (err) {
      setLoading(false);
    }
    axios
      .post(
        "http://campusapi-env.eba-pdyrxrjw.us-east-1.elasticbeanstalk.com/api/auth/signin",
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

  return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      {/*Brand View*/}

      <ImageBackground
        source={require("../../../assets/images/bg1.jpg")}
        style={{
          height: Dimensions.get("window").height / 2.5,
        }}
      >
        <View>
          <Image
            style={styles.tinyLogo}
            source={require("../../../assets/images/bglogin1.png")}
          />
        </View>
      </ImageBackground>

      {/*Bottom View*/}
      <View style={styles.bottomView}>
        {/*welcome View*/}

        <View style={{ padding: 40 }}>
          <Text style={{ color: "#A898CF", fontSize: 34 }}>Welcome</Text>

          <Text>Dont Have an Account ?</Text>

          <TouchableOpacity
            style={styles.SignBtn}
            onPress={() => nav("SignUp")}
          >
            <Text style={styles.SignText}>Sign up Now</Text>
          </TouchableOpacity>

          {/*Form*/}

          <View style={styles.formView}>
            <TextInput
              style={styles.TextInput}
              placeholder={"Email Address"}
              placeholderTextColor={"black"}
              onChangeText={(username) => setUsername(username)}
            />
            <TextInput
              style={styles.TextInput}
              placeholder={"*********"}
              placeholderTextColor={"black"}
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />

            <TouchableOpacity
              style={styles.forgot}
              onPress={() => nav("Forgot")}
            >
              <Text style={styles.SignText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={signIn}
              style={{
                width: "90%",
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 50,
                marginVertical: 18,
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
                  SIGN IN
                </Text>
              )}
            </TouchableOpacity>

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
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  bottomView: {
    flex: 1.5,
    backgroundColor: "#fff",
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
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
    textAlign: "center",
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
    color: "white",
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
});
