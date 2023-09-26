
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAq0nsDdyl7LweL-rj5naD7dI97OWwuB_0",
    authDomain: "codesense-a76b4.firebaseapp.com",
    projectId: "codesense-a76b4",
    storageBucket: "codesense-a76b4.appspot.com",
    messagingSenderId: "1049505379990",
    appId: "1:1049505379990:web:8f77d5f1684db886d3f4b7"
  };


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();