// src/firebase/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyAsrWkJMmTe_zS1TAeN1TM4OlQy4G_cW-4",
  authDomain: "freelance-marketplace-c13e7.firebaseapp.com",
  projectId: "freelance-marketplace-c13e7",
  storageBucket: "freelance-marketplace-c13e7.firebasestorage.app",
  messagingSenderId: "158831634768",
  appId: "1:158831634768:web:536e57cf4bb63974dfa455"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// FIX 1: Default export for the app instance
export default app; 

// FIX 2: Named export for the auth instance (optional, as you manually initialize it in AuthProvider)
export const auth = getAuth(app);