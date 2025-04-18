import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB9R3ys0z3jMWKikUYACmVRG1MMunkIu08",
    authDomain: "primo-app-e08ce.firebaseapp.com",
    projectId: "primo-app-e08ce",
    storageBucket: "primo-app-e08ce.firebasestorage.app",
    messagingSenderId: "1020605104051",
    appId: "1:1020605104051:web:f1c7c3db1233c984ff15c6",
    measurementId: "G-6W72VKXXRY",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);