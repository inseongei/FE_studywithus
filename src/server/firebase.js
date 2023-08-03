import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCSTI45lwXoITi8m6eU3kP85EyNEjEbb4A",
  authDomain: "studywithus-d198c.firebaseapp.com",
  projectId: "studywithus-d198c",
  storageBucket: "studywithus-d198c.appspot.com",
  messagingSenderId: "971102011034",
  appId: "1:971102011034:web:a7974d7ea262412e75e923"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app) 
export const storage = getStorage(app);