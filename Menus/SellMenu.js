var createSellMenu = function(farm, venue)
{
    var produce = venue.produceInDemand();
    var elements = [];
    elements.push(new Text(venue.name, 16, 16, 18));

    for (var i = 0; i < produce.length; i++) {
        var numText = new Text(produce[i].num + ' ' + produce[i].name, 8, 48 + (i * 64), 14);
        var numFunc = (function(t, name, num) {
            t.text = num + ' ' + name
        }).bind(this, numText, produce[i].name);

        elements.push(numText);
        elements.push(new Slider(256, 47 + (i * 64), 256, 22, 0, produce[i].num, produce[i].num, 5, numFunc));

        var priceText = new Text('Price: $' + Seeds.price[i], 8, 72 + (i * 64), 14);
        var priceFunc = (function(t, price) {
            t.text = 'Price: $' + price;
        }).bind(this, priceText);

        elements.push(priceText);

        var priceMid = Seeds.price[produce[i].type];
        var priceMin = 0.5 * priceMid;
        var priceMax = 2.0 * priceMid;
        elements.push(new Slider(256, 73 + (i * 64), 256, 22, priceMin, priceMax, priceMid, 5, priceFunc));
    }

    return new Menu(200, 40, 600, 520, elements);
}
