const menuIcon = document.querySelector(".ham");
const navList = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
  if (navList.style.display === "none" || navList.style.display === "") {
    navList.style.display = "block";
  } else {
    navList.style.display = "none";
  }
});
