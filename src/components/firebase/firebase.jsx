// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8sNmC6yzbtoDXbpb5YxNGpbqtMSCucRU",
  authDomain: "filmyverse-a4658.firebaseapp.com",
  projectId: "filmyverse-a4658",
  storageBucket: "filmyverse-a4658.appspot.com",
  messagingSenderId: "697099655351",
  appId: "1:697099655351:web:65ea05dc289772e636d532"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db,"movies");
export const reviewsRef = collection(db,"reviews")
export const usersRef = collection(db,"users")

export default app;