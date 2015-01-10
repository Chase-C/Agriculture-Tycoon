var CropSupply = function(numSuppliers)
{
    this.suppliers = [];
    for (var i = 0; i < numSuppliers; i++) {
        var type = Math.round(Math.random() * 4);
        var supplier = {
            cropType:    type,
            acres:       Math.round(Math.random() * 26) + 10,
            amount:      Math.round(Math.random() * 100),
            harvestTime: Math.round(Math.random() * seeds.growTime[type] * 24),
            yield:       Math.round(Math.random() / 2) + 0.70
        }

        this.suppliers.push(supplier);
    }
}

CropSupply.prototype =
{
    update: function(hours)
    {
        this.suppliers.map(function(sup) {
            sup.harvestTime -= hours;
            if (sup.harvestTime < 0) {
                sup.harvestTime += seeds.growTime[sup.cropType] * 24;
                sup.amount      += sup.yield * sup.acres * seeds.seedMakes[sup.cropType];
            }

            if (sup.yield < 1.0) {
                sup.yield += 0.001 * hours;
            }
        });
    },

    //distaster: function(type)
    //{
    //    this.suppliers.map(function(sup) {
    //        sup.yield -= 0.35;
    //    });
    //},

    getSupply: function(crop)
    {
        var supply = 0;
        this.suppliers.map(function(sup) {
            if (sup.cropType === crop && sup.amount > supply) {
                supply = sup.amount;
            }
        });

        return supply;
    },

    buyCrop: function(crop, amount)
    {
        this.suppliers.map(function(sup) {
            if (sup.cropType === crop && sup.amount >= amount) {
                sup.amount -= amount;
                return true;
            }
        });

        return false;
    }
}
