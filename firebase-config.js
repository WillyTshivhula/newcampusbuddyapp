import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBiy3ygw2jmK9G1MvZm3LzDy1eVuoCSWSo",
  authDomain: "todoapp-e22fb.firebaseapp.com",
  databaseURL: "https://todoapp-e22fb-default-rtdb.firebaseio.com",
  projectId: "todoapp-e22fb",
  storageBucket: "todoapp-e22fb.appspot.com",
  messagingSenderId: "42139370614",
  appId: "1:42139370614:web:83028d138414e774aa0b57",
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export { db };
