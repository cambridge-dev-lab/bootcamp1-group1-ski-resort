const flyout = document.querySelector(".review-card");
const btnFlyoutClose = document.querySelector(".review-card__close");



const map = L.map("map").setView([43.9, -71.9], 7);
L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
  attribution: "Tiles © Esri — Esri, DeLorme, NAVTEQ",
}).addTo(map);
const resortLayer = L.layerGroup().addTo(map);
const smileyLayer = L.layerGroup();
const mapOverlays = { "Resorts": resortLayer, "Smiley": smileyLayer, };

resortLayer.clearLayers();
for (const resort of RESORTS) {
  L.marker([resort.lat, resort.lng])
    .addTo(resortLayer)
    .bindPopup(resort.name)
    .on("click", () => { flyout.classList.add("review-card--visible") })
}

btnFlyoutClose.onclick = () => { flyout.classList.remove("review-card--visible") }

const layerControl = L.control.layers(null, mapOverlays).addTo(map)



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
