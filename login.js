// Import the necessary Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCfytV7PtN2LIrv8jBlqsLRGQeGtVe4LqY",
  authDomain: "golden-f43ab.firebaseapp.com",
  projectId: "golden-f43ab",
  storageBucket: "golden-f43ab.firebasestorage.app",
  messagingSenderId: "314092349099",
  appId: "1:314092349099:web:9449b624f50ac93c5d39ee",
  measurementId: "G-PYNZ6QXR40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

// Get references to the form elements
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const googleSignInBtn = document.getElementById("googleSignIn");

// Function to handle email/password login
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Logged in successfully: ", user);
      window.location.href = "userPage.html"; 
    })
    .catch((error) => {
      console.error("Error signing in with email and password: ", error.message);
      alert("Invalid credentials or error during login.");
    });
});

// Function to handle Google sign-in
googleSignInBtn.addEventListener("click", () => {

  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("Logged in with Google: ", user);
      window.location.href = "userPage.html"; 
    })
    .catch((error) => {
      console.error("Error during Google sign-in: ", error.message);
      alert("An error occurred during Google sign-in.");
    });
});
