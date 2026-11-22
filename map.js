const reviewCard = document.querySelector(".review-card");
const reviewCardTitle = document.querySelector(".review-card__title");
const reviewCardReview = document.getElementById("review-card__review-box")
const reviewCardCloseBtn = document.querySelector(".review-card__close");

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






function getResort(marker) {
  reviewCardTitle.textContent = marker;
  reviewCardReview.replaceChildren();
  for (const review of SEED_REVIEWS) {
    if (review.resort === marker) {
      const item = createElement("div", "review");
      item.append(
        createElement("span", ["review__span", "review__author"], `Author: ${review.author}`),
        createElement("span", ["review__span", "review__rating"], `Rating: ${review.rating}`),
        createElement("span", ["review__span", "review__slope"], `Slope: ${review.slope}`),
        createElement("span", ["review__span", "review__body"], `Review: ${review.body}`),
      );
      reviewCardReview.append(item);
    }
  }
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

resortLayer.clearLayers();

for (const resort of RESORTS) {
  L.marker([resort.lat, resort.lng])
    .addTo(resortLayer)
    .bindPopup(resort.name)
    .on("click", () => {
      reviewCard.classList
        .add("review-card--visible")
      getResort(resort.name)
    });
}

reviewCardCloseBtn.onclick = () => {
  reviewCard.classList.
    remove("review-card--visible");
}

map.on("click", () => {
  reviewCard.classList
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
