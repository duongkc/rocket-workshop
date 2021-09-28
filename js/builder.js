$(document).ready(function() {

    class PartSwitcher {
        constructor(parts, i) {
            i = 0;

            this.Next = function () {
                hideCurrentPart();
                i++;
                console.log(i)
                showNextPart();
                updatePrice();
            };

            this.Previous = function () {
                hideCurrentPart();
                i--;
                console.log(i)
                showPreviousPart();
                updatePrice();
            };

            function hideCurrentPart() {
                if (parts) {
                    parts[i].style.visibility = "hidden";

                }
            }

            function showNextPart() {
                if (parts) {
                    if (i == (parts.length)) {
                        i = 0;
                    }
                    parts[i].style.visibility = "visible";
                }
            }

            function showPreviousPart() {
                if (parts) {
                    if (i < 0) {
                        i = parts.length - 1;
                    }
                    parts[i].style.visibility = "visible";
                }
            }

            function updatePrice(){
                var newPrice = parseFloat(document.getElementById("totalPriceValue").innerHTML) + 10;
                document.getElementById("totalPriceValue").innerHTML = newPrice;
            }
        }
    }

    var top = $(".bit-top");
    var middle = $(".bit-middle");
    var bottom = $(".bit-bottom");

    var topPicker = new PartSwitcher(top);
    $('#prev_top_button').click(function() {
        topPicker.Previous();
    });
    $('#next_top_button').click(function() {
        topPicker.Next();
    });

    var middlePicker = new PartSwitcher(middle);
    $('#prev_middle_button').click(function() {
        middlePicker.Previous();
    });
    $('#next_middle_button').click(function() {
        middlePicker.Next();
    });

    var bottomPicker = new PartSwitcher(bottom);
    $('#prev_bottom_button').click(function() {
        bottomPicker.Previous();
    });
    $('#next_bottom_button').click(function() {
        bottomPicker.Next();
    });
});

