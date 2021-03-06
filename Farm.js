var produceKey = { //keep this for Purposes
	lettuce: 0,
	apple: 1,
	strawberry: 2,
	brussel: 3,
	artichoke: 4
}

//just temporary until we figure out time
var day = 0;

var Farm = function()
{
    this.money = 1000;
    this.water = 10000;

    this.cropType   = -1;
    this.cropAmount = [0, 0, 0, 0, 0];

    this.tools = {
		shovel: new Item(10, 30, true),
		tractor: new Item(500, 30, true),
		helpingHand: new Item(100, 1, true),
		tire: new Item(50, 1, false)
	};

    this.seeds = {
        lettuce:    10,
        apple:      10,
        strawberry: 10,
        brussel:    10,
        artichoke:  10
    };

    this.pesticide  = 10;
    this.fertilizer = 10;

    this.text = ['Shovel', 'Tractor', 'Lettuce Seeds', 'Apple Saplings', 'Strawberry Seeds',
                 'Brussel Sprout Seeds', 'Artichoke Seeds', 'Pesticide', 'Fertilizer', 'Harvest'];
    this.inv = this.setInv();

    this.selection = -1;

    this.income       = 0;
    this.expenditures = [];

    this.hours = 0;
    this.days  = 0;
}

Farm.prototype =
{
    setInv: function()
    {
        return [this.tools.shovel.held, this.tools.tractor.held, this.seeds.lettuce, this.seeds.apple,
               this.seeds.strawberry, this.seeds.brussel, this.seeds.artichoke, this.pesticide,
               this.fertilizer, 1];
    },

	//potentially redundant
    performAction: function(action)
    {
        this.inv = this.setInv();

        if (action.name === 'Sleep') {
            this.days += 1;
            this.hours = 0;
            return true;
        }

        var newHours = this.hours + action.time;
        var newMoney = this.money + action.money;
        var newWater = this.water + action.water;

        var haveTime  = newHours <= 24;
        var haveMoney = newMoney >= 0;
        var haveWater = newWater >= 0;
        if (!haveTime || !haveWater || !haveMoney) {
            return false;
        }

        if (action.money > 0) {
            this.income += action.money;
        }

        this.hours = newHours;
        this.money = newMoney;
        this.water = newWater;
        if (action.callback) {
            action.callback(this);
        }

        return true;
    },

    selectItem: function(item)
    {
        this.selection = item;
    },
	
    useItem: function(target)
    {
        this.farmMove(this.selection + 1, target);
    },

    farmMove: function(move, target){
        //till by shov
        if(move == 1 && this.tools.shovel.held && !target.tilled){
            day = day - 6;
            target.blank = 0;
            target.lettuce=0;
            target.apples=0;
            target.strawberries=0;
            target.brussel=0;
            target.artichokes=0;
            target.tilled = 1;
            target.planted=0;
            target.ripe=0;
            target.ruined=0;
            target.fertile=0;
            target.GMO=0;
            target.growthRate=1.0;
            target.pestRepel=1.0;
            target.GMO=0;
            this.tools.shovel.use();
			advanceTime(8);
        }else if(move == 2 && this.tools.tractor.held && target.blank == 1){
            day = day - 2;
            target.tilled = 1;
            target.blank = 0;
            this.tools.tractor.uses();
        }else if(this.seeds.lettuce > 0 && move == 3  && target.tilled == 1 && this.water - 200 > 0){
			advanceTime(4);
            //plant seeds
            day = day - 2;
            target.tilled = 0;
            target.planted = 1;
            target.lettuce = 1;
            this.water -= 200;
            target.pestRepel = .4;
            this.seeds.lettuce -= 1;
			advanceTime(6);
        }else if(this.seeds.apples > 0 && move == 4  && target.tilled == 1 && this.water - 200 > 0){
            //plant seeds
            day = day - 2;
            target.tilled = 0;
            target.planted = 1;
            target.apples = 1;
            this.water -= 200;
            target.pestRepel = .5;
			advanceTime(6);
            this.seeds.apples -= 1;
        }else if(this.seeds.strawberries > 0 && move == 5  && target.tilled == 1 && this.water - 100 > 0){
            //plant seeds
            day = day - 2;
            target.tilled = 0;
            target.planted = 1;
            target.strawberries = 1;
            this.water -= 100;
            target.pestRepel = .3;
            this.seeds.strawberries -= 1;
			advanceTime(6);
        }else if(this.seeds.brussel > 0 && move == 6  && target.tilled == 1 && this.water - 100 > 0){
            //plant seeds
            day = day - 2;
            target.tilled = 0;
            target.planted = 1;
            target.brussel = 1;
            this.water -= 100;
            target.pestRepel = .4;
            this.seeds.brussel -= 1;
			advanceTime(6);
        }else if(this.seeds.artichokes > 0 && move == 7  && target.tilled == 1   && this.water - 100 > 0){
            //plant seeds
            day = day - 2;
            target.tilled = 0;
            target.planted = 1;
            target.artichokes = 1;
            this.water -= 100;
            target.pestRepel = .5;
            this.seeds.artichokes -= 1;
			advanceTime(6);
        }else if(this.pesticide > 0 && move == 8 && target.planted){
            //pesticides
            day = day - 2;
            target.pestRepel = pestRepel + .1;
            this.pesticide -= 1;
			advanceTime(4);
        }else if(this.fertilizer > 0 && move == 9 && target.fertile == 0 ){
            //pesticides
            day = day - 2;
            //target.pestRepel = pestRepel + .1;
            //organic
            target.fertile = 1;
            target.growthRate = 1.3;
            this.fertilizer -= 1;
			advanceTime(2);
        }else if(move == 10 && target.ripe == 1){
            //harvest
            day = day - 3;
            target.ripe = 0;
            var harvest = 0;
            var crop = Array( target.lettuce, target.apples, target.strawberries, target.brussel, target.artichokes);
            for(var i = 0; i < crop.length; i++){
                if(crop[i] == 1){
                    harvest = i;
                    break;
                }
            }

            var t = target;
            var c = t.lettuce + (2 * t.apples) + (3 * t.strawberries) + (4 * t.brussel) + (6 * t.artichokes) - 1;
            console.log(c);
            this.cropAmount[c] += Seeds.seedMakes[c];

			advanceTime(10);
            target.blank=1;
            target.lettuce=0;
            target.apples=0;
            target.strawberries=0;
            target.brussel=0;
            target.artichokes=0;
            target.tilled=0;
            target.planted=0;
            target.ripe=0;
            target.ruined=0;
            target.fertile=0;
            target.GMO=0;
            target.growthRate=1.0;
            target.pestRepel=1.0;
            target.GMO=0;
        } else if(move == 11 && target.ripe == 1){
             //helping hand
		
			target.ripe = 0;
			var harvest = 0;

            var c = t.lettuce + (2 * t.apples) + (3 * t.strawberries) + (4 * t.brussel) + (6 * t.artichokes) - 1;
            console.log(c);
            this.cropAmount[c] += Seeds.seedMakes[c];

			target.blank=1;
			target.lettuce=0;
			target.apples=0;
			target.strawberries=0;
			target.brussel=0;
			target.artichokes=0;
			target.tilled=0;
			target.planted=0;
			target.ripe=0;
			target.ruined=0;
			target.fertile=0;
			target.GMO=0;
			target.growthRate=1.0;
			target.pestRepel=1.0;
			target.GMO=0;
		}

        this.cropType = -1;
        for (var i = 0; i < Land.length; i++) {
            for (var j = 0; j < Land[i].length; j++) {
                var t = Land[i][j];
                var c = t.lettuce + (2 * t.apples) + (3 * t.strawberries) + (4 * t.brussel) + (6 * t.artichokes) - 1;
                if (c >= 0) {
                    this.cropType = c;
                }
            }
        }
    },

    addTool: function(itemName)
    {
        var item = this.tools[itemName];
        if(this.money<item.price){
            return; //not enough funds
        }
        if(item.held){
            return; //already have one
        }
        item.obtain();
        this.money -= item.price;
        this.expenditures.push(item.price);
    },

    UpdateT: function(cost){
           this.hours += cost;
           if(this.hours >= 24){
           	this.hours = 0;
           	updateCrops();
             day++;

             if(day > 90){
               //engine.gameOver()

           }
           return 1;
           }
       return 0;
    },
	
	addSeeds: function(seedName){
		var price;
		switch(seedName){
			case 'lettuce':
				price = Seeds.price[0];
				break;
			case 'apple':
				price = Seeds.price[1];
				break;
			case 'strawberry':
				price = Seeds.price[2];
				break;
			case 'brussel':
				price = Seeds.price[3];
				break;
			case 'artichoke':
				price = Seeds.price[4];
				break;
		}
		if(this.money<price){
		    return; //not enough funds
        }
        this.seeds[seedName]++;
        this.money -= price;
        this.expenditures.push(price);
	},
	
	addBonus: function(name){
		var price;
		switch(name){
			case 'pesticide':
				price = pesticidePrice;
				break;
			case 'fertilizer':
				price = OFPrice;
				break;
		}
		if(this.money<price){
		    return; //not enough funds
        }
        this[name]++;
        this.money -= price;
        this.expenditures.push(price);
	},

    updateCrops: function(time)
    {
        for (var i = 0; i < Land.length; i++) {
            for (var j = 0; j < Land[i].length; j++) {
                Land[i][j].timer += time;
                if (Land[i][j].timer > Seeds.growTime[this.cropType]) {
                    Land[i][j].ripe = 1;
                }
            }
        }

        for (var i = 0; i < this.cropAmount.length; i++) {
            this.cropAmount[i] -= time * this.cropAmount[i] * Seeds.spoilPercent[i] / 24;
        }
    },

    payTaxes: function()
    {
        var federalTax = calculateFederalTax(this.income, this.expenditures);
        var stateTax   = calculateStateTax  (this.income);

        this.income       = 0;
        this.expenditures = [];
        this.money       -= federalTax + stateTax;
    }
}
