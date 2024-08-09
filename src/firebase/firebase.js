// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Добавьте это для Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAD9-v1NkG6JGgL6Y6UubOYWDzoFNl3Uok",
    authDomain: "youfast-6d6dc.firebaseapp.com",
    projectId: "youfast-6d6dc",
    storageBucket: "youfast-6d6dc.appspot.com",
    messagingSenderId: "205846065826",
    appId: "1:205846065826:web:7460e67591482507b0ddfb",
    measurementId: "G-M73MFDEQMG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app); // Экспортируем Firestore для использования в других частях приложения
