var createSellMenu = function(farm, venue)
{
    var produce = venue.produceInDemand();
    var elements = [];
    elements.push(new Text(venue.name, 16, 16, 18));

    for (var i = 0; i < produce.length; i++) {
        elements.push(new Text(produce[i].num + ' ' + produce[i].name, 16, 48 + (i * 64), 14));

        var priceText = new Text('Price: $' + Seeds.price[i], 16, 66 + (i * 64), 14);
        var priceFunc = (function(t, price) {
            t.text = 'Price: $' + price;
        }).bind(this, priceText);

        elements.push(priceText);
        elements.push(new Slider(96, 66 + (i * 64), 128, 32, 1, 10, 5, 1, priceFunc));
    }

    return new Menu(128, 64, 256, 512, elements);
}
