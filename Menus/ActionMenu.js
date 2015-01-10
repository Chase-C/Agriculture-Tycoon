var createActionMenu = function(farm)
{
    var buttons = [];

    var funcBuyWater = function() { farm.performAction(actionBuyWater); }
    buttons.push(new Button(16, 16, 128, 32, actionBuyWater.name, funcBuyWater));

    return new Menu(128, 64, 256, 512, buttons);
}
