const allrating = 3.6;

const starsTotal = 5;


function calculateAverage(reviews) {
    let length = reviews.length;
    let sum = 0;
    let average = 0;
    $.each(reviews, function(){
        sum += this.price;
    });
    return average;
}

function getStarRating(rating) {
    // Get percentage
    const starPercentage = (rating / starsTotal) * 100;

    // Round to nearest 10
    const starPRounded = `${Math.round(starPercentage / 10) * 10}%`;

    // Set width of stars-inner to percentage
    $(".main-rating .stars-inner").width(starPRounded);
    // Add number rating
    $(".main-rating .number-rating").html(rating);
    return starPRounded;
}


$(document).ready(function() {
    getStarRating(allrating);


});