// Import the functions you need from the SDKs you need
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhSGlsUMGPoy4FjO3ZhCmtVC1PefgfDrs",
  authDomain: "reactfire-9f6d7.firebaseapp.com",
  projectId: "reactfire-9f6d7",
  storageBucket: "reactfire-9f6d7.appspot.com",
  messagingSenderId: "1085737586535",
  appId: "1:1085737586535:web:9b18e6f36deeedb30969c2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export default app;
