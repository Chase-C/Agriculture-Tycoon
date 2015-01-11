var createInventoryMenu = function(farm)
{
    var elements = [];
    elements.push(new Text('Inventory', 16, 16, 18));

    for (var i = 0; i < farm.text.length; i++) {
        var mod = '';
        if (i > 1 && i < 9) {
            mod = ' (' + farm.inv[i] + ')';
        }
        elements.push(new Text(farm.text[i] + mod, 16, 60 + (i * 36), 14));

        var button = new Button(239, 55 + (i * 36), 112, 32, 'Select', farm.selectItem.bind(farm, i));
        if (!farm.inv[i]) {
            button.active = false;
        }

        elements.push(button);
    }

    return new Menu(320, 112, 360, 420, elements);
}
