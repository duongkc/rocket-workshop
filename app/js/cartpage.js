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
    document.getElementById("dropbtn").innerHTML = planet;
}

function confirmLocation(){
    planet = document.getElementById("dropbtn").innerHTML;
    calcShippingCost(planet);
    modal.style.display = "none"
}
// Shipping cost part
var homePlanet = "F";
function calcShippingCost(planet){
    let cost = 0;
    if(planet != homePlanet){
        var eind = planet;
        var url = "https://spacetruckers2.azurewebsites.net/GetPath?from=" + homePlanet + "&to=" + eind;
        console.log(url);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) { 
                // Set shipping path
                var div = document.getElementById("shipping-path");
                var response = xhr.responseText.split("\"");
                div.innerHTML = "";
                for (let i = 3; i < response.length - 2; i += 2){
                    div.innerHTML += response[i] + " -> ";
                }
                div.innerHTML += response[response.length - 2];
                
                // Calculate shipping cost
                var pathLength = response[1];
                cost = pathLength * 5000;
                let cartCost = Number(document.getElementById("cart-total").innerHTML.replace(/[^0-9.-]+/g,""));
                document.getElementById("shipping-cost").innerHTML = formatToCurrency(cost);
                document.getElementById("total-cost-incl").innerHTML = formatToCurrency(cost + cartCost);
            }
         }
        xhr.open("GET", url, true);
        xhr.send(); 
    } else {
        document.getElementById("shipping-path").innerHTML = homePlanet;
        document.getElementById("shipping-cost").innerHTML = formatToCurrency(0);
        document.getElementById("total-cost-incl").innerHTML = document.getElementById("cart-total").innerHTML;
    }
}
