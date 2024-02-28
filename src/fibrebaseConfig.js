import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAxk3pCuDdtFbMmAe3qd4N3zTFKv4cVRHA",
  authDomain: "dummyproject280224.firebaseapp.com",
  projectId: "dummyproject280224",
  storageBucket: "dummyproject280224.appspot.com",
  messagingSenderId: "594482792397",
  appId: "1:594482792397:web:56e4575c64c9edb1a96684",
  databaseUrl: "https://dummyproject280224-default-rtdb.firebaseio.com/employees",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
