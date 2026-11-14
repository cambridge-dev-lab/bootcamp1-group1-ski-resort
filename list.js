// List view: render the reviews into #reviews, add the review form.
//
// Start here:
//   const reviews = await loadReviews();   // inside an async function

// Example: the resorts filled into the dropdown; picking one updates the variable.
// Reviews render the same way — loop over loadReviews() instead of RESORTS.

let selectedResort = "all";

const resortSelect = document.querySelector("#resort-select");

for (const resort of RESORTS) {
  const option = document.createElement("option");
  option.value = resort.name;
  option.textContent = resort.name;
  resortSelect.append(option);
}

resortSelect.addEventListener("change", () => {
  selectedResort = resortSelect.value;
});
