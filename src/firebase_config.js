// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAohfoDPxcWpnN1Ht6PiKrDapURdWMZ8HY",
  authDomain: "web-final-project-4685c.firebaseapp.com",
  projectId: "web-final-project-4685c",
  storageBucket: "web-final-project-4685c.appspot.com",
  messagingSenderId: "316241332389",
  appId: "1:316241332389:web:7bdcdc2c8ba7806a09254c",
  measurementId: "G-V97V80DRWY",
  databaseURL: "https://web-final-project-4685c-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getDatabase(app);