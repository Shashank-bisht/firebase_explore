// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFyJh_1EixqkvhJRpwyOp-OM5egN76kpU",
  authDomain: "demo1-20165.firebaseapp.com",
  projectId: "demo1-20165",
  storageBucket: "demo1-20165.appspot.com",
  messagingSenderId: "280786827525",
  appId: "1:280786827525:web:0dc4639aa200a39641df6c",
  databaseURL:"https://demo1-20165-default-rtdb.firebaseio.com"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);