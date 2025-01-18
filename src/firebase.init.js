// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


//dont share it with anyone 


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXUys4KsZXDw5PLUwN5CutvJcp47JqEZQ",
  authDomain: "email-pass-auth-a2ba0.firebaseapp.com",
  projectId: "email-pass-auth-a2ba0",
  storageBucket: "email-pass-auth-a2ba0.firebasestorage.app",
  messagingSenderId: "697905984925",
  appId: "1:697905984925:web:9c5ee954afe42520de6b74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);