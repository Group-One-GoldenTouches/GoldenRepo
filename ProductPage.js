// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Firebase configuration
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
const db = getFirestore(app);

// Reference the review form
const reviewForm = document.querySelector("form");

// Listen for form submission
reviewForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get the input field values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const rating = document.querySelector('input[name="rate"]:checked').value; // Get the selected rating
    const reviewTitle = document.getElementById("review-title").value.trim();
    const reviewBody = document.getElementById("review-body").value.trim();

    // Validate inputs
    if (!name || !email || !rating || !reviewTitle || !reviewBody) {
        alert("Please fill in all the fields.");
        return;
    }

    try {
        // Save review data to Firestore
        const reviewRef = doc(db, "reviews", email); // Use email as the document ID
        await setDoc(reviewRef, {
            name: name,
            email: email,
            rating: rating,
            reviewTitle: reviewTitle,
            reviewBody: reviewBody,
            timestamp: new Date() // Store the current timestamp
        });

        // Display success message
        alert("Thank you for your review! It has been submitted successfully.");

        // Optionally, clear the form
        reviewForm.reset();
    } catch (error) {
        console.error("Error submitting review:", error);
        alert("There was an error submitting your review. Please try again later.");
    }
});


  




import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// تحديد مجموعة التقييمات
const reviewsCollection = collection(db, "reviews");

// دالة لعرض التعليقات
function displayReviews() {
  const reviewsContainer = document.getElementById("reviews-container");
  reviewsContainer.innerHTML = ''; // تنظيف الحاوية قبل عرض التقييمات

  // استخدام onSnapshot لجلب البيانات في الوقت الفعلي
  onSnapshot(reviewsCollection, (snapshot) => {
    reviewsContainer.innerHTML = ''; // مسح المحتوى السابق
    snapshot.forEach((doc) => {
      const reviewData = doc.data();

      // إنشاء عناصر HTML لكل تعليق
      const reviewElement = document.createElement("div");
      reviewElement.className = "review-item";
      reviewElement.innerHTML = `
        <h4>${reviewData.name}</h4>
        <p>${"⭐".repeat(parseInt(reviewData.rating))}</p>
        <strong>${reviewData.reviewTitle}</strong>
        <p>${reviewData.reviewBody}</p>
        <small>${new Date(reviewData.timestamp.seconds * 1000).toLocaleString()}</small>
      `;

      reviewsContainer.appendChild(reviewElement);
    });
  });
}

// استدعاء الدالة عند تحميل الصفحة
window.onload = displayReviews;