function sayHello(){
    console.log("Hellooo")
}
var totalPrice = 0;
var topIndex = 0;
var middleIndex = 0;
var bottomIndex = 0;


function order(){
    // var price = document.getElementById("totalPriceValue").innerHTML;

    let rocket = {};
    rocket.name = "Rocket";
    rocket.top = json.rocket.top[topIndex];
    rocket.middle = json.rocket.middle[middleIndex];
    rocket.bottom = json.rocket.bottom[bottomIndex];
    rocket.amount = 1; //Change later on with add/lower amount functions
    rocket.total = totalPrice;

    localStorage.cart = JSON.stringify(rocket);
    console.log(JSON.parse(localStorage.cart));

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