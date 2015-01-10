var Farm = function()
{
    this.money = 1000;
    this.water = 1000;
    this.items = [];

    this.hours = 0;
    this.days  = 0;
}

Farm.prototype =
{
    performAction: function(action)
    {
        if (action.name === 'sleep') {
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

        this.hours = newHours;
        this.money = newMoney;
        this.water = newWater;
        if (action.callback) {
            action.callback();
        }

        return true;
    },

    draw: function(canvas)
    {
    }
}
