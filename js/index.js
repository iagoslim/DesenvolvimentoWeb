
async function fetchProdutos() {
  try {
    const response = await fetch("../items/items.json");
    const produtos = await response.json();
    return produtos;
  } catch (error) {
    console.error(error);
  }
}

async function getProdutoByID(id) {
  let produtoDetails;
  const produtos = await fetchProdutos();
  const produtosArray = Object.values(produtos);
  produtosArray.forEach((element) => {
    element.map((data) => {
      if (data.id === id) {
        produtoDetails = data;
      }
    });
  });
  return produtoDetails;
}

function init() {
  document.addEventListener("DOMContentLoaded", pageHandler());
  console.log("HTML loaded");
}

function pageHandler() {
  const page = document.body.id;
  switch (page) {
    case "produto":
      loadProductsPage();
      break;
    case "carrinho":
      something();
      break;
  }
}

async function loadProductsPage() {
  const pageCartCountSpan = document.getElementById("carrinhoItemsCount")
  pageCartCountSpan.innerHTML= `${localStorage.length}`
  const itemStoredID = getItemStoredID();
  console.log("estou na pagina de produto");
  itemData = await getProdutoByID(itemStoredID);
  console.log(itemStoredID);
  console.log(itemData.id);
  const productDetails = document.getElementById("produtoDetails");
  const productImage = document.getElementById("product-image");
  console.log(productDetails);
  productImage.innerHTML = `<img src=${itemData.imagem}>`;
  productDetails.innerHTML = `<div> ${itemData.cor} item details  bla bla bla bla bla bla bla bla bla</div>`;
}

function addToCart() {
  const itemBought = sessionStorage.getItem("itemSelected");
  const pageCartCountSpan = document.getElementById("carrinhoItemsCount")
  localStorage.setItem(createUID(), itemBought)
  pageCartCountSpan.innerHTML= `${localStorage.length}`

  

  

  const items = { ...localStorage };
  console.log(localStorage.length)
  
  console.log("carrinho:", items);


}


// function appendToStorageCart(data) {
//   var old = localStorage.getItem("cart");
//   localStorage.setItem("cart", old + data);
// }

function storeItemSelected(itemSelected) {
  var item = itemSelected;
  clearItemSelected();
  if (!sessionStorage.getItem("itemSelected")) {
    sessionStorage.setItem("itemSelected", item);
  }
}

function getItemStoredID() {
  const itemStoredID = sessionStorage.getItem("itemSelected");
  console.log(sessionStorage.getItem("itemSelected"));
  return itemStoredID;
}

function clearItemSelected() {
  sessionStorage.removeItem("itemSelected");
}

 function createUID(){
  const uid =    Date.now().toString(36) + Math.random().toString(36).substr(2);
  return uid.toString();
}

init();
