var createInventoryMenu = function(farm)
{
    var elements = [];
    elements.push(new Text('Inventory', 16, 16, 18));

    var inv = [farm.tools.shovel.held, farm.tools.tractor.held, farm.seeds.lettuce, farm.seeds.apple,
               farm.seeds.strawberry, farm.seeds.brussel, farm.seeds.artichoke, farm.pesticide,
               farm.fertilizer, 1];

    for (var i = 0; i < farm.text.length; i++) {
        var mod = '';
        if (i > 1 && i < 9) {
            mod = ' (' + inv[i] + ')';
        }
        elements.push(new Text(farm.text[i] + mod, 16, 60 + (i * 36), 14));

        var button = new Button(239, 55 + (i * 36), 112, 32, 'Select', farm.selectItem.bind(farm, i));
        if (!inv[i] || (farm.cropType >= 0 && farm.cropType != i - 2 && i > 1 && i < 7)) {
            button.active = false;
        }

        elements.push(button);
    }

    return new Menu(320, 112, 360, 420, elements);
}
