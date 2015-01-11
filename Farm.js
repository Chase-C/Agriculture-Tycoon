//just temporary until we figure out time
var day = 0;

var Farm = function()
{
    this.money = 1000;
    this.water = 1000;

    this.cropType   = 0;
    this.cropAmount = 100;

    this.tools = {
		shovel: new Item(10, 15, true),
		tractor: new Item(500, 30, true),
		helpingHand: new Item(100, 1, true),
		tire: new Item(50, 1, false)
	};

    this.tools.shovel.obtain();
    this.tools.tractor.obtain();

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
    this.inv  = [this.tools.shovel.held, this.tools.tractor.held, this.seeds.lettuce, this.seeds.apple,
                 this.seeds.strawberry, this.seeds.brussel, this.seeds.artichoke, this.pesticide,
                 this.fertilizer, 1];

    this.selection = -1;

    this.income       = 0;
    this.expenditures = [];

    this.hours = 0;
    this.days  = 0;
}

Farm.prototype =
{
	//potentially redundant
    performAction: function(action)
    {
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
		if(move == 1 && this.tools.shovel.held && target.blank){
            console.log('til');
			day = day - 6;
			target.tilled = 1;
			target.blank = 0;
			this.tools.shovel.use();
		}else
		
		if(move == 2 && this.tools.tractor.held && target.blank == 1){
		  day = day - 2;
		  target.tilled = 1;
		  target.blank = 0;
		  this.tools.tractor.uses();
		 }else

		//plant seeds
		if(move == 3  && target.tilled == 1 && this.water - 200 > 0){
			day = day - 2;
			target.tilled = 0;
			target.planted = 1;
			target.lettuce = 1;
			this.water -= 200;
			target.pestRepel = .4;
            this.inv[move - 1]--;

		}else

		//plant seeds
		if(move == 4  && target.tilled == 1 && this.water - 200 > 0){
			day = day - 2;
			target.tilled = 0;
			target.planted = 1;
			target.apples = 1;
			this.water -= 200;
			target.pestRepel = .5;
            this.inv[move - 1]--;
		}else

		//plant seeds
		if(move == 5  && target.tilled == 1 && this.water - 100 > 0){
			day = day - 2;
			target.tilled = 0;
			target.planted = 1;
			target.strawberries = 1;
			this.water -= 100;
			target.pestRepel = .3;
            this.inv[move - 1]--;
		}else

		//plant seeds
		if(move == 6  && target.tilled == 1 && this.water - 100 > 0){
			day = day - 2;
			target.tilled = 0;
			target.planted = 1;
			target.brussel = 1;
			this.water -= 100;
			target.pestRepel = .4;
            this.inv[move - 1]--;
		}else

		//plant seeds
		if(move == 7  && target.tilled == 1   && this.water - 100 > 0){
			day = day - 2;
			target.tilled = 0;
			target.planted = 1;
			target.artichokes = 1;
			this.water -= 100;
			target.pestRepel = .5;
            this.inv[move - 1]--;
		}else


		//pesticides
		if(move == 8 && target.planted){
			day = day - 2;
		   target.pestRepel = pestRepel + .1;
            this.inv[move - 1]--;
		}else

		//organic
		if(move == 9 && target.fertile == 0 ){
			day = day - 4;
			target.fertile = 1;
			target.growthRate = 1.3;
            this.inv[move - 1]--;
		}else
		
		//non organic fertilizer
		if(move == 9 && target.fertile == 0 ){
			day = day - 4;
			target.fertile = 1;
			target.GMO = 1;
			target.growthRate = 1.5;

		}else
		//harvest
		if(move == 10 && target.ripe == 1){
			day = day - 3;
			target.ripe = 0;
			var harvest = 0;
			var crop = Array( target.lettuce, target.apples, target.strawberries, target.brussel, target.artichokes);
			for(var i = 0; i < crop.length; i++){
				if(target.crop[i] == 1){
					harvest = i;
					break;
				}
			}

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

    updateCrops: function(time)
    {
        for (var i = 0; i < Land.length; i++) {
            for (var j = 0; j < Land[i].length; j++) {
            }
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
