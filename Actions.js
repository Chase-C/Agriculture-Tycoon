var actionBuyWater = new Action('Buy Water', 1, -10, 100, null);

/*var actionBuyShovel = new Action('Buy Shovel', 1, -itemShovel.price, 0, function(farm) {
    farm.addItem(itemShovel);
});*/

var actionPayTaxes = new Action('Pay Taxes', 2, 0, 0, function(farm) {
    farm.payTaxes();
});

var actionSleep = new Action('Sleep', 0, 0, 0, null);
