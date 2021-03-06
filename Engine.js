var Engine = function(w, h)
{
    this.w = w || 0;
    this.h = h || 0;

    this.running = true;
    this.time = Date.now();

    this.farm = new Farm();
    this.ui   = new UI(this.farm);

    this.cropSupply = new CropSupply(8);
    this.venues = ['Salad Palace',
                   'Health Nut',
                   'Swav Mart',
                   'Farmer\'s Market'].map((function(name) {
                       return new Venue(name, this.cropSupply);
                   }).bind(this));

    //this.testVenue      = new Venue('test', this.testCropSupply);

    //var menuFunc = function() {
    //    this.menus.push(createSellMenu(this.farm, this.testVenue));
    //}
    //this.testButton = new Button(32, 100, 128, 32, "Test", menuFunc.bind(this));

    this.menus = [];

    this.invButton = new Button(860, 8, 112, 32, 'Inventory', (function() {
        this.menus.push(createInventoryMenu(this.farm));
    }).bind(this));

    this.cropButton = new Button(740, 8, 112, 32, 'Crops', (function() {
        this.menus.push(createCropsMenu(this.farm));
    }).bind(this));

    this.buttons = [this.invButton, this.cropButton];

    this.messages = new Messages(228, 540, 500, 60);
	
	soundtrack.play();
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
        //this.testCropSupply.update(8);
        //this.testVenue.update(8);
    },

    mouseDown: function(x, y)
    {
        if (this.menus.length > 0) {
            this.menus[this.menus.length - 1].mouseDown(x, y);
        } else {
            //this.testButton.mouseDown(x, y);
            for (var i = 0; i < this.buttons.length; i++) {
                this.buttons[i].mouseDown(x, y);
            }
        }
    },

    mouseUp: function(x, y)
    {
        if (this.menus.length > 0) {
            this.menus[this.menus.length - 1].mouseUp(x, y);
        } else {
            for (var i = 0; i < this.buttons.length; i++) {
                this.buttons[i].mouseUp(x, y);
            }

            var building = Graphics.checkBuildings();
            var acreCoords = Graphics.getSelectedAcre();
            if (building > 0) {
                this.menus.push(createSellMenu(this.menus, this.farm, this.venues[building]));
				selectSound.play();
            } else if (building == 0) {
				this.menus.push(createBuyMenu(this.menus, this.farm));
				selectSound.play();
			} else if (acreCoords) {
				var acre = Land[acreCoords[0]][acreCoords[1]];
                this.farm.useItem(acre);
				selectSound.play();
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

        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw(canvas);
        }

        for (var i = 0; i < this.menus.length; i++) {
            this.menus[i].draw(canvas);
        }

        //this.messages.draw(canvas);
    }
	
}
