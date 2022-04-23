const loadProducts = function () {
  const page = document.body.id;
  if (page === "produtos") {
    const produtoDiv = document.getElementById("produto");
    produtoDiv.innerHTML = "<div> Texto </div>";
  }
};

loadProducts();
