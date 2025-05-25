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

let currPage = 1;
const offset = 250;

const totalQtyElem = document.getElementById("totalQty");
const paginationElem = document.getElementById("pagination");
const pageInput = document.getElementById("page-input");

searchRadioBtns.forEach((btn) => {
  btn.addEventListener("change", (e) => {
    searchField = e.target.value;
  });
});

formatRadioBtns.forEach((btn) => {
  btn.addEventListener("change", (e) => {
    format = e.target.value;
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

async function setQtyText(qty) {
  totalQtyElem.innerText = `There are ${qty} results.`;
  paginationElem.innerText = "";
}

async function setPagination(searchObj) {
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(searchObj),
  };
  const response = await fetch(`/api/${format.toLowerCase()}/total`, options);
  const data = await response.json();

  const numPages = Math.ceil(data.count / offset);
  pageInput.max = numPages;
  pageInput.style.display = "inline";
  totalQtyElem.innerText = `There are ${data.count} results.`;
  paginationElem.innerText = "";
  paginationElem.innerHTML = `of ${numPages} pages`;
}

function setHTML(data) {
  let qty = data.length;
  let html =
    "<table><thead><tr><th>artist</th><th>title</th><th>location</th></tr></thead><tbody>";

  data.forEach((item) => {
    html += `<tr><td class="td-artist" title="${item.artist}">${item.artist}</td><td class="td-title" title="${item.title}">${item.title}</td><td class="td-location">${item.location}</td></tr>`;
  });

  html += "</tbody></table>";
  resultsDiv.innerHTML = html;
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
  const response = await fetch(
    `/api/${format}?page=${currPage}&offset=${offset}`,
    options
  );
  const data = await response.json();

  setHTML(data);
  if (data.length === offset || currPage > 1) {
    setPagination(searchObj);
  } else {
    setQtyText(data.length);
    pageInput.style.display = "none";
  }
}

function handlePageChange(e) {
  const newPageNum = e.target.value;
  currPage = newPageNum;
  sendSearchRequest();
}

btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
  currPage = 1;
  pageInput.value = 1;
  sendSearchRequest();
});

pageInput.addEventListener("change", handlePageChange);
