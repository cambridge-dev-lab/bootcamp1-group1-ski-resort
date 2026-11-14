# Ski Resort Reviews

A page to browse and add ski resort reviews — favorite runs, food tips — shown as a list and on a map.

Open `index.html` in the browser (use Live Server if you have it).

## Files

- `index.html` — the page: header with the Map/List toggle, one div per view
- `style.css` — colors and fonts are variables at the top; header and layout styles are done
- `data.js` — **shared**: the resort list, seed reviews, and `loadReviews()` / `saveReview()`. All storage goes through these two functions — the rest of the app doesn't know where reviews are kept. For now reviews live in a variable and reset on reload; the Firebase versions are commented at the bottom, ready to swap in
- `list.js` — the list view: render reviews, add-review form
- `map.js` — the map view: Leaflet map, one marker per resort
- `app.js` — **shared**: the view toggle

## How to work

- One person owns `list.js`, the other `map.js`. Changes to `data.js` and `app.js` you agree on together.
- Reviews are objects: `{ resort, author, rating, run, food }`. The resort name must match a name in `RESORTS` — that's how the map finds its coordinates.
- Call `loadReviews()` with `await`, inside an `async` function.
