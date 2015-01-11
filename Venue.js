var Venue = function(name, cropSupply)
{
    this.name = name;
    this.cropSupply = cropSupply;
    this.cropDemand = [1, 1, 1, 1, 1].map(function() { return Math.random(); });

    this.maxProduce    = [];
    this.numProduce    = [];
    this.purchaseReady = [];
    for (var i = 0; i < 5; i++) {
        var max = 15 * Seeds.seedMakes[i] / Seeds.growTime[i];
        this.maxProduce.push(max);
        this.numProduce.push(Math.random() * max / 2) + 20;
        this.purchaseReady.push(this.cropDemand[i] * (2 - (this.numProduce[i] / this.maxProduce[i])));
    }

    this.supplierDist = [];
    for (var i = 0; i < this.cropSupply.num; i++) {
        this.supplierDist.push(Math.random() * 80) + 20;
    }
}

Venue.prototype =
{
    update: function(hours)
    {
        for (var i = 0; i < this.numProduce.length; i++) {
            this.cropDemand[i] *= ((Math.random() / 5) + 0.9) * Math.log(hours);
            this.cropDemand = Math.min(Math.max(this.cropDemand, 0), 1);

            this.numProduce[i]   -= hours * this.maxProduce[i] * this.cropDemand[i] * Math.random() / 64;
            this.purchaseReady[i] = this.cropDemand[i] * (2 - (this.numProduce[i] / this.maxProduce[i]));

            var supplier = this.cropSupply.getSupply(i);
            if (supplier) {
                var saleReady     = supplier.saleReady;
                var purchaseReady = this.purchaseReady[i];

                var numUnits  = (this.maxProduce[i] - this.numProduce[i]) * this.cropDemand[i];
                var salePower = Math.min(supplier.amount / numUnits, 1);

                if (salePower * saleReady * purchaseReady > 1) {
                    if (supplier.amount > numUnits) {
                        this.numProduce[i] += numUnits;
                        supplier.amount    -= numUnits;
                    } else {
                        this.numProduce[i] += supplier.amount;
                        supplier.amount     = 0;
                    }
                    i--;
                }
            }
        }
    }
}
