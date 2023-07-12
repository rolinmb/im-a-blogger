import { initializeApp } from 'firebase/app';
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
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'YOURAPIKEY',
  authDomain: 'YOURAUTHDOMAIN',
  projectId: 'YOURPROJECTID',
  storageBucket: 'YOURBUCKEDID',
  messagingSenderId: 'YOURMSGID',
  appId: 'YOURAPPID'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid','==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email
      });
    }
  } catch (err) {
    switch (err.code) {
      case 'auth/operation-not-allowed':
        console.error("Error signing in with Google Auth Provider");
        alert("Error signing in with Google Auth Provider");
        break;
      default:
        console.error(err.message);
        alert(err.message);
        break;
    }
  }
}

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log('Successfully created new user!');
    alert('Successfully created new user!');
  } catch (err) {
    switch (err.code) {
      case 'auth/missing-email':
        console.error('Please enter an email address.');
        alert('Please enter an email address.');
        break;
      case 'auth/invalid-email':
        console.error('Entered email address is invalid (potentially untrustworthy) or missing');
        alert('Entered email address is invalid (potentially untrustworthy) or missing');
        break;
      case 'auth/missing-password':
        console.error('Password is invalid or missing.');
        alert('Password is invalid or missing.');
        break;
      case 'auth/operation-not-allowed':
        console.error('Error during login.');
        alert('Error during login.');
        break;
      default:
        console.error(err.message);
        alert(err.message);
        break;
    }
  }
}

const registerWithEmailAndPassword = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      username,
      authProvider: 'local',
      email
    });
  } catch (err) {
    switch (err.code) {
      case 'auth/email-already-in-use':
        console.error('Entered email address alread in use');
        alert('Entered email address alread in use');
        break;
      case 'auth/missing-email':
          console.error('Please enter an email address.');
          alert('Please enter an email address.');
          break;
      case 'auth/invalid-email':
        console.error('Entered email address is invalid (potentially untrustworthy) or missing');
        alert('Entered email address is invalid (potentially untrustworthy) or missing');
        break;
      case 'auth/operation-not-allowed':
        console.error('Error during registration.');
        alert('Error during registration.');
        break;
      case 'auth/weak-password':
        console.error('Password is not strong enoguh. Add additional characters (make sure to include special characters and numbers)');
        alert('Password is not strong enoguh. Add additional characters (make sure to include special characters and numbers)');
        break;
      default:
        console.error(err.message);
        alert(err.message);
        break;
    }
  }
}

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset email sent!');
  } catch (err) {
    switch (err.code) {
      case 'auth/missing-email':
        console.error('Please enter an email address to request a password reset.');
        alert('Please enter an email address to request a password reset.');
        break;
      case 'auth/user-not-found':
        console.error('Entered email address is not associated with an account.');
        alert('Entered email address is not associated with an account.');
        break;
      case 'auth/operation-not-allowed':
        console.error('Error trying to reset password.');
        alert('Error trying to reset password.');
        break;
      default:
        console.error(err.message);
        alert(err.message);
        break;
    }
  }
}

const logOut = () => {
  signOut(auth);
}

export {
  auth, db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset, logOut
};