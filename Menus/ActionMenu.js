var createActionMenu = function(farm)
{
    var elements = [];

    elements.push(createActionButton(16, 16, 128, 32, farm, actionBuyWater));
    elements.push(new Slider(16, 64, 192, 32, 1, 10, 5, 1));

    return new Menu(128, 64, 256, 512, elements);
}
