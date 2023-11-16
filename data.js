const productsData = [
  {
    id: 1,
    name: "Cabezal Maicero Hibrido",
    bid: 6.89,
    user: "16 Surcos a 52,5cm",
    category: "allochis",

    cardImg: "./assets/img/products/goldenmessi.png",
  },
  {
    id: 2,
    name: "Sembradora gurisa",
    bid: 5.89,
    user: "De grano fino",
    category: "gimetal",

    cardImg: "./assets/img/products/diego.png",
  },
  {
    id: 3,
    name: "Tolva autodescagable",
    bid: 4.89,
    user: "2ejes y 3ejes",
    category: "ascanelli",

    cardImg: "./assets/img/products/beardedmessi.png",
  },
  {
    id: 4,
    name: "Cargadora de cereal y fertilizantes",
    bid: 3.67,
    user: "Motor a exploción o hidraulico",
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
