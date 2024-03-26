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
  apiKey: "AIzaSyApvfGgm13lmFXg0D2PEImUGXivUrb6c8I",
  authDomain: "selfcare-f4e9b.firebaseapp.com",
  projectId: "selfcare-f4e9b",
  storageBucket: "selfcare-f4e9b.appspot.com",
  messagingSenderId: "883488955632",
  appId: "1:883488955632:web:f7601c6f7f3419f77d7635",
  measurementId: "G-NG2D3KCJ0J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
export {auth, provider, db};