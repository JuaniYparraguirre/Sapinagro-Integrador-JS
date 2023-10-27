const productsData = [
  {
    id: 1,
    name: "Golden Messi",
    bid: 6.89,
    user: "thetroncous",
    category: "allochis",

    cardImg: "./assets/img/products/goldenmessi.png",
  },
  {
    id: 2,
    name: "Diego Maradona",
    bid: 5.89,
    user: "kirik8",
    category: "gimetal",

    cardImg: "./assets/img/products/diego.png",
  },
  {
    id: 3,
    name: "L10nel Messi",
    bid: 4.89,
    user: "FD10S",
    category: "ascanelli",

    cardImg: "./assets/img/products/beardedmessi.png",
  },
  {
    id: 4,
    name: "M. Schumacher",
    bid: 3.67,
    user: "Urastream",
    category: "procor",
    cardImg: "./assets/img/products/schumacher.png",
  },
];

// Funcion para dividir el array en X cantidad de arrays
const DivideProductsInParts = (size) => {
  let productList = [];

  for (let i = 0; i < productsData.length; i += size) {
    productList.push(productsData.slice(i, i + size));
  }
  return productList;
};

// Appstate;
const appState = {
  products: DivideProductsInParts(1),
  currentProductsIndex: 0,
  productsLimit: DivideProductsInParts(3).length,
  activeFilter: null,
};
