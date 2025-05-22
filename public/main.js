const searchRadioBtns = document.querySelectorAll(
  '.search-field-select-wrapper input[type="radio"]'
);
const btnSearch = document.getElementById("btn-search");
const searchTermElem = document.getElementById("search-term");
const formatRadioBtns = document.querySelectorAll(
  '.format-select-wrapper input[type="radio"]'
);
const resultsDiv = document.querySelector(".results");
const resultsQty = document.querySelector(".qty");

let searchField;
let format;

searchRadioBtns.forEach((btn) => {
  btn.addEventListener("change", (e) => {
    searchField = e.target.value;
  });
});

formatRadioBtns.forEach((btn) => {
  btn.addEventListener("change", (e) => {
    format = e.target.value;
    // if (format === "CDs") {
    //   addAnimations();
    // }
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
  let html =
    "<table><thead><tr><th>artist</th><th>title</th><th>location</th></tr></thead><tbody>";

  sortByKey(data, "artist").forEach((item) => {
    html += `<tr><td class="td-artist" title="${item.artist}">${item.artist}</td><td class="td-title" title="${item.title}">${item.title}</td><td class="td-location">${item.location}</td></tr>`;
  });
  html += "</tbody></table>";
  resultsDiv.innerHTML = html;
  resultsQty.innerText = `There are ${qty} results.`;
  // console.log(data);
}

btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
  sendSearchRequest();
});
