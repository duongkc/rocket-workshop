function sayHello(){
    console.log("Hellooo")
}
var totalPrice = 0;



function order(){
    var price = document.getElementById("totalPriceValue").innerHTML;

    
    alert("You have ordered the rocket at a price of "+ formatToCurrency(totalPrice) +"!");
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