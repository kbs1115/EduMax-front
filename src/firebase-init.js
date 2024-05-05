// firebase-init.js
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import firebaseConfig from './firebase-config';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("초기화했습니다")

// Initialize and export Firebase messaging
export const messaging = getMessaging(app);