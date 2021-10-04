$(document).ready(function() {
    const jsonString = JSON.stringify(rocketData)
    const json = JSON.parse(jsonString);


    function loadTop() {
        let imageOutput = "";
        let optionOutput = "";
        $.each(json.rocket.top, function(){
            imageOutput += '<img class="rocket-bit bit-top" src=' + this.image + ' alt=' + this.name + ' />';
            optionOutput += '<div class="item-div item-top" price=' + this.price + ' > \n' + this.name + ' <br>' + formatToCurrency(this.price) + '\n</div>';
        });
        $('.rocket-top').append(imageOutput);
        // $('.bit-top')[0].style.visibility = "visible";
        $('.rocket-top').find("img:first").addClass("selected");
        $('.top-col').append(optionOutput);
        $('.top-col').find("div:first").addClass("selected");
    };

    function loadMiddle() {
        let imageOutput = "";
        let optionOutput = "";
        $.each(json.rocket.middle, function(){
            imageOutput += '<img class="rocket-bit bit-middle" src=' + this.image + ' alt=' + this.name + ' />';
            optionOutput += '<div class="item-div item-middle" price=' + this.price + ' > \n' + this.name + ' <br>' + formatToCurrency(this.price) + '\n</div>';
        });
        $('.rocket-middle').append(imageOutput);
        $('.rocket-middle').find("img:first").addClass("selected");
        $('.middle-col').append(optionOutput);
        $('.middle-col').find("div:first").addClass("selected");
    }

    function loadBottom() {
        let imageOutput = "";
        let optionOutput = "";
        $.each(json.rocket.bottom, function(){
            imageOutput += '<img class="rocket-bit bit-bottom" src=' + this.image + ' alt=' + this.name + ' />';
            optionOutput += '<div class="item-div item-bottom" price=' + this.price + ' > \n' + this.name + ' <br>' + formatToCurrency(this.price) + '\n</div>';
        });
        $('.rocket-bottom').append(imageOutput);
        $('.rocket-bottom').find("img:first").addClass("selected");
        $('.bottom-col').append(optionOutput);
        $('.bottom-col').find("div:first").addClass("selected");
    }

    function updatePrice(){
        let total = 0;
        $('.option-rows').find('.selected').each(function(){
            if(!isNaN($(this).attr("price"))) {
                total += parseInt($(this).attr("price"));
            };
        });
        totalPrice = total;
        $('#totalPriceValue').html(formatToCurrency(total));

    }

    loadTop();
    loadMiddle();
    loadBottom();
    updatePrice();

    // // json test
    // var jtest = {};
    // jtest.something = {};
    // lala = JSON.stringify(jtest);
    // console.log(lala)
    

    class PartSwitcher {
        constructor(parts, items, i) {
            i = 0;

            this.Next = function () {
                hideCurrentPart();
                i++;
                showNextPart();
            };

            this.Previous = function () {
                hideCurrentPart();
                i--;
                showPreviousPart();
            };

            function hideCurrentPart() {
                if (parts) {
                    parts[i].classList.remove("selected");
                    items[i].classList.remove("selected");

                }
            }

            function showNextPart() {
                if (parts) {
                    if (i == (parts.length)) {
                        i = 0;
                    }
                    parts[i].classList.add("selected");
                    items[i].classList.add("selected")
                    
                    var oldIdx = i - 1;
                    if (i == 0){
                        oldIdx = parts.length - 1;
                    }
                    updatePrice();
                }
            }

            function showPreviousPart() {
                if (parts) {
                    var oldIdx = i + 1;
                    if (i < 0) {
                        i = parts.length - 1;
                    }
                    parts[i].classList.add("selected");
                    items[i].classList.add("selected");
                    
                    updatePrice();
                }
            }
        }
    }

    var top = $(".bit-top");
    var middle = $(".bit-middle");
    var bottom = $(".bit-bottom");
    var topItems = $('.item-top');
    var middleItems = $('.item-middle');
    var bottomItems = $('.item-bottom');

    var topPicker = new PartSwitcher(top, topItems);
    $('#prev_top_button').click(function() {
        topPicker.Previous();
    });
    $('#next_top_button').click(function() {
        topPicker.Next();
    });

    var middlePicker = new PartSwitcher(middle, middleItems);
    $('#prev_middle_button').click(function() {
        middlePicker.Previous();
    });
    $('#next_middle_button').click(function() {
        middlePicker.Next();
    });

    var bottomPicker = new PartSwitcher(bottom, bottomItems);
    $('#prev_bottom_button').click(function() {
        bottomPicker.Previous();
    });
    $('#next_bottom_button').click(function() {
        bottomPicker.Next();
    });
});

