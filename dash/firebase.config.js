
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



//Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBBgexfrqXUJISrN2QGMOeiHjp4iluInDU",
  authDomain: ".firebaseapp.com",
  projectId: "",
  storageBucket: ".com",
  messagingSenderId: "757143085600",
  appId: "1:757143085600:web:e6cebbae6c087f5d815245",
  measurementId: "G-V7Y3ZBL60Q"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
