const DB_URL = "https://bootcamp-ski-resort-default-rtdb.firebaseio.com"

async function errorCheck(query, opts) {
  const res = await fetch(`${DB_URL}${query}`, opts);

  if (!res.ok) {
    throw new Error(`HTTP error: ${res.status}`)
  }

  return res
}

async function loadResorts() {
  const res = await errorCheck("/resorts.json");
  const data = await res.json();

  return data ? Object.values(data) : [];
}

async function loadReviews() {
  const res = await errorCheck("/reviews.json");
  const data = await res.json();

  return data ? Object.values(data) : [];
}

async function saveReview(review) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  };

  await errorCheck("/reviews.json", options);
}

