import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, Auth, connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";


// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyCS9CWPUYf68eEo2GbNYyflWmiQto3rSO8",
  authDomain: "camelot-59ea0.firebaseapp.com",
  projectId: "camelot-59ea0",
  storageBucket: "camelot-59ea0.appspot.com",
  messagingSenderId: "970650568035",
  appId: "1:970650568035:web:25ea362fdacd882f1a3f56"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
connectFirestoreEmulator(db, 'localhost', 8080);
connectAuthEmulator(auth, "http://localhost:9099");

export {db};
export default auth;


