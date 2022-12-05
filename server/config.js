import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyBG8pWMejvUW4Xgl50TfIHMjVmwHriwULQ",
  authDomain: "shortener-url-86c6e.firebaseapp.com",
  projectId: "shortener-url-86c6e",
  storageBucket: "shortener-url-86c6e.appspot.com",
  messagingSenderId: "654929913823",
  appId: "1:654929913823:web:f30fd216882bbb6463c66a"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

const email = "admin@tutorial-backend.gov";
const password = "s3cretp4ssw0rd";

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

export const db = firebaseApp.firestore();
