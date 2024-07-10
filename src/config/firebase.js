import { initializeApp, auth } from 'firebase/app';
import 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAOR9bTTc3e4akNRplxiFdUs58baiP0sAM',
  authDomain: 'fir-1-da194.firebaseapp.com',
  projectId: 'fir-1-da194',
  storageBucket: 'fir-1-da194.appspot.com',
  messagingSenderId: '1074782424769',
  appId: '1:1074782424769:web:f20226993b6d1753098e40',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// Signup function
export const signup = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

// Login function
export const login = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

// Logout function
export const logout = () => {
  return auth.signOut();
};

// Get current user
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};
