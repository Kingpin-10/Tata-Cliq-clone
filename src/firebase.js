// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, signInWithEmailLink, sendSignInLinkToEmail, isSignInWithEmailLink, updateProfile } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBy3AJhKOzRW_HQrXIEvCA160SriBZ5cP0",
  authDomain: "tata-cliq-clone-6c74a.firebaseapp.com",
  projectId: "tata-cliq-clone-6c74a",
  storageBucket: "tata-cliq-clone-6c74a.firebasestorage.app",
  messagingSenderId: "616807560959",
  appId: "1:616807560959:web:81900159ff73ea077c3eca",
  measurementId: "G-2C6BLC64M4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  isSignInWithEmailLink,
  updateProfile
};
