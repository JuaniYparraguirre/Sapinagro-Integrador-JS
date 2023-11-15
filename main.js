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
//Contactos de email
const $form = document.getElementById("register-form");
//Button de email
const $buttonMailto = document.querySelector("#miEmail");
//Validacion del email
const emailInput = document.getElementById("email");
//Validacion del nombre
const nameInput = document.getElementById("name");
//Validacion del Apellido
const LastNameInput = document.getElementById("lastName");
//Validacion del Telefono
const phoneInput = document.getElementById("phone");
//Mensajes de error
const errorMessage = document.getElementById("form__error");

// Seteamos el carrito
let cart = JSON.parse(localStorage.getItem("cart")) || [];
//Guardar el email en LS
const users = JSON.parse(localStorage.getItem("users")) || [];

const saveValidToLocalStorage = () => {
  localStorage.setItem("users", JSON.stringify(users));
};
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
//Logica carrito

//Funcio para crae el template del producto en el carrrito
const createCartProductTemplate = (cartProduct) => {
  const { bid, id, img, name, quantity } = cartProduct;
  return `<div class="cart-item"> 
           <img src="${img}" alt="${name}"/>
           <!----Info del producto----!>
           <div class="item-info">
           <h3 class="item-title">${name}</h3>
           <p class="item-bid">Currend bid</p>
           <span class="item-price">${bid}</span>
           </div>
           <!-- Botones --!>
           <div class="item-handler">
           <span class="quantity-handler down" data-id=${id}>-</span>
           <span class="item-quantity">${quantity}</span>
           <span class="quantity-handler up" data-id=${id}> + </span>
           </div>
           </div>
           `;
};

//Render Carrito
const renderCart = () => {
  if (!cart.length) {
    productsCart.innerHTML = `<p class="">Cargamos el carreton con tu nueva maquinaria ?</p>`;
    return;
  }
  productsCart.innerHTML = cart.map(createCartProductTemplate).join("");
};

//funcion para obtener el total de la compra
const getCartTotal = () => {
  return cart.reduce((acc, cur) => acc + Number(cur.bid) * cur.quantity, 0);
};

// Funcion para obtener el total de la carrito
const showCartTotal = () => {
  total.innerHTML = `${getCartTotal().toFixed(2)} U$S`;
};

//funcion para actualizar la burbuja con la cantidad de productos en el cart

const renderCartBubble = () => {
  cartBubble.textContent = cart.reduce((acc, cur) => acc + cur.quantity, 0);
};

//Funcion para habilitar o desabilitar botones

const disableBtn = (btn) => {
  if (!cart.length) {
    btn.classList.add("disabled");
  } else {
    btn.classList.remove("disabled");
  }
};

//Funcion para ejecutar funciones necesarias para actualizar el estado del carrito
const updateCartState = () => {
  saveCart();
  renderCart();
  showCartTotal();
  renderCartBubble();
  disableBtn(buyBtn);
  disableBtn(deleteBtn);
};

const addProduct = (e) => {
  if (!e.target.classList.contains("btn-add")) return;
  const product = e.target.dataset;
  if (isExistingCartProduct(product)) {
    addUnitProduct(product);
    showSuccessModal("Realizaste otra carga al camión!");
  } else {
    createCartProduct(product);
    showSuccessModal("Cargaste una maquinaria al camión!");
  }
  updateCartState();
};

const addUnitProduct = (product) => {
  cart = cart.map((cartProduct) =>
    cartProduct.id === product.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct
  );
};

const isExistingCartProduct = (product) => {
  return cart.find((item) => item.id === product.id);
};

const createCartProduct = (product) => {
  cart = [...cart, { ...product, quantity: 1 }];
};

// Funcion para manejar el evento click de + en el carrito
const handlePlusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);
  addUnitProduct(existingCartProduct);
};

//Funcion para manejar el evento click de - en el carrito

const handleMinusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);
  if (existingCartProduct.quantity === 1) {
    if (window.confirm("Deseas eliminar el producto")) {
      removeProducFromCart(existingCartProduct);
    }
    return;
  }
  substractProductUnit(existingCartProduct);
};

const substractProductUnit = (existingCartProduct) => {
  cart = cart.map((product) => {
    return product.id === existingCartProduct.id
      ? { ...product, quantity: Number(product.quantity) - 1 }
      : product;
  });
};

const removeProducFromCart = (existingCartProduct) => {
  cart = cart.filter((product) => product.id !== existingCartProduct.id);
  updateCartState();
};
// Funcion para manejar la cantidad de los productos en el carro
const handleQuantity = (e) => {
  if (e.target.classList.contains("up")) {
    handlePlusBtnEvent(e.target.dataset.id);
  } else if (e.target.classList.contains("down")) {
    handleMinusBtnEvent(e.target.dataset.id);
  }
  updateCartState();
};

const resetCartItems = () => {
  cart = [];
  updateCartState();
};
const completeCartAction = (confirmMsg, successMsg) => {
  if (!cart.length) return;
  if (window.confirm(confirmMsg)) {
    resetCartItems();
    alert(successMsg);
  }
};

