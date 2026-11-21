// Shared data — both views read from here. Agree together before changing shapes.
// Find lat/lng: right-click a place in Google Maps → the numbers are the first menu row.

const RESORTS = [
  { name: "Wachusett Mountain", lat: 42.5034, lng: -71.8864 },
  { name: "Loon Mountain", lat: 44.036, lng: -71.6214 },
  { name: "Killington", lat: 43.6045, lng: -72.8201 },
];

const SEED_REVIEWS = [
  { resort: "Loon Mountain", author: "Maria", rating: 5, slope: "Walking Boss", content: "There were no loons but the snow was great." },
  { resort: "Wachusett Mountain", author: "Sam", rating: 3, slope: "Smith Walton", content: "Cafeteria pizza is fine, long lines on weekends" },
  { resort: "Killington", author: "Lee", rating: 4, slope: "Superstar", content: "Waffle cabin halfway down — worth the stop" },
  { resort: "Killington", author: "Ana", rating: 5, slope: "Great Eastern", content: "Bring your own — the base lodge gets packed at noon" },
];

// All storage goes through these two functions.
// The rest of the app doesn't know where reviews are kept.
// For now they live in a variable, so they reset on reload —
// swapping in the Firebase versions below makes them survive.

let savedReviews = SEED_REVIEWS;

async function loadReviews() {
  return savedReviews;
}

async function saveReview(review) {
  savedReviews.push(review);
}

// Firebase versions of the same two functions — swap them in when the database is ready
// (create a project at firebase.google.com, enable Realtime Database, open the rules for development):
//
// const DB_URL = "https://YOUR-PROJECT.firebaseio.com/reviews.json";
//
// async function loadReviews() {
//   const res = await fetch(DB_URL);
//   const data = await res.json();
//   return data ? Object.values(data) : [];
// }
//
// async function saveReview(review) {
//   await fetch(DB_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(review),
//   });
// }
