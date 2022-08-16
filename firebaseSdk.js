// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAK4YWXJiN7CFJsAYp6BKqnFmdZ059pwkE",
  authDomain: "campus-app-1992e.firebaseapp.com",
  databaseURL: "http://campus-app-1992e.firebaseio.com",
  projectId: "campus-app-1992e",
  storageBucket: "campus-app-1992e.appspot.com",
  messagingSenderId: "416638986807",
  appId: "1:416638986807:web:8cb4e7e869d46643e66db2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
