// Import the Firebase SDK
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Firebase initialization script
console.log('Initializing Firebase...');

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDI5XxL5DtKE7Esthsal37p6PCGe_C4V60",
  authDomain: "hackathaon-6c0d8.firebaseapp.com",
  projectId: "hackathaon-6c0d8",
  storageBucket: "hackathaon-6c0d8.appspot.com",
  messagingSenderId: "187472374442",
  appId: "1:187472374442:web:3dd91baf9702782e5e7ed3",
  measurementId: "G-C5D5TR0DBF"
};

// Initialize Firebase
if (typeof firebase !== 'undefined') {
  // Check if Firebase is already initialized
  if (!firebase.apps || !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  // Get auth and firestore instances
  const auth = firebase.auth();
  const db = firebase.firestore();
  
  // Make them available globally
  window.auth = auth;
  window.db = db;
  
  console.log('Firebase initialized successfully.');
} else {
  console.error('Firebase SDK not loaded! Make sure your script tags are in the correct order.');
}
