class Storage{
    static getCartItems(){
        let cartItems = JSON.parse(localStorage.getItem('cart'));
        return cartItems;
    }
}

function createCart(){
    cart = Storage.getCartItems();
    setCartValues(cart);
    for ( let i = 0; i < cart.length; i++){
        addCartItem(cart[i])
    }
}

createCart();

function setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    for ( let i = 0; i < cart.length; i++){
        tempTotal += cart[i].total * cart[i].amount;
        itemsTotal += cart[i].amount;
    }
    document.getElementById("cart-total").innerHTML = formatToCurrency(tempTotal);
    document.getElementById("cart-amount").innerHTML = itemsTotal;
    document.getElementById("no-cart-items-cartPage").innerHTML = itemsTotal;
};

function addCartItem(item){
    const div = document.getElementById("cart-content-id");
    div.innerHTML += `<div class="cart-item">
    <img class="cart-img" src="./img/rocketthumbnail.png" alt="product"/>
    <div>
    <h4> Rocket </h4>
    <h5> ${formatToCurrency(item.total)} </h5>
    <h6> ${item.top.name}, ${item.middle.name} and ${item.bottom.name}.</h6>
    <span class = "remove-item" onclick="removeItem(${item.id})"> remove </span>
    </div>
    <div>
        <i class="fas fa-chevron-up cart-up-icon" onclick="increaseItem(${item.id})"></i>
        <p class="item-amount"> ${item.amount} </p>
        <i class="fas fa-chevron-down cart-down-icon" onclick="decreaseItem(${item.id})"> </i>
    </div>
    </div>
    `
}

function saveCart(cart){
    localStorage.cart = JSON.stringify(cart);
}

function clearCart(){
    cart = [];
    setCartValues(cart);
    document.getElementById("cart-content-id").innerHTML = "";
    saveCart(cart);
}

function increaseItem(id){
    cart = Storage.getCartItems();
    let idx = findIdx(cart, id);
    item = cart[idx];
    item.amount += 1;
    document.getElementById("cart-content-id").innerHTML = "";
    saveCart(cart);
    createCart();
}

function decreaseItem(id){
    cart = Storage.getCartItems();
    let idx = findIdx(cart, id);
    item = cart[idx];
    item.amount -= 1;
    if(item.amount > 0){
        document.getElementById("cart-content-id").innerHTML = "";
        saveCart(cart);
        createCart();
    } else {
        removeItem(id);
    }
    
}

function removeItem(id){
    cart = Storage.getCartItems();
    let idx = findIdx(cart, id);
    cart.splice(idx, 1);
    document.getElementById("cart-content-id").innerHTML = "";
    saveCart(cart);
    createCart();
}

function findIdx(cart, id){
    let idx = -1;
    for( let i = 0; i < cart.length; i++){
        if (cart[i].id == id){
            idx = i;
        }
    }
    return idx;
}

function proceedCheckout(){
    alert("You have succesfully placed an order. Your rockets will arrive shortly.");
    clearCart();
}