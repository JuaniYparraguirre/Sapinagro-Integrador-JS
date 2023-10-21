// const menuIcon = document.querySelector(".ham");
// const navList = document.querySelector(".navbar");

// menuIcon.addEventListener("click", () => {
//   if (navList.style.display === "none" || navList.style.display === "") {
//     navList.style.display = "block";
//   } else {
//     navList.style.display = "none";
//   }
// });

const menuIcon = document.querySelector(".ham");
const navList = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
  if (navList.style.display === "none" || navList.style.display === "") {
    navList.style.display = "block";
  } else {
    navList.style.display = "none";
  }

  // Agregar o quitar la clase de transición después de cambiar el estilo
  navList.classList.add("menu-transition");
  setTimeout(() => {
    navList.classList.remove("menu-transition");
  }, 5000); // Esto debe coincidir con la duración de la transición en milisegundos
});
