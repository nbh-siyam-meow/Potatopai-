import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCUIbm_mJDv9j0fma2RbD454_G6y75ecfg",
  authDomain: "potatopai-6e0f7.firebaseapp.com",
  projectId: "potatopai-6e0f7",
  storageBucket: "potatopai-6e0f7.appspot.com",
  messagingSenderId: "387699358571",
  appId: "1:387699358571:web:f284eaee27d12f0847ea2e",
  measurementId: "G-X5NV07WJSL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, collection, addDoc, query, where, getDocs };
