var Engine = function(w, h)
{
    this.w = w || 0;
    this.h = h || 0;

    this.running = true;
    this.time = Date.now();

    var menuFunc = function() {
        this.menus.push(new Menu(256, 16, 320, 480));
    }

    this.testButton = new Button(32, 100, 128, 32, "Test", menuFunc.bind(this));

    this.menus = [];
	
	Graphics.initialize();
}

Engine.prototype =
{
    // Update the simulation each frame
    update: function()
    {
        var currTime = Date.now();
        var dt = currTime - this.time;

        // Put stuff here
        for (var i = 0; i < this.menus.length; i++) {
            if (this.menus[i].exit) {
                this.menus.splice(i);
            }
        }

        this.time = currTime;
    },
	
	keyPress: function(keyCode)
    {
    },

    mouseDown: function(x, y)
    {
        if (this.menus.length == 0) {
            this.testButton.mouseDown(x, y);
        } else {
            this.menus[0].mouseDown(x, y);
        }
    },

    mouseUp: function(x, y)
    {
        if (this.menus.length == 0) {
            this.testButton.mouseUp(x, y);
        } else {
            this.menus[0].mouseUp(x, y);
        }
    },

    // Functions for starting and stopping the simulation
    start: function() { this.running = true },
    pause: function() { this.running = false },
    // Returns running
    isRunning: function() { return this.running },

    draw: function(canvas)
    {
        canvas.fillStyle = 'white';
        canvas.fillRect(0, 0, this.w, this.h);

        Graphics.drawTiles(canvas);

        this.testButton.draw(canvas);

        for (var i = 0; i < this.menus.length; i++) {
            this.menus[i].draw(canvas);
        }
    }
	
}
