import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFURWDMsTKDvsbtGMQtJeeTfbeEhkB6fQ",
  authDomain: "sid55x-chat.firebaseapp.com",
  projectId: "sid55x-chat",
  storageBucket: "sid55x-chat.appspot.com",
  messagingSenderId: "839691617317",
  appId: "1:839691617317:web:458d595f18d40a60f1abcc",
  measurementId: "G-3F59PM0R6R",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
