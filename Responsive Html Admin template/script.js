var hamburgur = document.querySelector(".hamburgur");
hamburgur.addEventListener("click", function () {
  document.querySelector("body").classList.toggle(`${"active"}`);
  document.querySelector(".notification").classList.toggle("navigation");
});
window.addEventListener("resize", function (event) {
  let wSize = event.target.innerWidth;
  if (wSize < 768) {
    document.querySelector("body").classList.add("active");
  } else {
    document.querySelector("body").classList.remove("active");
  }
});