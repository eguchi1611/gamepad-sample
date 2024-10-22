// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhEg_hWOuN9Hb6bR8t8YxAg19lkGNOKko",
  authDomain: "gamepad-sample.firebaseapp.com",
  projectId: "gamepad-sample",
  storageBucket: "gamepad-sample.appspot.com",
  messagingSenderId: "565733514130",
  appId: "1:565733514130:web:e6df8ff954319b47293f4b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app, "https://gamepad-sample-default-rtdb.asia-southeast1.firebasedatabase.app/");
