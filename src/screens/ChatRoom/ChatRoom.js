// @refresh reset

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, auth, storage } from "../../../firebaseSdk";
import { View, Text } from "react-native";
import Users from "../Component/Users";
import { GiftedChat } from "react-native-gifted-chat";
import MessageForm from "../Component/MessageForm";
import Header from "../Component/Header";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Card, Title, Paragraph, Appbar } from "react-native-paper";

export default function ChatRoom() {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [userName, setUsername] = useState([]);
  const [hidelist, setHidelist] = useState(false);
  const user1 = auth.currentUser.uid;

  useEffect(() => {
    const usersRef = collection(db, "users");
    // create query object
    const q = query(usersRef, where("uid", "not-in", [user1]));
    // execute query
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
      //N.B pass the email from market via params to this component.
      //N.B check if params has email or not then 
      //N.B filter out object that include user email from params.
      //N.B else continue with the normal flow.
      
      console.log(users);
    });
    return () => unsub();
  }, []);
  const _goBack = () => setHidelist(false);

  const selectUser = async (user) => {
    setChat(user);
    setUsername(user.name);
    setHidelist(true)
    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
      console.log(msgs);
    });

    // get last message b/w logged in user and selected user
    const docSnap = await getDoc(doc(db, "lastMsg", id));
    // if last message exists and message is from selected user
    if (docSnap.data() && docSnap.data().from !== user1) {
      // update last message doc, set unread to false
      await updateDoc(doc(db, "lastMsg", id), { unread: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user2 = chat.uid;

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: "",
    });

    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: "",
      unread: true,
    });

    setText("");
  };
  return (
    <KeyboardAwareScrollView>
      {hidelist ?  
        <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title={userName} />
      </Appbar.Header>
        :<Header headerText="Chatroom" /> }
      
      {hidelist ? null : (
        <View>
          {users.map((user) => (
            <Users
              key={user.uid}
              user={user}
              selectUser={selectUser}
              user1={user1}
              chat={chat}
            />
          ))}
        </View>
      )}

      {hidelist ? (
        <View>
          <Card>
            <Card.Content>
              {/* <Title>{userName}</Title> */}
              <Paragraph>
                <Text>
                  {msgs.length
                    ? msgs.map((msg, i) => (
                        <Text key={i}>
                          {"\n"}
                          {msg.from === user1 ? "Me : " : `${userName} : `}
                          {msg.text}
                        </Text>
                      ))
                    : "No chat"}
                </Text>
              </Paragraph>
            </Card.Content>
          </Card>
          <View>
          <MessageForm
            handleSubmit={handleSubmit}
            text={text}
            setText={setText}
          />
          </View>
         
        </View>
      ) : null}
    </KeyboardAwareScrollView>
  );
}
