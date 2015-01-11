var createCropsMenu = function(farm)
{
    var elements = [];
    elements.push(new Text('Crops', 16, 16, 18));

    for (var i = 0; i < Seeds.name.length; i++) {
        elements.push(new Text(Seeds.name[i], 16, 60 + (i * 64), 14));
        elements.push(new Text('. . .  ' + farm.cropAmount[i].toFixed(0), 180, 60 + (i * 64), 14));
        
        var spoiled = Seeds.spoilPercent[i] * farm.cropAmount[i];
        var text = 'About ' + spoiled.toFixed(0) + ' will spoil in the next 24 hours.';
        elements.push(new Text(text, 32, 84 + (i * 64), 14));
    }

    return new Menu(320, 112, 360, 400, elements);
}
