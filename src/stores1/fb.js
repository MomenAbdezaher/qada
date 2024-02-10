// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBD3TZt7WMhB_P5HTEU2faBio_FPmW7Qrk",
  authDomain: "quada-35bd9.firebaseapp.com",
  projectId: "quada-35bd9",
  storageBucket: "quada-35bd9.appspot.com",
  messagingSenderId: "369542689643",
  appId: "1:369542689643:web:6e70835be4cb8f0b52d22e",
  measurementId: "G-3ZF7HX82VF"
};
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const storage = getStorage(app);
export { storage as storage };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
// to get warning messages in the consol
db.settings({ timestampsInSnapshots: true, merge: true });

export default db;
