// firebase.js
'use client';

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBDltMpEB-WtgnB2cegGd-DnzQVoIFtx00",
    authDomain: "login-e5b1e.firebaseapp.com",
    databaseURL: "https://login-e5b1e-default-rtdb.firebaseio.com",
    projectId: "login-e5b1e",
    storageBucket: "login-e5b1e.appspot.com",
    messagingSenderId: "933441375688",
    appId: "1:933441375688:web:dffef0bc88a25f116d44fd",
    measurementId: "G-NRRE2F2LQK"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword };