// Variables
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
var totalPrice = 0;
var topIndex = 0;
var middleIndex = 0;
var bottomIndex = 0;
let cart = [];

// UI that displays cart items
class UI {
    order() {
        let inCart = false;
        // Check if rocket already in cart
        for (let i = 0; i < cart.length; i++){
            if(json.rocket.top[topIndex].name == cart[i].top.name 
                && json.rocket.middle[middleIndex].name == cart[i].middle.name
                && json.rocket.bottom[bottomIndex].name == cart[i].bottom.name){
                    cart[i].amount += 1;
                    Storage.saveCart(cart);
                    $('.item-amount[data-id='+ cart[i].id +']').text(cart[i].amount);
                    inCart = true;
                    this.setCartValues(cart);
                    this.showCart();
            }
        }
        if (!inCart){
            let rocket = {};
            if(cart.length > 0) {
                rocket.id = cart[cart.length - 1].id + 1;
            } else {
                rocket.id = 0;
            }  
            rocket.name = json.rocket.name;
            rocket.top = json.rocket.top[topIndex];
            rocket.middle = json.rocket.middle[middleIndex];
            rocket.bottom = json.rocket.bottom[bottomIndex];
            rocket.thumbnail = json.rocket.thumbnail;
            rocket.amount = 1;
            rocket.total = totalPrice;
            // Add new rocket to the cart
            cart = [...cart, rocket]
            // Save cart in local storage
            Storage.saveCart(cart);
            // add to DOM
            this.setCartValues(cart);
            this.addCartItem(rocket);
            this.showCart();
        }
    }
    setCartValues(cart) {
        let priceTotal = 0;
        let itemsTotal = 0;
        // Goes through each item in cart / AKA foreach method
        cart.map(item => {
            priceTotal += item.total * item.amount;
            itemsTotal += item.amount;
        });
        cartTotal.innerText = formatToCurrency(priceTotal);
        cartItems.innerText = itemsTotal;
    }
    addCartItem(item) {
        const div = document.createElement('div');
        div.classList.add("cart-item");
        div.innerHTML = `<!-- cart item -->
                <!-- item image -->
                <div class="cart-thumbnail">
                    <img src=${item.top.thumbnail} alt="product" />
                    <img src=${item.middle.thumbnail} alt="product" />
                    <img src=${item.bottom.thumbnail} alt="product" />
                </div>
                <!-- item info -->
                <div>
                    <h4>${item.name}</h4>
                    <ul class="item-specs">
                        <li>${item.top.name}</li>
                        <li>${item.middle.name}</li>
                        <li>${item.bottom.name}</li>
                    </ul>
                    <h4 class="cart-item-value">`+ formatToCurrency(item.total) +`</h4>
                    <span class="remove-item" data-id=${item.id}>Remove <i class="far fa-trash-alt"></i></span>
                </div>
                <!-- item functionality -->
                <div>
                    <i class="fas fa-chevron-up cart-up-icon" data-id=${item.id}></i>
                    <h5 class="item-amount" data-id=${item.id}>
                    ${item.amount}
                    </h5>
                    <i class="fas fa-chevron-down cart-down-icon" data-id=${item.id}></i>
                </div>
                <!-- cart item -->
        `;
        cartContent.append(div);
    }
    showCart() {
        cartOverlay.classList.add("transparentBcg");
        cartDOM.classList.add("showCart");
    }
    setupAPP() {
        cart = Storage.getCart();
        this.setCartValues(cart);
        this.populateCart(cart);
        $('#orderButton').on('click', () => {
            this.order();
        })
        cartBtn.addEventListener('click', this.showCart);
        closeCartBtn.addEventListener('click', this.hidecart);
        cartOverlay.addEventListener('click', this.hidecart);
        $('.cart').click(function(event){
            event.stopPropagation(); // prevents executing the above event
        });
    }
    populateCart(cart) {
        cart.forEach(item => this.addCartItem(item));
    }
    hidecart() {
        cartOverlay.classList.remove("transparentBcg");
        cartDOM.classList.remove("showCart");
    }
    cartLogic() {
        clearCartBtn.addEventListener('click', () => {
            this.clearCart();
        });
        cartContent.addEventListener('click', event => {
            // If clicked on 'remove' button
            if (event.target.classList.contains("remove-item") || $(event.target).parent('.remove-item').length) {
                if(event.target.classList.contains("remove-item")) {
                    var removeItem = event.target;
                } else {
                    var removeItem = $(event.target).parent().get(0);
                }
                
                let id = removeItem.dataset.id;
                cart = cart.filter(item => parseInt(item.id) !== parseInt(id));
                this.setCartValues(cart);
                Storage.saveCart(cart);
                cartContent.removeChild(removeItem.parentElement.parentElement);
            } // If up amount
            else if (event.target.classList.contains("cart-up-icon")) {
                let addAmount = event.target;
                let id = addAmount.dataset.id;
                // Also updates cart variable
                let tempItem = cart.find(item => item.id === parseInt(id));
                tempItem.amount = tempItem.amount + 1;
                Storage.saveCart(cart);
                this.setCartValues(cart);
                addAmount.nextElementSibling.innerText = tempItem.amount;
            } // If lower amount
            else if (event.target.classList.contains("cart-down-icon")) {
                let lowerAmount = event.target;
                let id = lowerAmount.dataset.id;
                let tempItem = cart.find(item => item.id === parseInt(id));
                tempItem.amount = tempItem.amount - 1;
                if (tempItem.amount > 0) {
                    Storage.saveCart(cart);
                    this.setCartValues(cart);
                    lowerAmount.previousElementSibling.innerText = tempItem.amount;
                } // else remove item from list entirely
                else {
                cart = cart.filter(item => item.id !== parseInt(id));
                Storage.saveCart(cart);
                this.setCartValues(cart);
                cartContent.removeChild(lowerAmount.parentElement.parentElement);
                }
            }
        })
    }
    clearCart() {
        cart = [];
        this.setCartValues(cart);
        Storage.saveCart(cart);
        while(cartContent.firstChild) {
            cartContent.removeChild(cartContent.lastChild);
        }
    }
}


// local storage
class Storage {
    static getCart() {
        return localStorage.cart 
            ? JSON.parse(localStorage.cart) // If success
            : []; // If fail
    }
    static saveCart(cart) {
        localStorage.cart = JSON.stringify(cart);
    }
}

$(document).ready(function() {
    const ui = new UI();
    ui.setupAPP();
    ui.cartLogic();
});