const reviewCard = document.querySelector(".review-card");
const reviewCardTitle = document.querySelector(".review-card__title");
const reviewCardReview = document.getElementById("review-card__review-box")
const reviewCardCloseBtn = document.querySelector(".review-card__close");

let resorts = [];
let reviews = [];

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

function getResortReviewByName(reviews, resortName) {
  const allReviews = [];
  for (const review of reviews) {
    if (review.resort === resortName) {
      allReviews.push(review);
    }
  }
  return allReviews;
}

function renderReviewContent(reviews) {
  reviewCardReview.replaceChildren();
  reviewCardTitle.textContent = reviews[0].resort;
  const item = createElement("div", "review");

  for (x in reviews) {
    item.append(
      createElement("span", ["review__span", "review__author"], `Author: ${reviews[x].author}`),
      createElement("span", ["review__span", "review__rating"], `Rating: ${reviews[x].rating}`),
      createElement("span", ["review__span", "review__slope"], `Slope: ${reviews[x].slope}`),
      createElement("span", ["review__span", "review__body"], `Review: ${reviews[x].body}`),
      createElement("br")
    );
  };

  reviewCardReview.append(item);
}

function handleResortClick(resortName) {
  reviewCard.classList.add("review-card--visible");
  const resort = getResortReviewByName(reviews, resortName);
  renderReviewContent(resort);
}

function handleReviewClose() {
  reviewCard.classList.remove("review-card--visible");
}

function handleReviewDialog() {
  const dialog = document.getElementById("dialog");
  const openButton = document.getElementById("open");
  const closeButton = document.getElementById("close");

  openButton.addEventListener("click", () => {
    dialog.showModal();
  });
  closeButton.addEventListener("click", () => {
    dialog.close();
  });
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
        handleResortClick(resort.name);
      });
  }
}

async function initialLoad() {
  try {
    resorts = await loadResorts();
    reviews = await loadReviews();
    drawMarkers();
    handleReviewDialog();
  } catch (err) {
    console.log(err)
    ERROR_DISPLAY.innerHTML = ERROR_MESSAGE
  }
}

initialLoad()


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
