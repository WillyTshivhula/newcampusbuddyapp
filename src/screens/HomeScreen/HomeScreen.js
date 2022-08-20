import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Button, Modal } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Component/Header";
const { width, height } = Dimensions.get("window");
import { db, auth, storage } from "../../../firebaseSdk";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import service from "../service";
export default function HomeScreen() {
  let data1 = service.getName();
  let data2 = service.getCourse();
  let data3 = service.getEmail();

  const [open, setOpen] = useState(false);

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
          <Text style={styles.itemTitle}>John Doe </Text>
          <Text style={styles.itemDescription}>{auth.currentUser.email}</Text>
        </View>
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
});
