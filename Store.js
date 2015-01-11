var Store = function(cropSupply)
{
    this.cropSupply = cropSupply;
}

Store.prototype =
{
    update: function(dt)
    {
    },
	
	keyPress: function(keyCode)
    {
    },

    mouseDown: function(x, y)
    {
        var mx = x - this.x;
        var my = y - this.y;

        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].mouseDown(mx, my);
        }
    },

    mouseUp: function(x, y)
    {
        var mx = x - this.x;
        var my = y - this.y;

        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].mouseUp(mx, my);
        }
    },

    draw: function(canvas)
    {
        canvas.translate(this.x, this.y);

        canvas.fillStyle   = 'white';
        canvas.strokeStyle = 'black';

        canvas.fillRect  (0, 0, this.w, this.h);
        canvas.strokeRect(0, 0, this.w, this.h);

        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw(canvas);
        }

        canvas.translate(-this.x, -this.y);
    }
}
