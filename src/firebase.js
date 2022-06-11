import 'firebase/auth';
//import firebase from 'firebase/app'
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

// const firebaseConfig = {
//     apiKey: "AIzaSyAhs_06w-T1ADGGY90hEzydfbbehAQr1-8",
//     authDomain: "clone-3-5d37b.firebaseapp.com",
//     projectId: "clone-3-5d37b",
//     storageBucket: "clone-3-5d37b.appspot.com",
//     messagingSenderId: "555978045284",
//     appId: "1:555978045284:web:e3499ee0e742e4b94dec71"
//   };

const firebaseConfig = {
  apiKey: "AIzaSyDKLRFyOUnvLWQEY0DXmxcHeSxu0bMgNsM",
  authDomain: "clone-3-a5e32.firebaseapp.com",
  projectId: "clone-3-a5e32",
  storageBucket: "clone-3-a5e32.appspot.com",
  messagingSenderId: "454841753699",
  appId: "1:454841753699:web:b4ff8daf10a67351fc1856"
};

  firebase.initializeApp(firebaseConfig)

  export default firebase.auth()