const reviewCard = document.querySelector(".review-card");
const reviewCardTitle = document.querySelector(".review-card__title");
const reviewCardReview = document.getElementById("review-card__review-box")
const reviewCardCloseBtn = document.querySelector(".review-card__close");
const reviewForm = document.getElementById("review-form");
const submitBtn = document.getElementById("submitBtn");
const dialog = document.getElementById("dialog");
const reviewFormFields = document.getElementById("review-form-fields");

let resorts = [];
let reviews = [];
let activeResort = null;

function createElement(tag, classNames, textContent) {
  const elem = document.createElement(tag);

  if (Array.isArray(classNames)) {
    for (const className of classNames) {
      elem.classList.add(className);
    }
  } else if (typeof classNames === "string") {
    elem.classList.add(classNames);
  }

  if (textContent) {
    elem.textContent = textContent;
  }

  return elem;
}

function getResortReviewById(reviews, resortId) {
  const allReviews = [];
  for (const review of reviews) {
    if (review.resortId === resortId) {
      allReviews.push(review);
    }
  }
  return allReviews;
}

function renderReviewContent(reviews) {
  reviewCardReview.replaceChildren();

  for (const review of reviews) {
    const item = createElement("div", "review");
    item.append(
      createElement("span", ["review__span", "review__author"], `Author: ${review.author}`),
      createElement("span", ["review__span", "review__rating"], `Rating: ${review.rating}`),
    );
    if (review.slope) {
      item.append(
        createElement("span", ["review__span", "review__slope"], `Slope: ${review.slope}`)
      );
    };

    if (review.body) {
      item.append(
        createElement("span", ["review__span", "review__body"], `Review: ${review.body}`),
      );
    };

    reviewCardReview.append(item);
  };
}

function showResortCard(resortObj) {
  activeResort = resortObj;
  reviewCard.classList.add("review-card--visible");
  const resortReviews = getResortReviewById(reviews, resortObj.id);
  reviewCardTitle.textContent = resortObj.name;
  renderReviewContent(resortReviews);
}

function handleReviewClose() {
  reviewCard.classList.remove("review-card--visible");
}

function updateElement(query, elemId, fieldToCheck) {
  elemId.disabled = !query.checkValidity() || !query[fieldToCheck].value.trim();
}

function setSubmitBtnState() {
  const upd = () => updateElement(reviewForm, submitBtn, "author");

  upd();

  reviewForm.addEventListener("input", upd);
  reviewForm.addEventListener("change", upd);
}

function getLatestReviewId() {
  if (reviews.length === 0) {
    return 0
  };

  const currentNewestReview = reviews.reduce(
    (best, cur) => cur.id > best.id ? cur : best);
  const currentNewestId = currentNewestReview.id;

  return currentNewestId
}


async function handleReviewSubmission(event) {
  event.preventDefault();

  const formData = new FormData(reviewForm);
  const review = Object.fromEntries(formData);
  const reviewId = getLatestReviewId() + 1; //I see the inherent issues with this but I feel doing this properly is out of scope :p


  review.id = reviewId;
  review.rating = Number(review.rating);
  review.author = review.author.trim();
  review.body = review.body.trim();
  review.slope = review.slope.trim();
  review.resortId = activeResort.id;
  review.resort = activeResort.name;

  reviewFormFields.disabled = true;

  try {
    await saveReview(review);
  } catch (err) {
    console.error(err);
    return;
  } finally {
    reviewFormFields.disabled = false;
  }


  reviews.push(review);
  showResortCard(activeResort)
  reviewForm.reset();
  updateElement(reviewForm, submitBtn, "author");

  dialog.close();
}

function handleReviewDialog() {
  const openButton = document.getElementById("open");
  const closeButton = document.getElementById("close");

  openButton.addEventListener("click", () => {
    dialog.showModal();
  });
  closeButton.addEventListener("click", () => {
    dialog.close();
  });

  reviewForm.addEventListener("submit", handleReviewSubmission);

  setSubmitBtnState();

}

const map = L.map("map").setView([43.9, -71.9], 7);
L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
  attribution: "Tiles © Esri — Esri, DeLorme, NAVTEQ",
}).addTo(map);

const resortLayer = L.layerGroup().addTo(map);
const smileyLayer = L.layerGroup();
const mapOverlays = {
  "Resorts": resortLayer,
  "Smiley": smileyLayer,
};


function drawMarkers() {
  for (const resort of resorts) {
    L.marker([resort.lat, resort.lng])
      .addTo(resortLayer)
      .bindTooltip(resort.name)
      .bindPopup(resort.name)
      .on("click", () => {
        showResortCard(resort);
      });
  }
}

async function initialLoad() {
  try {
    resorts = await loadResorts();
    reviews = await loadReviews();
    drawMarkers();
  } catch (err) {
    console.error(err)
  }
}

initialLoad()
handleReviewDialog();


reviewCardCloseBtn.onclick = handleReviewClose;
map.on("click", handleReviewClose);

const layerControl = L.control.layers(null, mapOverlays).addTo(map);










// for testing purposes; delete later

const SMILEY = [
  { name: "Left eye", lat: 43.95, lng: -72.45 },
  { name: "Right eye", lat: 43.95, lng: -71.55 },
  { name: "Mouth 1", lat: 43.38, lng: -72.65 },
  { name: "Mouth 2", lat: 43.14, lng: -72.40 },
  { name: "Mouth 3", lat: 43.05, lng: -72.00 },
  { name: "Mouth 4", lat: 43.14, lng: -71.60 },
  { name: "Mouth 5", lat: 43.38, lng: -71.35 },
];


for (const dot of SMILEY) {
  L.marker([dot.lat, dot.lng])
    .addTo(smileyLayer)
}
// AI slop:
map.on("overlayadd", (e) => {
  setTimeout(() => {
    if (e.layer === smileyLayer) map.removeLayer(resortLayer);
    if (e.layer === resortLayer) map.removeLayer(smileyLayer);
  }, 0);
});
