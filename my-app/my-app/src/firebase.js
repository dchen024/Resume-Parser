// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7_eDsPmH-iZVDvkszLK3df65IzBms3a8",
  authDomain: "test-file-upload1.firebaseapp.com",
  projectId: "test-file-upload1",
  storageBucket: "test-file-upload1.appspot.com",
  messagingSenderId: "634240679256",
  appId: "1:634240679256:web:bdc211ab0828d3a0ebb92d",
  measurementId: "G-WQ8NGFTELQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);