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

    cart.splice(index, 1);
    updateCartModel();
  }
} //ENVIANDO ENDEREÇO 


addressInput.addEventListener("input", function (event) {
  var inputValue = event.target.value;

  if (inputValue !== "") {
    addressInput.classList.remove("border-red-500");
    addresswarn.classList.add("hidden");
  }
});
checkoutBtn.addEventListener("click", function () {
  //finalizando pedido
  var isOpen = checkRestauranteOpen();

  if (!isOpen) {
    Toastify({
      //para um alert mais bonito 
      text: "No momento estamos fechados abriremos a partir das 18h",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      // `top` or `bottom`
      position: "center",
      // `left`, `center` or `right`
      stopOnFocus: true,
      // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)"
      },
      onClick: function onClick() {} // Callback after click

    }).showToast();
    return;
  }

  if (cart.length === 0) return;

  if (addressInput.value === "") {
    addresswarn.classList.remove("hidden");
    addressInput.classList.add("border-red-500");
    return;
  } //enviar pedido com api whats


  var cartItems = cart.map(function (item) {
    return " ".concat(item.name, " | Quantidade: (").concat(item.quantity, ") | Pre\xE7o: R$").concat(item.price, " \n");
  }).join("");
  var message = encodeURIComponent(cartItems);
  var phone = "#";
  window.open("https://wa.me/".concat(phone, "?text=").concat(message, " Endere\xE7o: ").concat(addressInput.value), "_blank");
  cart = [];
  updateCartModel();
}); //VEREIFICAR A HORA E MANIPULAR O CART

function checkRestauranteOpen() {
  var data = new Date();
  var hora = data.getHours();
  return hora >= 18 && hora < 23; //true = restaurante aberto
}

var spanItem = document.getElementById("date-span");
var isOpen = checkRestauranteOpen();

if (isOpen) {
  spanItem.classList.remove("bg-red-500");
  spanItem.classList.add("bg-green-600");
} else {
  spanItem.classList.remove("bg-green-600");
  spanItem.classList.add("bg-red-500");
}