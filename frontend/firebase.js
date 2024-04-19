// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2wgdNimcrp5MOc5jgkgH3VbQIxXxGgQI",
  authDomain: "docs-d0a41.firebaseapp.com",
  projectId: "docs-d0a41",
  storageBucket: "docs-d0a41.appspot.com",
  messagingSenderId: "391710591937",
  appId: "1:391710591937:web:de366fb67e017653b93d40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);