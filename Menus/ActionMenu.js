var createActionMenu = function(farm)
{
    var buttons = [];

    [actionBuyWater, actionBuyShovel, actionPayTaxes, actionSleep].map(
            function(act, i) {
                buttons.push(createActionButton(16, 16 + (48 * i), 128, 32, farm, act));
            });

    return new Menu(128, 64, 256, 512, buttons);
}
