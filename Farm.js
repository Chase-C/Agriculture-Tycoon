var Farm = function()
{
    this.money = 1000;
    this.water = 1000;

    this.cropType = 0;

    this.tools = {
		shovel: new Item(10, 15, true),
		tractor: new Item(500, 30, true),
		helpingHand: new Item(100, 1, true),
		tire: new Item(50, 1, false)
	};

    this.income       = 0;
    this.expenditures = [];

    this.hours = 0;
    this.days  = 0;
}

Farm.prototype =
{
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

    payTaxes: function()
    {
        var federalTax = calculateFederalTax(this.income, this.expenditures);
        var stateTax   = calculateStateTax  (this.income);

        this.income       = 0;
        this.expenditures = [];
        this.money       -= federalTax + stateTax;
    }
}
