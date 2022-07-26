import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBs8YOr3G_VdEwdGnlP66FRaiSq0nvAu44",
  authDomain: "test-afccc.firebaseapp.com",
  projectId: "test-afccc",
  storageBucket: "test-afccc.appspot.com",
  messagingSenderId: "557315328245",
  appId: "1:557315328245:web:2b5db58278f8b906bf1dbc",
  measurementId: "G-1L3JTTX7P0",
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export {firebase};