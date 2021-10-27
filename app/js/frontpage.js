function moveDown(){
    $(window).scrollTop($(".hero").height());
}

function loadProducts(products) {
    let productCode = "";
    $.each(products, function() {
        productCode += `
            <article class="product">
            <a class="nounderline" href="rocket.html?id=${this.id}" >
                <div class="img-container">
                    
                        <img
                        src=${this.thumbnail}
                        alt="product"
                        class="product-img"/>
                    
                </div>
                <h3>${this.name}</h3>
                </a>
                
            </article>
        `
    })
    $('.products-center').append(productCode);
}

function fetchProducts() {

    let url = "https://spaceshop-backend.azurewebsites.net/maininfo"
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        data: {},
        success: function (data) {
            loadProducts(data);
        },
        error: function(xhr, desc, err) {
            console.log("Failed to retrieve data from DB");
        }
    });
}


$(document).ready(function() {
    fetchProducts();
});