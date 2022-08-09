import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD9BNVcoEeSZBh7eSOIoLcyZI-CXNU_Q50",
  authDomain: "fetch-data-4b58b.firebaseapp.com",
  projectId: "fetch-data-4b58b",
  storageBucket: "fetch-data-4b58b.appspot.com",
  messagingSenderId: "616072308609",
  appId: "1:616072308609:web:b37905aecbfc6294d66a80",
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export { firebase };