import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDtF9IUGPqbIAG8RU4fsapBkoBMm6oZs8I",
    authDomain: "postidz.firebaseapp.com",
    projectId: "postidz",
    storageBucket: "postidz.appspot.com",
    messagingSenderId: "30462241787",
    appId: "1:30462241787:web:d6bc41d2d19c8b5ff0f95e"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const auth = getAuth(app);


export { app, storage, auth };