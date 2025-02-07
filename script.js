
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

cartBtn.addEventListener("click", function(){
    updateCartModel()
    cartModal.style.display = "flex"
})

//fechar modal

cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display ="none"
    }
})

closeModalBtn.addEventListener("click", function(){
    cartModal.style.display ="none"
})

//buscar os produtos

menu.addEventListener("click", function(event){

    let parentButton = event.target.closest(".add-to-cart-btn")
    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parentButton.getAttribute("data-price")
        
        addToCart(name, price)
    }
})

//adicionar no carrinho

//função para adicionar no carrinho

function addToCart(name, price){
    const existingItem = cart.find(item => item.name === name)

        if(existingItem){
            existingItem.quantity += 1;
        
        }else{
            cart.push({
                name,
                price,
                quantity: 1,
            })
        }
        updateCartModel()
}

function updateCartModel(){
    cartItemsContainer.innerHTML = "";
    let total = 0;
    
    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML =`
        <div class="flex items-center justify-between">
            <div>
                    <p class="font-bold">${item.name}</p>
                        <p class="font-bold mt-1">QTD: ${item.quantity}</p>
                        <p class="font-bold mt-1">${Number(item.price).toFixed(2)}</p>
            </div>
                    <button>
                        Remover
                            </button>

        </div>
        `
            total += item.price * item.quantity

        cartItemsContainer.appendChild(cartItemElement)
    })
        cartTotal.textContent = total.toLocaleString("pt-br",{
            style: "currency",
            currency: "BRL"
        });
//mudando o numero do footer
        cartCounter.innerHTML = cart.length;
}

//função para remover do carrinho

cartItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")

        removeItemCart(name):
    }
})

