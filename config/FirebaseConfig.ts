// Import the necessary functions from the SDKs
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcJpR3Ez0koZRuSQIm87uFLalGBRpex8M",
  authDomain: "react-native-auth-80051.firebaseapp.com",
  projectId: "react-native-auth-80051",
  storageBucket: "react-native-auth-80051.firebasestorage.app",
  messagingSenderId: "105474576958",
  appId: "1:105474576958:web:526f33347839fafbfc776f"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Firestore
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
