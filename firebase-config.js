// This file is used to connect the project to the firestore database.

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// // Initialize Firebase
const firebaseApp = initializeApp({
  apiKey: "AIzaSyDdNAcu8hC_byZZiYNsr29IiO7W8qMhmbA",
  authDomain: "ijru-judging.firebaseapp.com",
  projectId: "ijru-judging",
  storageBucket: "ijru-judging.appspot.com",
  messagingSenderId: "913527365011",
  appId: "1:913527365011:web:ddf8317e770f0ba24f1c66",
  measurementId: "G-J5WWL2X9MD",
});

const db = getFirestore();

// Exports db (the reference to the firestore database) so that it can be used in other files
export { db };
