var Menu = function(x, y, w, h, elements, close)
{
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 0;
    this.h = h || 0;

    this.elements = elements;

    var closeFunc = function() {
        this.exit = true;
		selectSound.play();
    }

    if (close) {
        this.elements.push(new Button((this.w / 2) - 50, this.h - 40, 100, 32, "Close", closeFunc.bind(this)));
    } else {
        this.elements.push(new Button(this.w - 32, 0, 32, 32, "X", closeFunc.bind(this)));
    }

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

        for (var i = 0; i < this.elements.length; i++) {
            if (this.elements[i].mouseDown) {
                this.elements[i].mouseDown(mx, my);
            }
        }
    },

    mouseUp: function(x, y)
    {
        var mx = x - this.x;
        var my = y - this.y;

        for (var i = 0; i < this.elements.length; i++) {
            if (this.elements[i].mouseUp) {
                this.elements[i].mouseUp(mx, my);
            }
        }
    },

    mouseMove: function(x, y)
    {
        var mx = x - this.x;
        var my = y - this.y;

        for (var i = 0; i < this.elements.length; i++) {
            if (this.elements[i].mouseMove) {
                this.elements[i].mouseMove(mx, my);
            }
        }
    },

    draw: function(canvas)
    {
        canvas.translate(this.x, this.y);

        canvas.fillStyle   = 'white';
        canvas.strokeStyle = 'black';

        canvas.fillRect  (0, 0, this.w, this.h);
        canvas.strokeRect(0, 0, this.w, this.h);

        for (var i = 0; i < this.elements.length; i++) {
            this.elements[i].draw(canvas);
        }

        canvas.translate(-this.x, -this.y);
    }
}
