// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2ObvXBNZ6QYanlYVyAm0uAgNF3PlwCG4",
    authDomain: "react-drag-drop-app.firebaseapp.com",
    projectId: "react-drag-drop-app",
    storageBucket: "react-drag-drop-app.appspot.com",
    messagingSenderId: "519775041659",
    appId: "1:519775041659:web:c59a788a10adafd75e0ade"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);