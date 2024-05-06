import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";




// class24 
const firebaseConfig = {
  apiKey: "AIzaSyAWrPJrGKosYRO42seDh0OY0-k2jxgqUdg",
  authDomain: "jrf-adda.firebaseapp.com",
  databaseURL: "https://jrf-adda-default-rtdb.firebaseio.com/",
  projectId: "jrf-adda",
  storageBucket: "jrf-adda.appspot.com",
  messagingSenderId: "996125045451",
  appId: "1:996125045451:web:86862b99a69fd8c8d2614e",
  measurementId: "G-0M6Y9P3883"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
export const dbreal = getDatabase()

