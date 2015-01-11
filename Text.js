var Text = function(text, x, y, size)
{
    this.text = text;
    this.x    = x    || 0;
    this.y    = y    || 0;
    this.size = size || 14;
}

Text.prototype =
{
    draw: function(canvas)
    {
        canvas.font         = this.size + 'px Swanky';
        canvas.textBaseline = 'top';
        canvas.textAlign    = 'left';
        canvas.fillStyle    = 'black';

        canvas.fillText(this.text, this.x, this.y);
    }
}
