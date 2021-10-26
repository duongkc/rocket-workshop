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
    if(document.getElementById("shipping-cost").innerHTML != " "){
        calcShippingCost(document.getElementById("dropbtn").innerHTML);
    }
    
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
    if(document.getElementById("shipping-cost").innerHTML == " "){
        alert("Please first select a planet to ship your order to.")
    } else {
        alert("You have succesfully placed an order. Your rockets will arrive shortly.");
        clearCart();
    }
    
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("select-location-btn");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = "./img/planet-map.png";
  captionText.innerHTML = `Please select your home planet*: 
  <div class="dropdown">
      <button class="dropbtn" id="dropbtn">Select your planet...</button>
      <div class="dropdown-content">
          <a onclick="selectPlanet(this.innerHTML)">A</a>
          <a onclick="selectPlanet(this.innerHTML)">B</a>
          <a onclick="selectPlanet(this.innerHTML)">C</a>
          <a onclick="selectPlanet(this.innerHTML)">D</a>
          <a onclick="selectPlanet(this.innerHTML)">E</a>
          <a onclick="selectPlanet(this.innerHTML)">F</a>
          <a onclick="selectPlanet(this.innerHTML)">G</a>
          <a onclick="selectPlanet(this.innerHTML)">H</a>
          <a onclick="selectPlanet(this.innerHTML)">I</a>
          <a onclick="selectPlanet(this.innerHTML)">J</a>
      </div>
  </div> 
  <button class="confirm-btn" onclick="confirmLocation()"> confirm </button> <br>
  <div>
  *: If your home planet cannot be found in this list, we are sorry to inform you that our current shipping policy does not include shipment to your planet.`;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
}

function selectPlanet(planet){
    let button = document.getElementById("dropbtn");
    const buttonWidth = button.offsetWidth;
    button.innerHTML = planet;
    button.style.width = `${buttonWidth}px`;
}

function confirmLocation(){
    planet = document.getElementById("dropbtn").innerHTML;
    shortestPath(planet);
    calcShippingCost(planet);
    modal.style.display = "none"
}
// Shipping cost part
function calcShippingCostv0(planet){
    let cost = 0;
    let pathVar = "test";
    if(planet != "F"){

        pathVar = document.getElementById("shipping-path").innerHTML;
        console.log((pathVar.match(/>/g)||[]).length);
    }
    let cartCost = Number(document.getElementById("cart-total").innerHTML.replace(/[^0-9.-]+/g,""));
    document.getElementById("shipping-cost").innerHTML = formatToCurrency(cost);
    document.getElementById("total-cost-incl").innerHTML = formatToCurrency(cost + cartCost);
}

function calcShippingCost(planet){
    let cost = 0;
    let pathVar = "test";
    if(planet != "F"){
        var start = "F";
        var eind = planet;
        var url = "https://spacetruckers2.azurewebsites.net/GetPath?from=" + start + "&to=" + eind;
        console.log(url);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) { 
                pathVar = xhr.responseText;
                cost = (pathVar.match(/>/g)||[]).length * 15000;
                let cartCost = Number(document.getElementById("cart-total").innerHTML.replace(/[^0-9.-]+/g,""));
                document.getElementById("shipping-cost").innerHTML = formatToCurrency(cost);
                document.getElementById("total-cost-incl").innerHTML = formatToCurrency(cost + cartCost);
            }
         }
        xhr.open("GET", url, true);
        xhr.send(); 
    } else {
        document.getElementById("shipping-cost").innerHTML = formatToCurrency(0);
        document.getElementById("total-cost-incl").innerHTML = document.getElementById("cart-total").innerHTML;
    }
}


function shortestPath(eind) {
    var start = "F";
    var url = "https://spacetruckers2.azurewebsites.net/GetPath?from=" + start + "&to=" + eind;
    console.log(url);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { 
            var div = document.getElementById("shipping-path");
            div.innerHTML = xhr.responseText;
            result = div.innerHTML;
        }
    }
    xhr.open("GET", url, true);
    xhr.send();
}