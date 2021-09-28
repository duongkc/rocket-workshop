$(document).ready(function() {

    class PartSwitcher {
        constructor(parts, prices, partType, i) {
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
                    parts[i].style.visibility = "hidden";

                }
            }

            function showNextPart() {
                if (parts) {
                    if (i == (parts.length)) {
                        i = 0;
                    }
                    parts[i].style.visibility = "visible";
                    
                    var oldIdx = i - 1;
                    if (i == 0){
                        oldIdx = parts.length - 1;
                    }
                    updatePrice(oldIdx, i);
                    removeBorder(oldIdx, partType);
                    showBorder(i, partType);

                }
            }

            function showPreviousPart() {
                if (parts) {
                    var oldIdx = i + 1;
                    if (i < 0) {
                        i = parts.length - 1;
                    }
                    parts[i].style.visibility = "visible";
                    
                    updatePrice(oldIdx, i);
                    removeBorder(oldIdx, partType);
                    showBorder(i, partType);
                }
            }


            function updatePrice(oldIdx, newIdx){
                var newPrice = parseFloat(document.getElementById("totalPriceValue").innerHTML) - prices[oldIdx] + prices[newIdx];
                document.getElementById("totalPriceValue").innerHTML = newPrice;
            }

            function showBorder(idx, part){
                var divID = colours[idx] + part + "Div";
                document.getElementById(divID).style = "border: 1px black solid";    
            }
            
            function removeBorder(idx, part){
                var divID = colours[idx] + part + "Div";
                document.getElementById(divID).style = "";    
            }
           
        }
    }

    colours = ["yellow", "red", "blue"]
    var prices_top = [100000, 250000, 50000];
    var prices_middle = [500000, 750000, 350000];
    var prices_bottom = [400000, 500000, 250000];
    var top = $(".bit-top");
    var middle = $(".bit-middle");
    var bottom = $(".bit-bottom");

    var topPicker = new PartSwitcher(top, prices_top, "Top");
    $('#prev_top_button').click(function() {
        topPicker.Previous();
    });
    $('#next_top_button').click(function() {
        topPicker.Next();
    });

    var middlePicker = new PartSwitcher(middle, prices_middle, "Middle");
    $('#prev_middle_button').click(function() {
        middlePicker.Previous();
    });
    $('#next_middle_button').click(function() {
        middlePicker.Next();
    });

    var bottomPicker = new PartSwitcher(bottom, prices_bottom, "Bottom");
    $('#prev_bottom_button').click(function() {
        bottomPicker.Previous();
    });
    $('#next_bottom_button').click(function() {
        bottomPicker.Next();
    });
});

