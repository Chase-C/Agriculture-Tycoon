var createSellMenu = function(menus, farm, venue)
{
    var produce = venue.produceInDemand();
    var elements = [];
    elements.push(new Text(venue.name, 16, 16, 18));

    for (var i = 0; i < produce.length; i++) {
        var priceMid = Seeds.price[produce[i].type];
        var priceMin = 0.5 * priceMid;
        var priceMax = 2.0 * priceMid;

        var numText     = new Text(produce[i].num + ' ' + produce[i].name, 16, 68 + (i * 64), 14);
        var numSlider   = new Slider(190, 67 + (i * 64), 256, 22, 0, produce[i].num, produce[i].num, 5, null);
        var priceText   = new Text('Price: $' + Seeds.price[i], 16, 92 + (i * 64), 14);
        var priceSlider = new Slider(190, 93 + (i * 64), 256, 22, priceMin, priceMax, priceMid, 5, null);
        var offerButton = new Button(476, 74 + (i * 64), 96,  32, 'Offer', null);

        var numFunc = (function(t, name, f, button, num) {
            t.text = num + ' ' + name;
            if (num > f.cropAmount) {
                button.active = false;
            } else {
                button.active = true;
            }
        }).bind(this, numText, produce[i].name, farm, offerButton);


        var priceFunc = (function(t, price) {
            t.text = 'Price: $' + price;
        }).bind(this, priceText);

        var offerFunc = (function(m, f, v, p, n) {
            m.push(createOfferMenu(f, v, p.val, n.val));
        }).bind(this, menus, farm, venue, priceSlider, numSlider);

        numSlider.setCallback(numFunc);
        priceSlider.setCallback(priceFunc);
        offerButton.setCallback(offerFunc);

        elements.push(numText);
        elements.push(numSlider);
        elements.push(priceText);
        elements.push(priceSlider);

        if (farm.cropType != i || farm.cropAmount < numSlider.val) {
            offerButton.active = false;
        }
        elements.push(offerButton);
    }

    return new Menu(200, 122, 600, 400, elements);
}
