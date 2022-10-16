import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet ,TouchableOpacity,Alert} from "react-native";
import Header from "../Component/Header";
// import Device from 'expo-device';
import * as Location from "expo-location";
import axios from "axios";
export default function AlertScreen() {
  const [location, setLocation] = useState(null);
  const [location2, setLocation2] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [recipient, setRecipient] = useState("lloydbunhle@gmail.com");
  const [msgbody, setMsgbody] = useState("");
  const [subject, setSubject] = useState("");

  useEffect(() => {
    (async () => {
      // if (Platform.OS === 'android' && !Device.isDevice) {
      //   setErrorMsg(
      //     'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
      //   );
      //   return;
      // }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords.latitude);
      setLocation2(location.coords.longitude);
    })();
  }, []);

  let text = "Waiting..";
  let text2 = "";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    text2 = JSON.stringify(location2);
  }

  function sendmail() {
    const data = {
      recipient: recipient,
      msgBody: `A Student at the current location ${location}, ${location2} needs security assistance.`,
      subject: "Urgent Assistance needed !",
    };
    // setLoading(true);
    axios
      .post(
        "http://campusapi-env.eba-pdyrxrjw.us-east-1.elasticbeanstalk.com/api/email/sendMail",
        data
      )
      .then((data) => {
        // setModalVisibl(!modalVisibl);
        // setLoading(false);
        Alert.alert("Success", "Alert submitted...", [{ text: "Ok" }]);
      })
      .catch((err) => {
        Alert.alert("Error", "Something went wrong, Please try again", [
          { text: "Ok" },
        ]);
        // setLoading(false);
      });
  }
  return (
    <View>
      <Header headerText="Arlet" />
      <View style={styles.container}>
        <Text style={[styles.subText]}>Your current Location coodinate.</Text>
        <View style={{ alignItems: "center" }}>
          <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{ width: 250 }}>
              <Text
                style={[styles.text, { color: "#41444B", fontWeight: "300" }]}
              >
                Latitude <Text style={{ fontWeight: "400" }}>{text}</Text>
              </Text>
            </View>
          </View>

          <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{ width: 250 }}>
              <Text
                style={[styles.text, { color: "#41444B", fontWeight: "300" }]}
              >
                Longitude <Text style={{ fontWeight: "400" }}>{text2}</Text>
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.mediaCount1} onPress={sendmail}>
              <Text
                style={[
                  styles.text,
                  { fontSize: 24, color: "#DFD8C8", fontWeight: "300" },
                ]}
              >
                Alert
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
                Security
              </Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  subText: {
    fontSize: 17,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
    marginBottom: 15,
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
  text: {
    fontFamily: "HelveticaNeue",
    color: "#52575D",
  },
  mediaCount1: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: "50%",
    marginTop: 150,
    marginLeft: 30,
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
});
