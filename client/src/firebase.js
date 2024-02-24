// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "auth-7c0fb.firebaseapp.com",
  projectId: "auth-7c0fb",
  storageBucket: "auth-7c0fb.appspot.com",
  messagingSenderId: "9528389759",
  appId: "1:9528389759:web:2275f83a49773a0d31cf4a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);