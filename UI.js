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

        var mod = '';
        for (var i = 0; i < Land.length; i++) {
            for (var j = 0; j < Land[i].length; j++) {
                if (Land[i][j].GMO === 1) {
                    mod = ' (GMO)';
                }
            }
        }

        if (this.farm.cropType >= 0) {
            canvas.fillText('Crops: '  + Seeds.name[this.farm.cropType] + mod, 200, 4);
            canvas.fillText('Amount: ' + this.farm.cropAmount, 200, 26);
        } else {
            canvas.fillText('No Crops', 200, 4);
        }
    }
}
