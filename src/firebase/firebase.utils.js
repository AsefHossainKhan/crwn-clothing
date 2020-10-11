import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAm_8vILRCtAEwsjll45Ejd7zhKDq3ORKA",
  authDomain: "crwn-clothing-7e908.firebaseapp.com",
  databaseURL: "https://crwn-clothing-7e908.firebaseio.com",
  projectId: "crwn-clothing-7e908",
  storageBucket: "crwn-clothing-7e908.appspot.com",
  messagingSenderId: "462857148972",
  appId: "1:462857148972:web:1e29e9e2fe593ce3cb4f89",
  measurementId: "G-7ZE2P5LZTG",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
