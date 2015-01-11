var Engine = function(w, h)
{
    this.w = w || 0;
    this.h = h || 0;

    this.running = true;
    this.time = Date.now();

    this.farm = new Farm();
    this.ui   = new UI(this.farm);

    this.testCropSupply = new CropSupply(10);
    console.log(this.testCropSupply);
    this.venues = ['Salad Palace',
                   'Health Nut',
                   'Swav Mart',
                   'Farmer\'s Market'].map((function(name) {
                       console.log(this.testCropSupply);
                       return new Venue(name, this.testCropSupply);
                   }).bind(this));

    //this.testVenue      = new Venue('test', this.testCropSupply);

    //var menuFunc = function() {
    //    this.menus.push(createSellMenu(this.farm, this.testVenue));
    //}
    //this.testButton = new Button(32, 100, 128, 32, "Test", menuFunc.bind(this));

    this.menus = [];

    //this.messages = new Messages(256, 16, 280, 480);
    //this.messages.add('test');
    //this.messages.add('some more tests\nnow with newlines');
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
        this.testCropSupply.update(8);
        this.testVenue.update(8);
    },

    mouseDown: function(x, y)
    {
        if (this.menus.length > 0) {
            this.menus[0].mouseDown(x, y);
        } else {
            //this.testButton.mouseDown(x, y);
        }
    },

    mouseUp: function(x, y)
    {
        if (this.menus.length > 0) {
            this.menus[this.menus.length - 1].mouseUp(x, y);
        } else {
            //this.testButton.mouseUp(x, y);
            var building = Graphics.checkBuildings(x, y);
            if (building >= 0) {
                this.menus.push(createSellMenu(this.farm, this.venues[building]));
            }
        }
    },
	
	mouseMove: function(x, y)
	{
        if (this.menus.length > 0) {
            this.menus[0].mouseMove(x, y);
        } else {
            Graphics.updatePos(x, y);
        }
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

        //this.testButton.draw(canvas);

        for (var i = 0; i < this.menus.length; i++) {
            this.menus[i].draw(canvas);
        }

        //this.messages.draw(canvas);
    }
	
}
