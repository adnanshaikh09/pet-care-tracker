import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  browserLocalPersistence,
  browserSessionPersistence,
  inMemoryPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAGi1WLh7RKVlRyCwqUN3cKfv5ny2ONEts",
  authDomain: "petcare-dfe00.firebaseapp.com",
  projectId: "petcare-dfe00",
  storageBucket: "petcare-dfe00.firebasestorage.app",
  messagingSenderId: "894464908785",
  appId: "1:894464908785:web:e67b747629ce6e4aa27850"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistent storage
const auth = initializeAuth(app, { persistence: inMemoryPersistence });


// Initialize Firestore
const db = getFirestore(app);

export { auth, db };

