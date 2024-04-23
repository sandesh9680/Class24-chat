import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA470uINCpszKFHHtF3tRD9IKXo7a9H0rs",
  authDomain: "react-chat-1b663.firebaseapp.com",
  projectId: "react-chat-1b663",
  storageBucket: "react-chat-1b663.appspot.com",
  messagingSenderId: "625325689341",
  appId: "1:625325689341:web:11f628fe5de8f4f3d8b194"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()

