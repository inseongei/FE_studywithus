import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCSTI45lwXoITi8m6eU3kP85EyNEjEbb4A",
  authDomain: "studywithus-d198c.firebaseapp.com",
  projectId: "studywithus-d198c",
  storageBucket: "studywithus-d198c.appspot.com",
  messagingSenderId: "971102011034",
  appId: "1:971102011034:web:a7974d7ea262412e75e923",
  databaseURL : "https://studywithus-d198c-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore
export const db = getFirestore(app);

// Storage
export const storage = getStorage(app);

// Realtime Database
export const dbRealtime = getDatabase(app);