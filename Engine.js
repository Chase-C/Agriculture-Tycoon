var Engine = function(w, h)
{
    this.w = w || 0;
    this.h = h || 0;

    this.running = true;
    this.time = Date.now();

    this.menus = [];
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
    },

    mouseUp: function(x, y)
    {
        if (this.menus.length == 0) {
            this.menus.push(new Menu(16, 16, 320, 480));
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

        for (var i = 0; i < this.menus.length; i++) {
            this.menus[i].draw(canvas);
        }
    },
	
}
