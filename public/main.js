const searchRadioBtns = document.querySelectorAll(
  '.search-field-select-wrapper input[type="radio"]'
);
const searchSpan = document.getElementById("search-label-span");
const formatSpan = document.getElementById("search-format-span");
const btnSearch = document.getElementById("btn-search");
const searchTermElem = document.getElementById("search-term");
const formatRadioBtns = document.querySelectorAll(
  '.format-select-wrapper input[type="radio"]'
);
const resultsDiv = document.querySelector(".results");
const resultsSpan = document.querySelector("h4 span");

let searchField;
let format;

searchRadioBtns.forEach((btn) => {
  btn.addEventListener("change", (e) => {
    searchField = e.target.value;
    searchSpan.innerText = searchField;
  });
});

formatRadioBtns.forEach((btn) => {
  btn.addEventListener("change", (e) => {
    format = e.target.value;
    formatSpan.innerText = format;
  });
});

function sortByKey(array, key) {
  return array.sort(function (a, b) {
    if (a[key].toLowerCase() < b[key].toLowerCase()) {
      return -1;
    }
    if (a[key].toLowerCase() > b[key].toLowerCase()) {
      return 1;
    }
    return 0;
  });
}

async function sendSearchRequest() {
  const searchTerm = searchTermElem.value;
  const field = searchField;
  const searchObj = {
    searchTerm: searchTerm,
    searchField: field,
  };
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(searchObj),
  };
  const response = await fetch(`/api/${format}`, options);
  const data = await response.json();
  let qty = data.length;
  let html = "";

  sortByKey(data, "artist").forEach((item) => {
    html += `<p>${item.artist} - ${item.title} - ${item.location}</p>`;
  });
  resultsDiv.innerHTML = html;
  resultsSpan.innerText = ` - ${qty}`;
  // console.log(data);
}

btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
  sendSearchRequest();
});
