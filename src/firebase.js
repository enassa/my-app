// import { initiliazeApp } from "firebase/app";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDW8It3KMtjBjhN6cJfaTIk6G4qqgzOHuA",
  authDomain: "koinovoter.firebaseapp.com",
  projectId: "koinovoter",
  storageBucket: "koinovoter.appspot.com",
  messagingSenderId: "957078603068",
  appId: "1:957078603068:web:808d66fc29a39478078a39",
  measurementId: "G-HGNENNLLDL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
