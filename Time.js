function advanceTime(time)
{
    engine.farm.hours += Math.round(time);
    if (engine.farm.hours >= 24) {
        engine.farm.hours -= 24;
        engine.farm.days  += 1;
        if (days % 15 === 0) {
            engine.doTaxes();
        }
    }

    engine.farm.updateCrops(time);
    engine.cropSupply.update(time);
    for (var i = 0; i < engine.venues.length; i++) {
        engine.venues[i].update(time);
    }
}
