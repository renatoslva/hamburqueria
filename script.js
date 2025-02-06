
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
    cart.push({
    name,
    price,
    quantity: 1,
})
}
