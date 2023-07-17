import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGRddMr7RHJDZFfappCD5_qTI7gQiMlww",
  authDomain: "games-front-c5400.firebaseapp.com",
  projectId: "games-front-c5400",
  storageBucket: "games-front-c5400.appspot.com",
  messagingSenderId: "140912825306",
  appId: "1:140912825306:web:73313a42a68a1a6985a6e3",
  measurementId: "G-QYMW48NP8F",
};

const app = initializeApp(firebaseConfig);
export const fireStoreDb = getFirestore(app);
export const auth = getAuth(app);
let userLogged: any;
onAuthStateChanged(auth, (user) => {
  if (user) {
    userLogged = user.email;
    console.log("user email: ", user.email);
  }
});
export { userLogged };
