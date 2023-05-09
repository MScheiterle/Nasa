import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  updateDoc,
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import axios from "axios";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASURE_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async (): Promise<void> => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const connection = await axios.get("https://api.ipify.org/?format=json");
    const user = res.user;
    const userDocRef = doc(db, "users", user.uid);
    const privateDocRef = doc(userDocRef, "private", "privateUserRecords");
    const publicDocRef = doc(userDocRef, "public", "publicUserRecords");
    const spotifyDocRef = doc(userDocRef, "spotify", "spotifyUserRecords");
    await setDoc(
      privateDocRef,
      {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        connectionIP: connection.data.ip,
      },
      { merge: true }
    );
    await setDoc(publicDocRef, {}, { merge: true });
    await setDoc(spotifyDocRef, {}, { merge: true });
  } catch (err) {
    console.error(err);
  }
};

const logInWithEmailAndPassword = async (
  email: string,
  password: string,
  fields: HTMLCollectionOf<Element>,
  errorMessageField: HTMLElement
): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    errorMessageField.innerHTML = "Error: Email and Passowrd don't match...";
    Array.from(fields).forEach((value) => {
      if (value.parentElement) {
        value.parentElement.classList.add("errored");
      }
    });
  }
};

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string,
  fields: HTMLCollectionOf<Element>,
  errorMessageField: HTMLElement
): Promise<void> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const connection = await axios.get("https://api.ipify.org/?format=json");
    const user = res.user;
    const userRef = doc(db, "users", user.uid);
    const privateDocRef = doc(userRef, "private", "privateUserRecords");
    const publicDocRef = doc(userRef, "public", "publicUserRecords");
    const spotifyDocRef = doc(userRef, "spotify", "spotifyUserRecords");
    await setDoc(privateDocRef, {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      connectionIP: connection.data.ip,
    });
    await setDoc(publicDocRef, {});
    await setDoc(spotifyDocRef, {});
  } catch (err) {
    if (err.message.includes("email-already-in-use")) {
      errorMessageField.innerHTML = "Error: Email already in use...";
    } else {
      errorMessageField.innerHTML = "Error: Report this to Simpl1f1ed";
    }
    Array.from(fields).forEach((value) => {
      if (value.parentElement) {
        value.parentElement.classList.add("errored");
      }
    });
  }
};

const sendPasswordReset = async (
  email: string,
  fields: HTMLCollectionOf<Element>,
  errorMessageField: HTMLElement
): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    if (err.message.includes("user-not-found")) {
      errorMessageField.innerHTML = "Error: Email not recognized...";
    } else {
      errorMessageField.innerHTML = "Error: Report this to Simpl1f1ed";
    }
    Array.from(fields).forEach((value) => {
      if (value.parentElement) {
        value.parentElement.classList.add("errored");
      }
    });
  }
};

const logout = (): void => {
  signOut(auth);
};

const addCustomFieldToCurrentUser = async (
  fieldName: string,
  data: any,
  subSection: string,
  removeData?: boolean
): Promise<void> => {
  try {
    const currentUserID = auth.currentUser?.uid;
    if (!currentUserID) {
      return;
    }
    const userRef = doc(
      db,
      "users",
      currentUserID,
      subSection,
      `${subSection}UserRecords`
    );

    if (userRef) {
      if (Array.isArray(data)) {
        // If the data is an array, use the arrayUnion method to add the values to the array field.
        await updateDoc(userRef, {
          [fieldName]: arrayUnion(...data),
        });
      } else {
        // If the data is not an array, simply update the field with the new value.
        await updateDoc(userRef, {
          [fieldName]: data,
        });
      }
      if (Array.isArray(removeData)) {
        // If `removeData` is an array, use the `arrayRemove` method to remove the values from the array field.
        await updateDoc(userRef, {
          [fieldName]: arrayRemove(...removeData),
        });
      } else if (removeData) {
        // If `removeData` is not an array and is truthy, use the `arrayRemove` method to remove the value from the array field.
        await updateDoc(userRef, {
          [fieldName]: arrayRemove(removeData),
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
};

const getCurrentUserData = async (
  query: string,
  subSection: string
): Promise<string | null> => {
  try {
    const currentUserID = auth.currentUser?.uid;
    if (!currentUserID) {
      return null;
    }
    const userRef = doc(
      db,
      "users",
      currentUserID,
      subSection,
      `${subSection}UserRecords`
    );
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.get(query);
      return userData || null;
    } else {
      console.error("User document not found");
      return null;
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

const getUserDataByUID = async (
  uid: string,
  query: string,
  subSection: string
): Promise<string | null> => {
  try {
    const userRef = doc(
      db,
      "users",
      uid,
      subSection,
      `${subSection}UserRecords`
    );
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.get(query);
      return userData || null;
    } else {
      console.error("User document not found");
      return null;
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  addCustomFieldToCurrentUser,
  getUserDataByUID,
  getCurrentUserData,
};
