// Shell: switches between the map view and the list view.

function setView(view) {
  document.querySelector("#map-view").classList.toggle("hidden", view !== "map");
  document.querySelector("#list-view").classList.toggle("hidden", view !== "list");
  document.querySelector("#map-btn").classList.toggle("active", view === "map");
  document.querySelector("#list-btn").classList.toggle("active", view === "list");
  // Once the map exists, call map.invalidateSize() here when view === "map" —
  // the map can't measure itself while hidden.
}

document.querySelector("#map-btn").addEventListener("click", () => setView("map"));
document.querySelector("#list-btn").addEventListener("click", () => setView("list"));

// Login — just the state and the label for now; real accounts can come later.

let isLoggedIn = false;

document.querySelector("#login-btn").addEventListener("click", () => {
  isLoggedIn = !isLoggedIn;
  document.querySelector("#login-btn").textContent = isLoggedIn ? "Log out" : "Log in";
});
