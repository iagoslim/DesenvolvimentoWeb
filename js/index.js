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
}

function pageHandler() {
  const page = document.body.id;
  switch (page) {
    case "produto":
      {
        loadProductsPage();
        fetchCarrinhoCounter();
      }

      break;
    case "carrinho":
      loadCarrinhoPage();
      fetchCarrinhoCounter();
      break;
    case "home":
      {
        fetchCarrinhoCounter();
      }
      break;
    case "produtos":
      {
        fetchCarrinhoCounter();
      }
      break;
  }
}

async function loadProductsPage() {
  const pageCartCountSpan = document.getElementById("carrinhoItemsCount");
  pageCartCountSpan.innerHTML = `${localStorage.length}`;
  const itemStoredID = getItemStoredID();
  itemData = await getProdutoByID(itemStoredID);
  const productDescription = document.getElementById("descricao");
  const procuctPrice = document.getElementById("preco");
  const productImage = document.getElementById("product-image");
  productImage.innerHTML = `<img src=${itemData.imagem}>`;
  productDescription.innerHTML = `<div> ${itemData.descricao}</div>`;
  procuctPrice.innerHTML = `<div> R$ ${itemData.preco}</div> `;
}

function fetchCarrinhoCounter() {
  const pageCartCountSpan = document.getElementById("carrinhoItemsCount");
  pageCartCountSpan.innerHTML = `${localStorage.length}`;
}

function addToCart() {
  const itemBought = sessionStorage.getItem("itemSelected");
  const tamanho = document.getElementById("size").value;
  let quantidade = document.getElementById("quantidade").value;
  for (let index = 0; index < quantidade; index++) {
    localStorage.setItem(createUID(), itemBought + "," + tamanho);
  }
  itemAdded("itemAdded");
  fetchCarrinhoCounter();
}

function storeItemSelected(itemSelected) {
  var item = itemSelected;
  clearItemSelected();
  if (!sessionStorage.getItem("itemSelected")) {
    sessionStorage.setItem("itemSelected", item);
  }
}

function getItemStoredID() {
  const itemStoredID = sessionStorage.getItem("itemSelected");

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
  let temp = 0;
  let totalCarrinho = 0;
  for (let index = 0; index < items.length; index++) {
    const itemID = items[index].split(",");
    temp = await getProdutoByID(itemID[0]);
    totalCarrinho += temp.preco;
  }
  return totalCarrinho.toFixed(2);
}
function retrieveCarrinho() {
  var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

  while (i--) {
    values.push(localStorage.getItem(keys[i]));
  }
  return values;
}
async function loadCarrinhoPage() {
  const precoTotalDiv = document.getElementById("precoTotal");
  const precoCarrinho = await calculaCarrinho();
  await retrieveCarrinhoItemDetails();
  precoTotalDiv.innerHTML = `Preço total do carrinho: R$ ${precoCarrinho}`;
}

async function retrieveCarrinhoItemDetails() {
  const items = retrieveCarrinho();

  const olCartShop = document.getElementById("olCartshop");
  let temp;
  let liCarrinho = "";
  for (let index = 0; index < items.length; index++) {
    const itemUUID = localStorage.key(index);
    const itemID = items[index].split(",");
    const itemSize = items[index].split(",")[1];
    temp = await getProdutoByID(itemID[0]);

    liCarrinho += `<div class="div-items-cart">    
    <li class="li-item-cart">Descrição:${temp.descricao}|Tamanho: ${itemSize}|Cor: ${temp.color} ----- Preço:R$ ${temp.preco}</li>
      <a id = ${itemUUID} class="remove-item-link" onclick="DeleteItemCart(this.id)">
        <i class="fa fa-trash-o"></i> 
       <span class="span-remove-item">Remover produto</span>
      </a>
   
    </div>`;
  }
  olCartShop.innerHTML = liCarrinho;
}
function DeleteItemCart(itemUUID) {
  localStorage.removeItem(itemUUID);
  window.location.reload();
}
function limparCarrinho() {
  localStorage.clear();
  window.location.reload();
}

function itemAdded(el) {
  document.getElementById(el).style.display = "block";
  setTimeout(() => {
    document.getElementById(el).style.display = "none";
  }, 700);
}

init();
