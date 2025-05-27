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

const cdScrollAnimationClasses = [
  "cd-scroll-animation-wrapper-animation",
  "cd-scroll-body-animation",
  "cd-scroll-left-arm-wrapper-animation",
  "cd-scroll-right-arm-wrapper-animation",
  "cd-scroll-left-arm-lower-animation",
  "cd-scroll-right-arm-lower-animation",
  "cd-scroll-left-leg-wrapper-animation",
  "cd-scroll-right-leg-wrapper-animation",
  "cd-scroll-left-leg-lower-animation",
  "cd-scroll-right-leg-lower-animation",
];

function addAnimations() {
  for (let i = 0; i < elementsArray.length; i++) {
    elementsArray[i].classList.add(animationClasses[i]);
  }
}

function removeAnimationClasses() {
  animationWrapper.style.left = "50%";
  for (let i = 0; i < elementsArray.length; i++) {
    elementsArray[i].style.rotate = "0";
  }
  for (let i = 1; i < elementsArray.length; i++) {
    elementsArray[i].classList.remove(animationClasses[i]);
  }
}

function addScrollAnimations() {
  for (let i = 0; i < elementsArray.length; i++) {
    elementsArray[i].classList.add(cdScrollAnimationClasses[i]);
  }
}

function handleSearchClick() {
  if (cdsFlag) {
    addAnimations();
    setTimeout(() => {
      cdsFlag = false;
      removeAnimationClasses();
      addScrollAnimations();
    }, 1500);
  }
}

btnSearch.addEventListener("click", handleSearchClick);

// this is going to allow the cd animation to happen when search is pressed if cds are selected
btnCds.addEventListener("click", () => {
  cdsFlag = true;
});
