const starsTotal = 5;

function calculateAverage(reviews) {
    let length = reviews.length;
    let sum = 0;
    $.each(reviews, function(){
        sum += this.rating;
    });
    let average = sum / length;
    return average.toFixed(1);
}

function getStarRating(rating) {
    // Get percentage
    const starPercentage = (rating / starsTotal) * 100;

    // Round to nearest 10
    const starPRounded = `${Math.round(starPercentage / 10) * 10}%`;
    return starPRounded;
}

function generateMainRating(reviews) {
    let average = calculateAverage(reviews);
    let rating = getStarRating(average);
    // Set width of stars-inner to percentage
    $(".main-rating .stars-inner").width(rating);
    // Add number rating
    $(".main-rating .number-rating").html(average);
    $(".main-rating .review-amount").html(reviews.length)
}

function loadReviews(reviews) {
    let reviewcCode = "";
    $.each(reviews, function() {
        let prosList = "";
        let consList = "";
        $.each(this.pros, function() {
            prosList += `<li>${this.text}</li>`
        });
        $.each(this.cons, function(){
            consList += `<li>${this.text}</li>`
        })
        reviewcCode += `
        <div class="product-review">
            <div class="product_review_header">
                <div class="star-rating">
                    <div class="stars-outer">
                        <div class="stars-inner" style="width: ${getStarRating(this.rating)}"></div>
                    </div>
                </div>
                <div class="product-review-title">${this.title}</div>
            </div>
            <div class="product-review-metadata">
                <div class="review-user metadata-item">${this.user}</div>
                <div class="review-date metadata-item">${this.date}</div>
            </div>
            <div class="row pros-and-cons">
                <div class="col pros-col">
                    <ul class="pros-list procon-list">
                        ${prosList}
                    </ul>
                </div>
                <div class="col cons-col">
                    <ul class="cons-list procon-list">
                        ${consList}
                    </ul>
                </div>
            </div>
            <div class="review-description">
                ${this.description}
            </div>
        </div>`
    });
    $(".product-reviews").append(reviewcCode);
}

function generateReviews() {
    let reviews = json.rocket.review;
    generateMainRating(reviews);
    loadReviews(reviews);
}