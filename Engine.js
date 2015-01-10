var Engine = function(w, h)
{
    this.w = w || 0;
    this.h = h || 0;

    this.running = true;
    this.time = Date.now();

    this.farm = new Farm();
    this.ui   = new UI(this.farm);

    var menuFunc = function() {
        this.menus.push(createActionMenu(this.farm));
    }
    this.testButton = new Button(32, 100, 128, 32, "Test", menuFunc.bind(this));

    this.menus = [];
	
	//Graphics.init();
}

Engine.prototype =
{
    // Update the simulation each frame
    update: function()
    {
        var currTime = Date.now();
        var dt = currTime - this.time;

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
	
	mouseMove: function(x, y)
	{
		Graphics.updatePos(x, y);
	},

    // Functions for starting and stopping the simulation
    start: function() { this.running = true },
    pause: function() { this.running = false },
    // Returns running
    isRunning: function() { return this.running },

    draw: function(canvas)
    {
		Graphics.checkScroll();
        Graphics.drawWorld();

        this.ui.draw(canvas);

        this.testButton.draw(canvas);

        for (var i = 0; i < this.menus.length; i++) {
            this.menus[i].draw(canvas);
        }
    }
	
}
