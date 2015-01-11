var createOfferMenu = function(farm, venue, price, num)
{
    var elements = [];

    var willBuy = venue.willBuy(farm.cropType, price, num);
    var text1   = '';
    var text2   = '';

    if (willBuy) {
        text1 =  venue.name + ' agrees to purchase';
        text2 =  num + ' ' + Seeds.name[farm.cropType] + ' at $' + price + ' per unit.';

        farm.cropAmount -= num;
        farm.money      += price * num;
        farm.income     += price * num;

        venue.numProduce[farm.cropType] += num;

        advanceTime(2);
    } else {
        text1 =  venue.name + ' rejects your offer of';
        text2 =  num + ' ' + Seeds.name[farm.cropType] + ' for $' + price + ' per unit.';
    }

    elements.push(new Text(text1, 16, 16, 14));
    elements.push(new Text(text2, 16, 40, 14));

    return new Menu(330, 252, 340, 140, elements, true);
}
