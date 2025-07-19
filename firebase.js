// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfzACc3nXivNBAV7kWVpjTQCiXX6Hsdgs",
  authDomain: "x-clone-315d0.firebaseapp.com",
  projectId: "x-clone-315d0",
  storageBucket: "x-clone-315d0.firebasestorage.app",
  messagingSenderId: "515396862240",
  appId: "1:515396862240:web:4a66c0151005f534235745",
  measurementId: "G-GZK7LXYX5F"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const storage = getStorage(app);

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };