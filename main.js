
  // Obtén una referencia al elemento del menú de hamburguesas y al elemento de la lista de navegación
  const menuIcon = document.querySelector('.menu-label');
  const navList = document.querySelector('.navbar-list');

  // Agrega un evento clic al elemento del menú de hamburguesas
  menuIcon.addEventListener('click', () => {
    // Alterna la clase 'active' en el elemento de la lista de navegación para mostrar u ocultar el menú
    navList.classList.toggle('active');
  });
