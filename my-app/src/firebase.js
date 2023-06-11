// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0FZyJ9ifKdbK6AOk2vxGZG6iGSD9L8FI",
  authDomain: "resume-parser-50806.firebaseapp.com",
  projectId: "resume-parser-50806",
  storageBucket: "resume-parser-50806.appspot.com",
  messagingSenderId: "322495748232",
  appId: "1:322495748232:web:74b0c55dfc65dea19e273d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
