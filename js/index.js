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

function loadProductsPage() {
  const itemStoredID = getItemStoredID();
  console.log("estou na pagina de produto");
  const productDetails = document.getElementById("produtoDetails");
  console.log(productDetails);
  productDetails.innerHTML = `<div> ${itemStoredID} </div>`;
}

function storeItemSelected(itemSelected) {
  var item = itemSelected;
  clearItemSelected();
  if (!sessionStorage.getItem("itemSelected")) {
    sessionStorage.setItem("itemSelected", item);
  }

  return true;
}
function getItemStoredID() {
  const itemStoredID = sessionStorage.getItem("itemSelected");
  console.log(sessionStorage.getItem("itemSelected"));
  return itemStoredID;
}

function clearItemSelected() {
  sessionStorage.removeItem("itemSelected");
}

init();