const completeBuy = () => {
  completeCartAction(
    "Deseas pedir una cotización?",
    "Enviaremos un mail con su orden. Gracias!"
  );
};

const deleteCart = () => {
  completeCartAction(
    "Deseas bajar la carga del carreton?",
    "No hay carga en el camión!"
  );
};

const showSuccessModal = (msg) => {
  successModal.classList.add("active-modal");
  successModal.textContent = msg;

  setTimeout(() => {
    successModal.classList.remove("active-modal");
  }, 1500);
};
//Formulario de contacto funcional
function handleSubmit(event) {
  event.preventDefault();
  const form = new FormData(this);
  $buttonMailto.setAttribute(
    "href",
    `mailto:juaniyparraguirre9@gmail.com?subject=nombre: ${form.get(
      "name"
    )} tel: ${form.get("text")} correo: ${form.get("email")}&body=${form.get(
      "message"
    )}`
  );

  $buttonMailto.click();
}

//Funciones Auxiliares de validaciones//
const isEmpy = (input) => {
  return !input.value.trim().length;
};

const isBetween = (input, min, max) => {
  return input.value.length >= min && input.value.length <= max;
};

const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.add("error");

  const error = formField.querySelector("small");
  error.style.display = "block";
  error.textContent = message;
};

const isPhoneValid = (input) => {
  const re = /^\(?\d{2}\)?[\s\.-]?\d{4}[\s\.-]?\d{4}$/;
  return re.test(input.value.trim());
};
//Regex para validar el email ---->
const isEmailValid = (input) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  return re.test(input.value.trim());
};
//Validar si el email esta guardado
const isExistingEmail = (input) => {
  return users.some((user) => user.email === input.value.trim());
};
const showSuccess = (input) => {
  const formField = input.parentElement;
  formField.classList.remove("error");
  formField.classList.add("success");
  const error = formField.querySelector("small");
  error.textContent = "";
};
//Validacion del name
const checkInput = (input) => {
  let valid = false;
  const MIN_CHARACTERS = 3;
  const MAX_CHARACTERS = 25;

  if (isEmpy(input)) {
    showError(input, "Este campo es obligatorio");
    return;
  }
  if (!isBetween(input, MIN_CHARACTERS, MAX_CHARACTERS)) {
    showError(
      input,
      `Este campo debe tener entre ${MIN_CHARACTERS} y ${MAX_CHARACTERS} caracteres`
    );
    return;
  }
  showSuccess(input);
  valid = true;
  return valid;
};
//Validacion del telefono
const checkPhone = (input) => {
  let valid = false;
  if (isEmpy(input)) {
    showError(input, "El telefono es obligatorio");
    return;
  }
  if (!isPhoneValid(input)) {
    showError(input, "El telefono no es valido");
    return;
  }
  showSuccess(input);
  valid = true;
  return valid;
};
//Validacion del email
const checkEmail = (input) => {
  let valid = false;
  if (isEmpy(input)) {
    showError(input, "El email es obligatorio");
    return;
  }
  if (!isEmailValid(input)) {
    showError(input, "El email no es valido");
    return;
  }
  if (isExistingEmail(input)) {
    showError(input, "El email ya esta registrado");
    return;
  }
  showSuccess(input);
  valid = true;
  return valid;
};

// Validacion del Form
const validateForm = (e) => {
  e.preventDefault();
  let isNameValid = checkInput(nameInput);
  let isLastNameValid = checkInput(LastNameInput);
  let isPhoneValid = checkPhone(phoneInput);
  let isEmailValid = checkEmail(emailInput);
  let isValidForm =
    isNameValid && isLastNameValid && isPhoneValid && isEmailValid;
  if (isValidForm) {
    users.push({
      name: nameInput.value,
      lastName: LastNameInput.value,
      phone: phoneInput.value,
      email: emailInput.value,
    });
    saveValidToLocalStorage(users);
    alert("Tu consulta fue enivada");
  }
};
const init = () => {
  renderProducts(appState.products[0]);
  categoriesContainer.addEventListener("click", applyFilter);
  categoriesContainer.addEventListener("click", applyFilter);
  cartBtn.addEventListener("click", toggleCart);
  menuBtn.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", closeOnOverlayClick);
  window.addEventListener("scroll", closeOnScroll);
  productsContainer.addEventListener("click", addProduct);
  productsCart.addEventListener("click", handleQuantity);
  document.addEventListener("DOMContentLoaded", renderCart);
  buyBtn.addEventListener("click", completeBuy);
  deleteBtn.addEventListener("click", deleteCart);
  disableBtn(buyBtn);
  disableBtn(deleteBtn);
  renderCartBubble(cart);
  $form.addEventListener("submit", handleSubmit);
  nameInput.addEventListener("input", () => checkInput(nameInput));
  LastNameInput.addEventListener("input", () => checkInput(LastNameInput));
  emailInput.addEventListener("input", () => checkEmail(emailInput));
  phoneInput.addEventListener("input", () => checkPhone(phoneInput));
  $form.addEventListener("submit", validateForm);
};
init();
