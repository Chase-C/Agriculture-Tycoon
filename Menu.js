var Menu = function(x, y, w, h)
{
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 0;
    this.h = h || 0;

    this.closeX = this.w - 32;
    this.closeY = 0;
    this.closeW = 32;
    this.closeH = 32;

    this.exit = false;
}

Menu.prototype =
{
    update: function(dt)
    {
    },
	
	keyPress: function(keyCode)
    {
    },

    mouseDown: function(mx, my)
    {
    },

    mouseUp: function(x, y)
    {
        var mx = x - this.x;
        var my = y - this.y;

        if (mx > this.closeX && mx < this.closeX + this.closeW &&
            my > this.closeY && my < this.closeY + this.closeH) {
            this.exit = true;
        }
    },

    draw: function(canvas)
    {
        canvas.translate(this.x, this.y);

        canvas.fillStyle   = 'white';
        canvas.strokeStyle = 'black';

        canvas.fillRect  (0, 0, this.w, this.h);
        canvas.strokeRect(0, 0, this.w, this.h);
        canvas.strokeRect(this.closeX, this.closeY, this.closeW, this.closeH);

        canvas.translate(-this.x, -this.y);
    }
}
