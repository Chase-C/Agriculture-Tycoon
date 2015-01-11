var UI = function(farm)
{
    this.farm = farm;
}

UI.prototype =
{
    draw: function(canvas)
    {
        canvas.fillStyle   = 'white';
        canvas.strokeStyle = 'black';

        canvas.fillRect  (0, 0, 1000, 48);
        canvas.strokeRect(0, 0, 1000, 48);

        canvas.font         = '14px Swanky';
        canvas.textBaseline = 'top';
        canvas.textAlign    = 'left';
        canvas.fillStyle    = 'black';

        canvas.fillText('Money: $' + this.farm.money.toFixed(2), 16, 4);
        canvas.fillText('Water: '  + this.farm.water + ' Gal', 16, 26);
    }
}
