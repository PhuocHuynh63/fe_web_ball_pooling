// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp, FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyAY4iWgPtNGB6XxJEkntAKX_0BkXjjZwIs",
  authDomain: "cloud-store-5051c.firebaseapp.com",
  projectId: "cloud-store-5051c",
  storageBucket: "cloud-store-5051c.appspot.com",
  messagingSenderId: "304595634739",
  appId: "1:304595634739:web:6d2c6d9ecf01a0fb9d3146"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

export const auth=getAuth();
export default app;