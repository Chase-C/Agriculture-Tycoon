var UI = function(farm)
{
    this.farm = farm;
}

UI.prototype =
{
    draw: function(canvas)
    {
        canvas.font         = '14px sans-serif';
        canvas.textBaseline = 'top';
        canvas.textAlign    = 'left';
        canvas.fillStyle    = 'black';

        canvas.fillText(this.farm.money, 32, 16);
        canvas.fillText(this.farm.water, 32, 48);
    }
}
