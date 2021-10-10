
class Storage{
    static getCartItems(){
        let cartItems = JSON.parse(localStorage.getItem('cart'));
        return cartItems;
    }
}

function setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    for ( let i = 0; i < cart.length; i++){
        tempTotal += cart[i].total;
        itemsTotal += cart[i].amount;
    }
    document.getElementById("cart-total").innerHTML = formatToCurrency(tempTotal);
    document.getElementById("cart-amount").innerHTML = itemsTotal;
};

function addCartItem(item){
    const div = document.getElementById("cart-content-id");
    div.innerHTML += `
    <img class="cart-img" src="./img/rocket.jfif" alt="product"/>
    <div>
    <h4> Rocket </h4>
    <h5> ${formatToCurrency(item.total)} </h5>
    <span class = "remove-item"> remove </span>
    </div>
    <div>
        <i class="fas fa-chevron-up"></i>
        <p class="item-amount"> ${item.amount} </p>
        <i class="fas fa-chevron-down"> </i>
    </div>
    `
}

function createCart(){
    cart = Storage.getCartItems();
    setCartValues(cart);
    for ( let i = 0; i < cart.length; i++){
        addCartItem(cart[i])
    }
}

createCart();