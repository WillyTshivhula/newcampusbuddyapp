import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Button, Snackbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Component/Header";
const { width, height } = Dimensions.get("window");
import { db, auth, storage } from "../../../firebaseSdk";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { AppContext } from "../service";
import Icon from "react-native-vector-icons/FontAwesome";
export default function HomeScreen() {
  // const { details } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [recipient, setRecipient] = useState("campusbudd.uj@outlook.com");
  const [msgbody, setMsgbody] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://campusapi-env.eba-pdyrxrjw.us-east-1.elasticbeanstalk.com/api/profile/details/${auth.currentUser.email}`
      )
      .then((res) => {
        setProfile(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  function sendmail() {
    const data = {
      recipient: recipient,
      msgBody: msgbody,
      subject: subject,
    };
    setLoading(true);
    axios
      .post(
        "http://campusapi-env.eba-pdyrxrjw.us-east-1.elasticbeanstalk.com/api/email/sendMail",
        data
      )
      .then((data) => {
        setModalVisible(!modalVisible);
        setLoading(false);
        Alert.alert("Success", "Incident submitted...", [{ text: "Ok" }]);
      })
      .catch((err) => {
        Alert.alert("Error", "Something went wrong, Please try again", [
          { text: "Ok" },
        ]);
        setLoading(false);
      });
  }
  return (
    <KeyboardAwareScrollView>
      <Header headerText="Welcome !" />
      <View style={styles.cardView}>
        {!open && (
          <Image
            style={styles.image}
            source={require("../../../assets/images/uj.png")}
          />
        )}

        {open && (
          <Image
            style={styles.image}
            source={require("../../../assets/images/qr.png")}
          ></Image>
        )}
        <View>
          <TouchableOpacity
            style={styles.SignBtn}
            onPress={() => setOpen(true)}
          >
            {!open && <Text style={styles.SignText}>QR CODE</Text>}
            {open && (
              <Text onPress={() => setOpen(false)} style={styles.SignText}>
                Close
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.textView}>
          <Text style={styles.itemTitle}>{profile[0]?.username} </Text>
          <Text style={styles.itemDescription}>
            Email : {profile[0]?.email}
          </Text>
          <Text style={styles.itemDescription}>
            Course : {profile[0]?.course}
          </Text>
        </View>
      </View>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Report Incident!</Text>
              <TouchableOpacity
                underlayColor="#E8E8E8"
                onPress={() => {
                  setModalVisible(false);
                }}
                style={{
                  alignSelf: "flex-end",
                  position: "absolute",
                  top: 5,
                  right: 10,
                }}
              >
                <Icon name="close" size={20} />
              </TouchableOpacity>
              <TextInput
                style={styles.TextInput}
                placeholder={"Subject"}
                placeholderTextColor={"black"}
                onChangeText={(subject) => setSubject(subject)}
              />
              <TextInput
                multiline={true}
                style={styles.TextInput}
                placeholder={"Details"}
                placeholderTextColor={"black"}
                onChangeText={(msgbody) => setMsgbody(msgbody)}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={sendmail}
              >
                {loading ? (
                  <ActivityIndicator size="large" color="blue" />
                ) : (
                  <Text style={styles.textStyle}>Submit </Text>
                )}
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Report Incident</Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  cardView: {
    width: width - 20,
    height: height / 3,
    backgroundColor: "grey",
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },

  textView: {
    position: "absolute",
    bottom: 10,
    margin: 10,
    left: 5,
    top: 5,
  },
  image: {
    width: 100,
    height: 115,
    borderRadius: 10,
    marginLeft: 250,
    marginTop: 35,
  },
  image2: {
    width: 100,
    height: 115,
    borderRadius: 10,
    marginLeft: 150,
    marginTop: -150,
  },
  itemTitle: {
    color: "white",
    fontSize: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    marginBottom: 5,
    fontWeight: "bold",
    elevation: 5,
  },
  itemDescription: {
    color: "white",
    fontSize: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
  SignBtn: {
    width: "100%",
    alignItems: "center",
    marginLeft: 112,
    marginTop: 9,
  },
  SignBtn1: {
    width: "100%",
    alignItems: "center",
    marginLeft: -10,
    marginTop: -15,
  },
  SignText: {
    color: "white",
  },
  SignText2: {
    color: "white",
    marginLeft: 250,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "95%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "left",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: "90%",
    color: "#000",
    height: 52,
    backgroundColor: "#9075E3",
    borderRadius: 10,
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonOpen: {
    backgroundColor: "#9075E3",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  TextInput: {
    width: "90%",
    borderWidth: 1,
    borderColor: "black",
    height: 52,
    borderRadius: 10,
    paddingLeft: 5,
    marginTop: 20,
    color: "black",
    // textAlign : "center",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
