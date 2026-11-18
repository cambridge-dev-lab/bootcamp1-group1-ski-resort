const flyout = document.querySelector(".review-card");
const flyoutTitle = document.querySelector(".review-card__title");
const flyoutReview = document.getElementById("review-card__review-box");
const btnFlyoutClose = document.querySelector(".review-card__close");

let resorts = [];
let reviews = [];

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

resortLayer.clearLayers();


function formatHTML(className, title, content) {
  const span = document.createElement("span");
  span.classList.add("review__span", className);
  span.textContent = title + content;
  return span;
}

function getResort(marker) {
  flyoutTitle.textContent = marker;
  flyoutReview.replaceChildren();
  for (const review of reviews) {
    if (review.resort === marker) {
      const item = document.createElement("div");
      item.classList.add("review");
      item.append(
        formatHTML("review__author", "Author: ", review.author),
        formatHTML("review__rating", "Rating: ", review.rating),
        formatHTML("review__slope", "Slope: ", review.slope),
        formatHTML("review__body", "Review: ", review.body),
      );
      flyoutReview.append(item);
    }
  }
}


function drawMarkers() {
  for (const resort of resorts) {
    L.marker([resort.lat, resort.lng])
      .addTo(resortLayer)
      .bindPopup(resort.name)
      .on("click", () => {
        flyout.classList
          .add("review-card--visible")
        getResort(resort.name)
      });
  }
}

async function initialLoad() {
  try {
    resorts = await loadResorts();
    reviews = await loadReviews();
  } catch (err) {
    console.log(err)
    ERROR_DISPLAY.innerHTML = ERROR_MESSAGE
  }
  drawMarkers();
}

initialLoad()


btnFlyoutClose.onclick = () => {
  flyout.classList.
    remove("review-card--visible");
}

map.on("click", () => {
  flyout.classList
    .remove("review-card--visible");
});

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
