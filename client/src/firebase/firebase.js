// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {GoogleAuthProvider, getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4VyxbY7_megK3sIK5JGdYMIBrc5gkh2A",
  authDomain: "grecipe-f4676.firebaseapp.com",
  projectId: "grecipe-f4676",
  storageBucket: "grecipe-f4676.appspot.com",
  messagingSenderId: "1098159147877",
  appId: "1:1098159147877:web:ab7894bb3fc8f2de09af8c",
  measurementId: "G-GTNT1W4JF4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
export {auth, provider, db};