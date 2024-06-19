import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  updateProfile as firebaseUpdateProfile,
  updatePassword as firebaseUpdatePassword,
} from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCiZIBWTpauJone4NtC4m2XEienvUntElU",
  authDomain: "fir-app-d5792.firebaseapp.com",
  projectId: "fir-app-d5792",
  storageBucket: "fir-app-d5792.appspot.com",
  messagingSenderId: "183338813648",
  appId: "1:183338813648:web:401539577cf9500332b6d5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

setPersistence(auth, browserLocalPersistence);

export {
  auth,
  db,
  storage,
  firebaseUpdateProfile,
  firebaseUpdatePassword,
  doc,
  updateDoc,
};
