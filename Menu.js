var Menu = function(x, y, w, h, buttons)
{
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 0;
    this.h = h || 0;

    this.buttons = [];

    var closeFunc = function() {
        this.exit = true;
    }
    this.buttons.push(new Button(this.w - 32, 0, 32, 32, "X", closeFunc.bind(this)));

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
