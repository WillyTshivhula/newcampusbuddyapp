import React, { useEffect, useState, useContext,useCallback } from "react";
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
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Button, Snackbar } from "react-native-paper";
// import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Component/Header";
const { width, height } = Dimensions.get("window");
import { db, auth, storage } from "../../../firebaseSdk";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { AppContext } from "../service";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { Divider } from 'react-native-paper';

export default function HomeScreen(props) {
  // const { details } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibl, setModalVisibl] = useState(false);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [recipient, setRecipient] = useState("ndivhotshivhula@gmail.com");
  const [msgbody, setMsgbody] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState([]);
  const [stdPicture,setStdPicture] = useState([])

  // useEffect(() => {
  //   axios
  //     .get(
  //       `http://192.168.0.157:8080/api/profile/details/${auth.currentUser.email}`
  //     )
  //     .then((res) => {
  //       setProfile(res.data);
  //       console.log(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  useFocusEffect(
    useCallback(() => {
      axios
      .get(
        `http://192.168.0.157:8080/api/profile/details/${auth.currentUser.email}`
      )
      .then((res) => {
        setProfile(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));

      axios
        .get(`http://192.168.0.157:8080/api/upload/profile/${auth.currentUser.email}`)
        .then((res) => {
          setStdPicture(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },[])
  )

  function sendmail() {
    const data = {
      recipient: recipient,
      msgBody: msgbody,
      subject: subject,
    };
    setLoading(true);
    axios
      .post(
        "http://192.168.0.157:8080/api/email/sendMail",
        data
      )
      .then((data) => {
        setModalVisibl(!modalVisibl);
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

  const openModel = () => {
    setModalVisibl(true);
    setOpen(false)
  };
  const openQR =()=>{
    setModalVisibl(false);
    setOpen(true)
  }
  return (
    <KeyboardAwareScrollView style={{backgroundColor: "#FFF"}}>
      <Header headerText="Welcome !" />
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignSelf: "center" }}>
            <View style={styles.profileImage}>
              {stdPicture.length  === 0 ?  <Image
                source={require("../../../assets/images/uj.png")}
                style={styles.image}
                resizeMode="center"
              ></Image> : 
              <Image
              source={{ uri: stdPicture[0]?.pictureULR }}
              // source={require("../../../assets/images/uj.png")}
              style={styles.image}
              resizeMode="center"
            ></Image>
              }
             
            </View>
            <View style={styles.active}></View>
            {stdPicture.length  === 0 ?  <View style={styles.add}>
              <Ionicons
                name="ios-add"
                size={48}
                color="#DFD8C8"
                style={{ marginTop: 6, marginLeft: 2 }}
                onPress={() => props.navigation.navigate("UploadProfile")}
              ></Ionicons>
            </View> : null
           
            }
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
              {profile[0]?.username}{" "}
            </Text>
            {/* <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
              Photographer
            </Text> */}
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 15 }]}>
                {profile[0]?.email} 
              </Text>
              <Text style={[styles.text, styles.subText]}>Email</Text>
            </View>
            <View
              style={[
                styles.statsBox,
                {
                  borderColor: "#DFD8C8",
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                },
              ]}
            >
              <Text style={[styles.text, { fontSize: 15 }]}>Student</Text>
              <Text style={[styles.text, styles.subText]}>Type</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 15 }]}>
                {profile[0]?.course}
              </Text>
              <Text style={[styles.text, styles.subText]}> Course</Text>
            </View>
          </View>

          <View style={{ marginTop: 32 }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.mediaImageContainer}>
              </View>
              <View style={styles.mediaImageContainer}>
              </View>
              <View style={styles.mediaImageContainer}>
                
              </View>
            </ScrollView>
            <Divider />

            <TouchableOpacity style={styles.mediaCount} onPress={openQR}>
              <Text
                style={[
                  styles.text,
                  { fontSize: 18, color: "#DFD8C8", fontWeight: "300" },
                ]}
              >
                QR{" "}
              </Text>
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: 12,
                    color: "#DFD8C8",
                    textTransform: "uppercase",
                  },
                ]}
              >
                CODE
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mediaCount1} onPress={openModel}>
              <Text
                style={[
                  styles.text,
                  { fontSize: 18, color: "#DFD8C8", fontWeight: "300" },
                ]}
              >
                RPT
              </Text>
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: 12,
                    color: "#DFD8C8",
                    textTransform: "uppercase",
                  },
                ]}
              >
                Incident
              </Text>
            </TouchableOpacity>
          </View>

          <View>
          {open && (
            <View style={styles.profileImage1}>
            <Image
            
              source={require("../../../assets/images/qr.png")}
              style={styles.image}
              resizeMode="center"
            ></Image>
          </View>
        
        )}
        
            {modalVisibl && (
              <View style={{marginLeft:30}}>
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
                <TouchableOpacity
                  style={{
                    width: "90%",
                    justifyContent: "center",
                    alignItems: "center",
                    // marginHorizontal: 50,
                    marginVertical: 18,
                    height: 45,
                    borderWidth: 3,
                    borderRadius: 50,
                    borderColor: "black",
                  }}
                  onPress={sendmail}
                >
                  {loading ? (
                    <ActivityIndicator size="large" color="blue" />
                  ) : (
                    <Text>Submit </Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </View>
         
        </ScrollView>
        <Divider />
        <TouchableOpacity style={styles.mediaCount2}
        onPress={() => props.navigation.navigate("NavMapsScreen")}
        >
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: 12,
                    color: "#DFD8C8",
                    textTransform: "uppercase",
                  },
                ]}
              >
               Take a campus tour
              </Text>
            </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  cardView: {
    width: width - 20,
    height: height / 3,
    backgroundColor: "#000000",
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  repot: {
    width: width - 20,
    height: height / 2,
    // backgroundColor: "#000000",
    margin: 10,
    borderRadius: 10,
    shadowColor: "#white",
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  bos: {
    height: 52,
    borderRadius: 10,
    paddingLeft: 25,
    marginTop: 25,
    // color: "black",
  },
  textView: {
    position: "absolute",
    bottom: 10,
    margin: 10,
    left: 5,
    top: 50,
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
    marginTop: 310,
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
    backgroundColor: "#000",
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
    paddingLeft: 10,
    marginTop: 20,
    color: "black",
    // textAlign : "center",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    marginTop:30
  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "#52575D",
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },
  profileImage1: {
    width: 200,
    height: 200,
    borderRadius: 0,
    overflow: "hidden",
    marginLeft:80
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  mediaCount: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 250,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  mediaCount1: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  mediaCount2: {
    backgroundColor: "#41444B",
    position: 'relative',
    // top: "50%",
    marginTop: 15,
    marginLeft: 30,
    width: 300,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 100,
    shadowOpacity: 1,
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  activityIndicator: {
    backgroundColor: "#CABFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20,
  },
});
