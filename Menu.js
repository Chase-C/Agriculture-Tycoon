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
        var mx = this.transX(x);
        var my = this.transY(y);

        if (mx > this.closeX && mx < this.closeX + this.closeW &&
            my > this.closeY && my < this.closeY + this.closeH) {
            this.exit = true;
        }
    },

    draw: function(canvas)
    {
        canvas.fillStyle = 'white';
        canvas.fillRect(this.x, this.y, this.w, this.h);
        canvas.strokeStyle = 'black';
        canvas.strokeRect(this.x, this.y, this.w, this.h);
        canvas.strokeRect(this.x + this.closeX, this.y + this.closeY, this.closeW, this.closeH);
    },
	
    transX: function(tx)
    {
        return tx - this.x;
    },

    transY: function(ty)
    {
        return ty - this.y;
    }
}
