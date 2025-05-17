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

btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
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
  async function sendSearchRequest() {
    const response = await fetch(`/api/${format}`, options);
    const data = await response.json();
    console.log(data);
  }

  sendSearchRequest();
});
