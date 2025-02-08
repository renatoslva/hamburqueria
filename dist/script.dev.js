"use strict";

var menu = document.getElementById("menu");
var cartBtn = document.getElementById("cart-btn");
var cartModal = document.getElementById("cart-modal");
var cartItemsContainer = document.getElementById("cart-items");
var cartTotal = document.getElementById("cart-total");
var checkoutBtn = document.getElementById("checkout-btn");
var closeModalBtn = document.getElementById("close-modal-btn");
var cartCounter = document.getElementById("cart-count");
var addressInput = document.getElementById("address");
var addresswarn = document.getElementById("address-warn");
var cart = []; //Abrir modal

cartBtn.addEventListener("click", function () {
  updateCartModel();
  cartModal.style.display = "flex";
}); //fechar modal

cartModal.addEventListener("click", function (event) {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
});
closeModalBtn.addEventListener("click", function () {
  cartModal.style.display = "none";
}); //buscar os produtos

menu.addEventListener("click", function (event) {
  var parentButton = event.target.closest(".add-to-cart-btn");

  if (parentButton) {
    var name = parentButton.getAttribute("data-name");
    var price = parentButton.getAttribute("data-price");
    addToCart(name, price);
  }
}); //adicionar no carrinho
//função para adicionar no carrinho

function addToCart(name, price) {
  var existingItem = cart.find(function (item) {
    return item.name === name;
  });

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  updateCartModel();
}

function updateCartModel() {
  cartItemsContainer.innerHTML = "";
  var total = 0;
  cart.forEach(function (item) {
    var cartItemElement = document.createElement("div");
    cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");
    cartItemElement.innerHTML = "\n        <div class=\"flex items-center justify-between\">\n            <div>\n                    <p class=\"font-bold\">".concat(item.name, "</p>\n                        <p class=\"font-bold mt-1\">QTD: ").concat(item.quantity, "</p>\n                        <p class=\"font-bold mt-1\">").concat(Number(item.price).toFixed(2), "</p>\n            </div>\n                    <button class=\"remove-from-cart-btn\" data-name=\"").concat(item.name, "\">\n                        Remover\n                            </button>\n\n        </div>\n        ");
    total += item.price * item.quantity;
    cartItemsContainer.appendChild(cartItemElement);
  });
  cartTotal.textContent = total.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL"
  }); //mudando o numero do footer

  cartCounter.innerHTML = cart.length;
} //função para remover do carrinho


cartItemsContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    var name = event.target.getAttribute("data-name");
    removeItemCart(name);
  }
});

function removeItemCart(name) {
  var index = cart.findIndex(function (item) {
    return item.name === name;
  });

  if (index !== -1) {
    var item = cart[index];

    if (item.quantity > 1) {
      item.quantity -= 1;
      updateCartModel();
      return;
    }
  }
}