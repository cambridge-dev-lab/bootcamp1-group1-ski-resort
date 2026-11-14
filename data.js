// Shared data — both views read from here. Agree together before changing shapes.
// Find lat/lng: right-click a place in Google Maps → the numbers are the first menu row.

const RESORTS = [
  { name: "Wachusett Mountain", lat: 42.5034, lng: -71.8864 },
  { name: "Loon Mountain", lat: 44.036, lng: -71.6214 },
  { name: "Killington", lat: 43.6045, lng: -72.8201 },
];

const SEED_REVIEWS = [
  { resort: "Loon Mountain", author: "Maria", rating: 5, run: "Walking Boss", food: "Chili at the summit lodge is great" },
];

const STORAGE_KEY = "ski-reviews";

// All storage goes through these two functions.
// The rest of the app doesn't know where reviews are kept.

async function loadReviews() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : SEED_REVIEWS;
}

async function saveReview(review) {
  const reviews = await loadReviews();
  reviews.push(review);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
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
