// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-blog-a9b07.firebaseapp.com",
  projectId: "mern-blog-a9b07",
  storageBucket: "mern-blog-a9b07.firebasestorage.app",
  messagingSenderId: "43596639298",
  appId: "1:43596639298:web:01957401f2f95ae42851db"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

