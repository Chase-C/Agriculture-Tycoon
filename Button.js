var Button = function(x, y, w, h, text, cb)
{
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 0;
    this.h = h || 0;

    this.text     = text;
    this.clicked  = false;
    this.callback = cb;
}

Button.prototype =
{
    mouseDown: function(mx, my)
    {
        if (mx > this.x && mx < this.x + this.w &&
            my > this.y && my < this.y + this.h) {
            this.clicked = true;
        }
    },

    mouseUp: function(mx, my)
    {
        if (mx > this.x && mx < this.x + this.w &&
            my > this.y && my < this.y + this.h) {
            this.clicked = false;
            this.callback();
        }
    },

    mouseMove: function(mx, my)
    {
    },

    draw: function(canvas)
    {
        canvas.fillStyle   = 'white';
        canvas.strokeStyle = 'black';

        canvas.fillRect  (this.x, this.y, this.w, this.h);
        canvas.strokeRect(this.x, this.y, this.w, this.h);

        if (this.clicked) {
            canvas.strokeStyle = '#444444';
            canvas.strokeRect(this.x + 1, this.y + 1, this.w - 2, this.h - 2);
        }

        canvas.font         = '14px Swanky';
        canvas.textBaseline = 'middle';
        canvas.textAlign    = 'center';
        canvas.fillStyle    = 'black';

        canvas.fillText(this.text, this.x + (this.w / 2), this.y + (this.h / 2) + 3);
    }
}

function createActionButton(x, y, w, h, farm, action)
{
    var actionFunc = function() {
        farm.performAction(action);
    }

    return new Button(x, y, w, h, action.name, actionFunc);
}
