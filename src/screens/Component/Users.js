import React, { useEffect, useState } from "react";
import { List } from "react-native-paper";
import { View, Text } from "react-native";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../../firebaseSdk";

export default function Users({ user1, user, selectUser, chat }) {
  const user2 = user?.uid;
  const [data, setData] = useState("");

  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, []);
  return (
    <View>
      <List.Item
        onPress={() => selectUser(user)}
        title={user.name}
        description={data?.text || "tap to chat"}
        left={(props) => <List.Icon {...props} icon="account-circle" />}
      />
    </View>
  );
}
