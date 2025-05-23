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

// i want to try getting the data but only generating html a little at a times

async function setQtyText(qty) {
  if (qty <= offset) {
    totalQtyElem.innerText = `Viewing ${qty} of ${qty} results.`;
    paginationElem.innerText = "";
  } else {
    totalQtyElem.innerText = `Viewing ${offset} of ${qty} results.`;
    paginationElem.innerText = "";
    const numPages = Math.ceil(qty / offset);

    paginationElem.innerText = `${numPages} pages`;
  }
}

async function setPagination(data) {
  // const response = await fetch(`/api/${format.toLowerCase()}/total`);
  // const data = await response.json();

  resultsDiv.innerHTML = "";

  let dataChunk = data.slice(0, offset);
  console.log(dataChunk.length);
  setHTML(dataChunk);
  setQtyText(data.length);
}

function setHTML(data) {
  let qty = data.length;
  if (qty <= offset) {
    let html =
      "<table><thead><tr><th>artist</th><th>title</th><th>location</th></tr></thead><tbody>";

    const sortedData = sortByKey(data, "artist");
    sortedData.forEach((item) => {
      html += `<tr><td class="td-artist" title="${item.artist}">${item.artist}</td><td class="td-title" title="${item.title}">${item.title}</td><td class="td-location">${item.location}</td></tr>`;
    });
    html += "</tbody></table>";
    resultsDiv.innerHTML = html;
    setQtyText(qty);
  } else {
    setPagination(data);
  }
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

  // console.log(data);
}

btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
  sendSearchRequest();
});
