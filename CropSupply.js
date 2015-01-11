var CropSupply = function(numSuppliers)
{
    this.num       = numSuppliers;
    this.suppliers = [];
    for (var i = 0; i < numSuppliers; i++) {
        var type = Math.round(Math.random() * 4);
        var supplier = {
            cropType:    type,
            acres:       Math.round(Math.random() * 26) + 10,
            amount:      Math.round(Math.random() * 100),
            harvestTime: Math.round(Math.random() * Seeds.growTime[type] * 24),
            yield:       Math.round(Math.random() / 2) + 0.70,
            saleReady:   0
        }

        this.suppliers.push(supplier);
    }
}

CropSupply.prototype =
{
    update: function(hours)
    {
        //console.log('Crop Supply Update');
        for (var i = 0; i < this.num; i++) {
            var sup = this.suppliers[i];
            sup.harvestTime -= hours;
            if (sup.harvestTime < 0) {
                sup.harvestTime += Seeds.growTime[sup.cropType] * 24;
                sup.amount      += Math.round(sup.yield * sup.acres * Seeds.seedMakes[sup.cropType]);
            }

            if (sup.yield < 1.0) {
                sup.yield += 0.001 * hours;
            }

            var upperBound = 12 * sup.acres * Seeds.seedMakes[sup.cropType] / Seeds.growTime[sup.cropType];
            sup.saleReady  = sup.amount / upperBound;

            //console.log(i, Seeds.name[sup.cropType], sup.amount);
        }
        //console.log('Crop Supply Update End');
    },

    //distaster: function(type)
    //{
    //    this.suppliers.map(function(sup) {
    //        sup.yield -= 0.35;
    //    });
    //},

    getSupply: function(crop)
    {
        var supply = undefined;
        for (var i = 0; i < this.num; i++) {
            var sup = this.suppliers[i];
            if (sup.cropType === crop && (!supply || sup.amount > supply.amount)) {
                supply = sup;
            }
        }

        return supply;
    }
}
