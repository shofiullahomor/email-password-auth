// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKb1-hEKlJbQ_niWfnSP0Am_MRzrn3DcI",
  authDomain: "email-password-auth-6ec2d.firebaseapp.com",
  projectId: "email-password-auth-6ec2d",
  storageBucket: "email-password-auth-6ec2d.firebasestorage.app",
  messagingSenderId: "178827043023",
  appId: "1:178827043023:web:1e902a0820ca3a15d5d7ba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
