const DB_URL = "https://bootcamp-ski-resort-default-rtdb.firebaseio.com"
const ERROR_DISPLAY = document.getElementById("map-view")
const ERROR_MESSAGE = `<div><h1>IT'S ALL BROKEN!!!!</h1></div>`

async function errorCheck(query, opts) {
  try {
    const res = await fetch(`${DB_URL}${query}`, opts);
    if (!res.ok) {
      throw new Error("HTTP error.")
    }
    return res
  } catch (err) {
    console.log(err);
    ERROR_DISPLAY.innerHTML = ERROR_MESSAGE
    throw err;
  }
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
  try {
    const doesExist = (await loadReviews()).some(r => r.id === review.id)
    if (!doesExist) {
      await errorCheck("/reviews.json", options)
    } else {
      ERROR_DISPLAY.innerHTML = (ERROR_MESSAGE + `<p>Duplicate review</p>`)
    }
  } catch (err) {
    console.log(err)
  }
}

