const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addresswarn = document.getElementById("address-warn")


let cart = [];

//Abrir modal

cartBtn.addEventListener("click", function () {
    updateCartModel()
    cartModal.style.display = "flex"
})

//fechar modal

cartModal.addEventListener("click", function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none"
    }
})

closeModalBtn.addEventListener("click", function () {
    cartModal.style.display = "none"
})

//buscar os produtos

menu.addEventListener("click", function (event) {

    let parentButton = event.target.closest(".add-to-cart-btn")
    if (parentButton) {
        const name = parentButton.getAttribute("data-name")
        const price = parentButton.getAttribute("data-price")

        addToCart(name, price)
    }
})

//adicionar no carrinho

//função para adicionar no carrinho

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name)

    if (existingItem) {
        existingItem.quantity += 1;

    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }
    updateCartModel()
}

function updateCartModel() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                    <p class="font-bold">${item.name}</p>
                        <p class="font-bold mt-1">QTD: ${item.quantity}</p>
                        <p class="font-bold mt-1">${Number(item.price).toFixed(2)}</p>
            </div>
                    <button class="remove-from-cart-btn" data-name="${item.name}">
                        Remover
                            </button>

        </div>
        `
        total += item.price * item.quantity

        cartItemsContainer.appendChild(cartItemElement)
    })
    cartTotal.textContent = total.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL"
    });
    //mudando o numero do footer
    cartCounter.innerHTML = cart.length;
}

//função para remover do carrinho

cartItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-from-cart-btn")) {
        const name = event.target.getAttribute("data-name")

        removeItemCart(name);
    }
})

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name);

    if (index !== -1) {
        const item = cart[index];

        if (item.quantity > 1) {
            item.quantity -= 1;
            updateCartModel();
            return;
        }
        cart.splice(index, 1);
        updateCartModel();
    }
}

//ENVIANDO ENDEREÇO 

addressInput.addEventListener("input", function (event) {
    let inputValue = event.target.value;
    if (inputValue !== "") {
        addressInput.classList.remove("border-red-500")
        addresswarn.classList.add("hidden")
    }
})

checkoutBtn.addEventListener("click", function () {
//finalizando pedido
const isOpen = checkRestauranteOpen();
if(!isOpen){
    Toastify({ //para um alert mais bonito 
        text: "No momento estamos fechados abriremos a partir das 18h",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
    return;
}


    if (cart.length === 0) return;
    if (addressInput.value === "") {
        addresswarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
    }
//enviar pedido com api whats

const cartItems = cart.map((item) => {
    return (
        ` ${item.name} | Quantidade: (${item.quantity}) | Preço: R$${item.price} \n`
    )
}).join("");

const message = encodeURIComponent(cartItems)
const phone = "#"

window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank");

cart = [];
updateCartModel();

})

//VEREIFICAR A HORA E MANIPULAR O CART


function checkRestauranteOpen() {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 23;
    //true = restaurante aberto
}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestauranteOpen();

if (isOpen) {
    spanItem.classList.remove("bg-red-500")
    spanItem.classList.add("bg-green-600")
} else {
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
}