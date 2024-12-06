import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAoGbU1q-Imdg2H7moRDm6wyJIsV28xUxA",
  authDomain: "social-media-4b9da.firebaseapp.com",
  projectId: "social-media-4b9da",
  storageBucket: "social-media-4b9da.appspot.com",
  messagingSenderId: "516107498718",
  appId: "1:516107498718:web:b982014a2cdec9fb917e4f",
  measurementId: "G-QYCR71N2N0"
};

const app = initializeApp(firebaseConfig , "server");

export default app