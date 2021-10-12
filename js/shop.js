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