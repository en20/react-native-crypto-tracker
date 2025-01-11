// Import the necessary functions from the SDKs
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDppA0MaGPwTJcG9VGsPgRyFCcyNVnqBmI",
  authDomain: "crypto-tracker-50f63.firebaseapp.com",
  projectId: "crypto-tracker-50f63",
  storageBucket: "crypto-tracker-50f63.firebasestorage.app",
  messagingSenderId: "521736110065",
  appId: "1:521736110065:web:26b5e90778357a49a34e50"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Firestore
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
