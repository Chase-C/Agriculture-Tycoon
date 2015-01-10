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
    var update = function(hours)
    {
        this.suppliers.map(function(sup) {
            sup.harvestTime -= hours;
            if (sup.harvestTime < 0) {
                sup.harvestTime += seeds.growTime[sup.cropType] * 24;
                sup.amount += seeds.seedMakes[sup.cropType];
            }
    }
}
