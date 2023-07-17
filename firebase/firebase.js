import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDujbtazC90XF69XdLsmWtY57FuwhKtbLw",
    authDomain: "smartconnect-d7d3e.firebaseapp.com",
    projectId: "smartconnect-d7d3e",
    storageBucket: "smartconnect-d7d3e.appspot.com",
    messagingSenderId: "922701761291",
    appId: "1:922701761291:web:e45ed087cfdc8a7daf300e",
    measurementId: "G-5Q4YQZYC6K",
    // databaseURL:"https://smartconnect-d7d3e-default-rtdb.firebaseio.com/smart-connect"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
// export const provider = new GoogleAuthProvider();

