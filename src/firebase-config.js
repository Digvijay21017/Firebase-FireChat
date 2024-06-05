import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDocFromCache, getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBXpbRGPpzx5FAlCT6Z1Pn7v7EJGeuLZrM",
    authDomain: "react-chat-app-5b987.firebaseapp.com",
    projectId: "react-chat-app-5b987",
    storageBucket: "react-chat-app-5b987.appspot.com",
    messagingSenderId: "870841042258",
    appId: "1:870841042258:web:5cf291de129bfdfb71a68b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);