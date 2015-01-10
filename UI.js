var UI = function(farm)
{
    this.farm = farm;
}

UI.prototype =
{
    draw: function(canvas)
    {
        canvas.font         = '14px Swanky';
        canvas.textBaseline = 'top';
        canvas.textAlign    = 'left';
        canvas.fillStyle    = 'black';

        canvas.fillText('$' + this.farm.money.toFixed(2), 32, 16);
        canvas.fillText(this.farm.water + ' Gal', 32, 48);
    }
}
