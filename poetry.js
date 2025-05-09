// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "xxxxxxxx",
  authDomain: "xxxxxx",
  databaseURL: "xxxx",
  projectId: "xxxxxxx",
  storageBucket: "xxxx",
  messagingSenderId: "xxxxx",
  appId: "xxxx"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Select the form element
const contactForm = document.querySelector("form");

if (contactForm) {
  // Add an event listener to handle form submission
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log("Form submission prevented");

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Validate form fields
    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    // Save data to Firebase Realtime Database
    const newMessageRef = push(ref(database, "contacts"));
    set(newMessageRef, {
      name: name,
      email: email,
      message: message,
      timestamp: new Date().toISOString(),
    })
      .then(() => {
        alert("Your message has been sent successfully!");
        contactForm.reset(); // Clear the form
      })
      .catch((error) => {
        console.error("Error saving message:", error);
        alert("Failed to send your message. Please try again.");
      });
  });
} else {
  console.error("Contact form not found in the DOM.");
}

// Add animation to the heading
document.addEventListener("DOMContentLoaded", () => {
  console.log("Animation script is running");
  const heading = document.querySelector("h1");
  if (heading) {
    heading.classList.add("animate__animated", "animate__fadeInDown");
    console.log("Animation classes added to the heading");
  } else {
    console.error("Heading element not found in the DOM.");
  }
});