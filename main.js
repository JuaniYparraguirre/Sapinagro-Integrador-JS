//FUNCION PARA ABRIR EL MENU HAMBURGUEZA//
// const menuIcon = document.querySelector(".ham");
// const navList = document.querySelector(".navbar");

// menuIcon.addEventListener("click", () => {
//   if (navList.style.display === "none" || navList.style.display === "") {
//     navList.style.display = "block";
//   } else {
//     navList.style.display = "none";
//   }
// });

// Contenedor de productos
const productsContainer = document.querySelector(".products-container");

// Contenedor Categorias
const categoriesContainer = document.querySelector(".categories");
// El HTML Collection de todas las categorias
const categoriesList = document.querySelectorAll(".category");
// Carrito
const cartBtn = document.querySelector(".cart-label");
// Boton para abrir y cerrar el menu
const menuBtn = document.querySelector(".menu-label");
// Carrito div
const cartMenu = document.querySelector(".cart");
// Menu (Hamburguesa)
const barsMenu = document.querySelector(".navbar-list");
// Overlay
const overlay = document.querySelector(".overlay");
// Cart bubble
const cartBubble = document.querySelector(".cart-bubble");
// Total del carrito
const total = document.querySelector(".total");
// Boton de comprar
const buyBtn = document.querySelector(".btn-buy");
// Boton para borrar
const deleteBtn = document.querySelector(".btn-delete");
// Cart container
const productsCart = document.querySelector(".cart-container");
// Modal de success
const successModal = document.querySelector(".add-modal");

// Seteamos el carrito
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Funcion para guardar en el LS
const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

//Funcion para renderizar productos
const createProductTemplate = (product) => {
  const { id, name, bid, user, cardImg } = product;
  return `<div class="product">
  <img src="${cardImg}" alt="${name}" />
  
  <!-- contenedor para la info -->
  <div class="product-info">
    <!-- Top -->
    <div class="product-top">
      <h3>${name}</h3>
      <div class="product-med">
      <p>${user}</p></div>
    </div>
  
    <!-- mid -->
    <div class="product-mid">
      <div class="product-user">
        <p>Precio de referencia</p>
      </div>
      <span>${bid}</span>
    </div>
  
    
      <button class="btn-add"
      data-id='${id}' 
      data-name='${name}'
      data-bid='${bid}' 
      data-img='${cardImg}'
      >Cotizar</button>
    </div>
  </div>
  </div>`;
};

const renderProducts = (productList) => {
  productsContainer.innerHTML += productList
    .map(createProductTemplate)
    .join("");
};
//

//Logica de Filtros
//Funcion para cambiar el estado de los botones de las categorias
const changeBtnActiveState = (selectedCategory) => {
  const categories = [...categoriesList];
  console.log(appState);
  categories.forEach((categoryBtn) => {
    if (categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove("active");
      return;
    }

    categoryBtn.classList.add("active");
  });
};
//Funcion para cambiar el estado del filtro activo
const changeFiltersState = (btn) => {
  appState.activeFilter = btn.dataset.category;
  changeBtnActiveState(appState.activeFilter);
};
//Funcion para filtrar los productos
const renderFilteredProducts = () => {
  const filteredProducts = productsData.filter(
    (product) => product.category === appState.activeFilter
  );
  renderProducts(filteredProducts);
};
//Funcion de para aplicar fitros
const applyFilter = ({ target }) => {
  if (!isInactiveFiltreBtn(target)) return;
  changeFiltersState(target);
  productsContainer.innerHTML = "";
  if (appState.activeFilter) {
    renderFilteredProducts();
    appState.currentProductsIndex = 0;
    return;
  }
  renderProducts(appState.products[0]);
};

const isInactiveFiltreBtn = (element) => {
  return (
    element.classList.contains("category") &&
    !element.classList.contains("active")
  );
};

//FUNCION PARA ABRIR EL MENU HAMBURGUEZA//
const toggleCart = () => {
  cartMenu.classList.toggle("open-cart");

  if (barsMenu.classList.contains("open-menu")) {
    barsMenu.classList.remove("open-menu");
    return;
  }
  overlay.classList.toggle("show-overlay");
};

const toggleMenu = () => {
  barsMenu.classList.toggle("open-menu");
  if (cartMenu.classList.contains("open-cart")) {
    cartMenu.classList.remove("open-cart");
    return;
  }
  overlay.classList.toggle("show-overlay");
};
const closeOnOverlayClick = () => {
  barsMenu.classList.remove("open-menu");
  cartMenu.classList.remove("open-cart");
  overlay.classList.remove("show-overlay");
};

const closeOnScroll = () => {
  if (
    barsMenu.classList.contains("open-menu") &&
    cartMenu.classList.contains("open-cart")
  ) {
    return;
  }
  barsMenu.classList.remove("open-menu");
  cartMenu.classList.remove("open-cart");
  overlay.classList.remove("show-overlay");
};

const init = () => {
  renderProducts(appState.products[0]);
  categoriesContainer.addEventListener("click", applyFilter);
  categoriesContainer.addEventListener("click", applyFilter);
  cartBtn.addEventListener("click", toggleCart);
  menuBtn.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", closeOnOverlayClick);
  window.addEventListener("scroll", closeOnScroll);
};
init();
