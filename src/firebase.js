 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDA9xObBeexVfqsQLxliNqFusHJLI0uCRc",
  authDomain: "fir-frontend-01f.firebaseapp.com",
  databaseURL: "https://fir-frontend-01f-default-rtdb.firebaseio.com",
  projectId: "fir-frontend-01f",
  storageBucket: "fir-frontend-01f.firebasestorage.app",
  messagingSenderId: "1035823282411",
  appId: "1:1035823282411:web:f9fcd7561ab32d47b2e6ae",
  measurementId: "G-XB7F2FLJG5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);