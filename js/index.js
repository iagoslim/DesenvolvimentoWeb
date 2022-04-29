
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
    case "produto": {
      loadProductsPage();
      fetchCarrinhoCounter();
    }

      break;
    case "carrinho":
      loadCarrinhoPage();
      fetchCarrinhoCounter();
      break;
    case "home": {
      fetchCarrinhoCounter();
    }
      break;
    case "produtos": {
      fetchCarrinhoCounter();
    }
      break;

  }
}

async function loadProductsPage() {
  const pageCartCountSpan = document.getElementById("carrinhoItemsCount")
  pageCartCountSpan.innerHTML = `${localStorage.length}`
  const itemStoredID = getItemStoredID();
  console.log("estou na pagina de produto");
  itemData = await getProdutoByID(itemStoredID);
  console.log(itemStoredID);
  console.log(itemData.id);
  const productDescription = document.getElementById("descricao");
  const procuctPrice = document.getElementById("preco");
  const productImage = document.getElementById("product-image");
  productImage.innerHTML = `<img src=${itemData.imagem}>`;
  productDescription.innerHTML = `<div> ${itemData.descricao}</div>`
  procuctPrice.innerHTML = `<div> R$ ${itemData.preco}</div> `

}

function fetchCarrinhoCounter() {
  const pageCartCountSpan = document.getElementById("carrinhoItemsCount")
  pageCartCountSpan.innerHTML = `${localStorage.length}`
}

function addToCart() {
  const itemBought = sessionStorage.getItem("itemSelected");
  localStorage.setItem(createUID(), itemBought)
  fetchCarrinhoCounter();
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

function createUID() {
  const uid = Date.now().toString(36) + Math.random().toString(36).substr(2);
  return uid.toString();
}

async function calculaCarrinho() {
  const items = retrieveCarrinho();
  console.log(items.length)
  let temp = 0
  let totalCarrinho = 0
  for (let index = 0; index < items.length; index++) {
    temp = await getProdutoByID(items[index])
    totalCarrinho += temp.preco

  }
  return totalCarrinho
}
function retrieveCarrinho() {
  var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

  while (i--) {
    values.push(localStorage.getItem(keys[i]));
  } return values;
}
async function loadCarrinhoPage() {
  const precoTotalDiv = document.getElementById("precoTotal")
  const precoCarrinho = await calculaCarrinho()
  precoTotalDiv.innerHTML =  `Preço total do carrinho: R$ ${precoCarrinho}`
}

function limparCarrinho(){
  localStorage.clear()
  window.location.reload();
}
init();
