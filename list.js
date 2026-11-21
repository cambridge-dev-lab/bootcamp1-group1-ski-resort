"use strict";

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

console.log(SEED_REVIEWS);

// we have array of objects
// for starter: take first element from array

// 1. function that takes one object
// 2. display element
// 3. make element use object data

let review1 = SEED_REVIEWS[0];
let review2 = SEED_REVIEWS[1];
let review3 = SEED_REVIEWS[2];
let review4 = SEED_REVIEWS[3];

// function displayElRes(el) {
//   let resortName = el.resort;
//   const paragraph = document.createElement("p");
//   paragraph.textContent = el.resort;
//   document.body.appendChild(paragraph);
//   return resortName
// }

// function displayElAu(el) {
//   let authorName = el.author;
//   const paragraph = document.createElement("p");
//   paragraph.textContent = el.author;
//   document.body.appendChild(paragraph);
//   return authorName
// }

// function displayElRa(el) {
//   let ratingNum = el.rating;
//   const paragraph = document.createElement("p");
//   paragraph.textContent = el.rating;
//   document.body.appendChild(paragraph);
//   return ratingNum
// }

// function displayElSl(el) {
//   let slopeName = el.slope;
//   const paragraph = document.createElement("p");
//   paragraph.textContent = el.slope;
//   document.body.appendChild(paragraph);
//   return slopeName
// }

function displayCard(reviewsList, review) {
  const cardHTML = `
    <div id="list-card" class="list-card">
        <h2 id="resort" class="resort">` + review.resort + `</h2>
        <div id="profile" class="profile">
          <img id="avatar" class="avatar" src="avatar-woman.png">
          <p id="author" class="author">` + review.author + `</p>
        </div>
        <p id="rating" class="rating">` + review.rating + `</p>
        <p id="slope" class="slope">` + review.slope + `</p>
        <p id="content" class="content">` + review.content + `</p>


    </div>
  `
  const template = document.createElement('template');
  template.innerHTML = cardHTML.trim(); 
  console.log(template);
  let el = template.content.firstElementChild;
  reviewsList.appendChild(el);
}

function displayAllCards() {
  for (let ii=0; ii < SEED_REVIEWS.length; ii++) {
    displayCard(document.getElementById("reviews"), SEED_REVIEWS[ii]);
  }
}
displayAllCards();

// displayCard(document.getElementById("reviews"), review1);
// displayCard(document.getElementById("reviews"), review2);

/*
// Review 1
console.log(displayElRes(review1));
console.log(displayElAu(review1));
console.log(displayElRa(review1));
console.log(displayElSl(review1));

// Review 2
console.log(displayElRes(review2));
console.log(displayElAu(review2));
console.log(displayElRa(review2));
console.log(displayElSl(review2));

// Review 3
console.log(displayElRes(review3));
console.log(displayElAu(review3));
console.log(displayElRa(review3));
console.log(displayElSl(review3));

// Review 4
console.log(displayElRes(review4));
console.log(displayElAu(review4));
console.log(displayElRa(review4));
console.log(displayElSl(review4));

displayCard();
displayCard();
*/