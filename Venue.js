var Venue = function(name, cropSupply)
{
    this.name = name;
    this.cropSupply = cropSupply;
    this.cropDemand = [1, 1, 1, 1, 1].map(function() { return Math.random(); });

    this.maxProduce    = [];
    this.numProduce    = [];
    this.purchaseReady = [];
    for (var i = 0; i < 5; i++) {
        var max = 64 * Seeds.seedMakes[i] / Seeds.growTime[i];
        this.maxProduce.push(max);
        this.numProduce.push(Math.random() * max / 2) + 20;
        this.purchaseReady.push(this.cropDemand[i] * (2 - (2 * this.numProduce[i] / this.maxProduce[i])));
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
        //console.log('Venue Update');
        for (var i = 0; i < this.numProduce.length; i++) {
            var offset          = (Math.random() - 0.48) / 10;
            this.cropDemand[i] += offset * Math.pow((Math.random() / 5) + 0.9, Math.log(hours));
            this.cropDemand[i]  = Math.min(Math.max(this.cropDemand[i], 0), 1);

            this.numProduce[i] -= hours * this.maxProduce[i] * this.cropDemand[i] * Math.random() / 64;
            if (this.numProduce[i] < 0) {
                this.numProduce[i]  = 0;
                this.cropDemand[i] += 0.05;
            }
            //console.log(i, Seeds.name[i], this.numProduce[i]);
        }

        for (var i = 0; i < this.numProduce.length; i++) {
            this.purchaseReady[i] = this.cropDemand[i] * (2 - (2 * this.numProduce[i] / this.maxProduce[i]));
            var supplier          = this.cropSupply.getSupply(i);
            if (supplier) {
                var saleReady     = Math.min(supplier.saleReady,    2);
                var purchaseReady = Math.min(this.purchaseReady[i], 2)

                var numUnits  = (this.maxProduce[i] - this.numProduce[i]) * this.cropDemand[i];
                var salePower = Math.min(supplier.amount / numUnits, 1);

                var saleThreshold = salePower * saleReady * purchaseReady;
                //console.log(i, Seeds.name[i], this.cropDemand[i], purchaseReady, saleThreshold);
                if (saleThreshold > 1) {
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
        //console.log('Venue Update End\n');
    },

    produceInDemand: function()
    {
        var produce = [];
        for (var i = 0; i < this.numProduce.length; i++) {
            produce.push({
                name: Seeds.name[i],
                type: i,
                num:  Math.round(this.cropDemand[i] * (this.maxProduce[i] - this.numProduce[i]))
            });
        }
        return produce;
    },

    willBuy: function(crop, price, num)
    {
        var purchaseReady = Math.min(this.purchaseReady[crop], 2);
        //console.log('p: ' + purchaseReady);
        var numUnits      = (this.maxProduce[crop] - this.numProduce[crop]) * this.cropDemand[crop];
        var priceMod      = Math.pow(Seeds.price[crop] / price, 2);
        var salePower     = priceMod * Math.min(num / numUnits, 1);
        return (purchaseReady * salePower > 1);
    }
}
