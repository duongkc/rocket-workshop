function sayHello(){
    console.log("Hellooo")
}

function order(){
    var price = document.getElementById("totalPriceValue").innerHTML;
    var formatter = new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'EUR',
        // without decimals
        maximumFractionDigits: 0, 
        minimumFractionDigits: 0
    });
    
    alert("You have ordered the rocket at a price of "+ formatter.format(price) +"!");
}