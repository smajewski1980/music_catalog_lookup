// const btnSearch = document.getElementById("btn-search");
const btnCds = document.getElementById("btn-cds");
let cdsFlag = false;
const animationWrapper = document.querySelector(".cd-animation-wrapper");
const cdBody = document.getElementById("cd-body");
const leftArmWrapper = document.getElementById("left-arm-wrapper");
const rightArmWrapper = document.getElementById("right-arm-wrapper");
const leftArmLower = document.getElementById("cd-left-arm-2");
const rightArmLower = document.getElementById("cd-right-arm-2");
const leftlegWrapper = document.getElementById("left-leg-wrapper");
const rightlegWrapper = document.getElementById("right-leg-wrapper");
const leftlegLower = document.getElementById("cd-left-leg-2");
const rightlegLower = document.getElementById("cd-right-leg-2");

const elementsArray = [
  animationWrapper,
  cdBody,
  leftArmWrapper,
  rightArmWrapper,
  leftArmLower,
  rightArmLower,
  leftlegWrapper,
  rightlegWrapper,
  leftlegLower,
  rightlegLower,
];
// still have to make the classes and separate the css animations
const animationClasses = [
  "animation-wrapper-animation",
  "cd-body-animation",
  "left-arm-wrapper-animation",
  "right-arm-wrapper-animation",
  "left-arm-lower-animation",
  "right-arm-lower-animation",
  "left-leg-wrapper-animation",
  "right-leg-wrapper-animation",
  "left-leg-lower-animation",
  "right-leg-lower-animation",
];

function addAnimations() {
  for (let i = 0; i < elementsArray.length; i++) {
    elementsArray[i].classList.add(animationClasses[i]);
  }
}

// function handleSearchClick() {
//   if (cdsFlag) {
//     addAnimations();
//   }

//   setTimeout(() => {
//     cdsFlag = false;
//   }, 2000);
// }

// btnSearch.addEventListener("click", handleSearchClick);

// this is going to allow the cd animation to happen when search is pressed if cds are selected
// btnCds.addEventListener("click", () => {
//   cdsFlag = true;
// });
