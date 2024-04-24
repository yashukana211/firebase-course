
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyDMpusMZt1eeFa2pYHluKML6fB0kdkrDHA",
  authDomain: "fir-course-3e1df.firebaseapp.com",
  projectId: "fir-course-3e1df",
  storageBucket: "fir-course-3e1df.appspot.com",
  messagingSenderId: "453785022169",
  appId: "1:453785022169:web:474599d56f10d0bfb318c8",
  measurementId: "G-7B7G9S0CGC"
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleProvider=new GoogleAuthProvider();
export const db=getFirestore(app);

export const storage=getStorage(app);
