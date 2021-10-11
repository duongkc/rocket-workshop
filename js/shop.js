var totalPrice = 0;
var topIndex = 0;
var middleIndex = 0;
var bottomIndex = 0;

function order(){
    let inCart = false;
    // var price = document.getElementById("totalPriceValue").innerHTML;
    // Check if rocket already in cart
    for (let i = 0; i < cart.length; i++){
        if(json.rocket.top[topIndex] == cart[i].top){
            if(json.rocket.middle[middleIndex] == cart[i].middle){
                if(json.rocket.bottom[bottomIndex] == cart[i].bottom){
                    cart[i].amount += 1;
                    localStorage.cart = JSON.stringify(cart);
                    inCart = true;
                }
            }
        }
    }
    if (!inCart){
        let rocket = {};
        rocket.name = "Rocket";
        rocket.top = json.rocket.top[topIndex];
        rocket.middle = json.rocket.middle[middleIndex];
        rocket.bottom = json.rocket.bottom[bottomIndex];
        rocket.amount = 1; //Change later on with add/lower amount functions
        rocket.total = totalPrice;

        cart = [...cart, rocket]
        //localStorage.cart = JSON.stringify(rocket);
        localStorage.cart = JSON.stringify(cart);
        console.log(JSON.parse(localStorage.cart));
    }
    document.getElementById("no-cart-items").innerHTML = parseInt(document.getElementById("no-cart-items").innerHTML) + 1; 
    console.log("You have ordered the rocket at a price of "+ formatToCurrency(totalPrice) +"!");
}

function formatToCurrency(amount){
    var formatter = new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'EUR',
        // without decimals
        maximumFractionDigits: 0, 
        minimumFractionDigits: 0
    });
    return formatter.format(amount);
}