function calculateFederalTax(income, expenditures)
{
    var partialExemption                = 0;
    var constantCostForPartialExemption = 164.60;
    var SRA                             = 200; //Supplemental Retirement Annuity
    var PERS                            = 200; //Public Employees Retirement System
    var healthInsurance                 = 200;
    var propertyTax                     = 200;

    var totalExpenditure = expenditures.reduce(function(x, y) { return x + y; }, 0);
    var partialExemption = totalExpenditure * 0.0275;

    var withholdingAllowances = expenditures.length * constantCostForPartialExemption;

    var semiWage         = income / 2;
    var calculations     = semiWage - SRA - PERS - healthInsurance;
    var taxableGrossWage = calculations - withholdingAllowances;

    var costOne    = incomeTaxToWithhold      (taxableGrossWage);
    var percentage = secondIncomeTaxToWithhold(taxableGrossWage);
    var costTwo    = thirdIncomeTaxToWithhold(taxableGrossWage);

    var priceOne = taxableGrossWage - costTwo;
    var priceTwo = priceOne * percentage;

    return priceTwo + partialExemption + costOne + propertyTax;

    function incomeTaxToWithhold(amountOfTaxableGrossWage) {
        if      (amountOfTaxableGrossWage <= 472)   return 0;
        else if (amountOfTaxableGrossWage <= 1631)  return 37.80;
        else if (amountOfTaxableGrossWage <= 3817)  return 211.65;
        else if (amountOfTaxableGrossWage <= 7858)  return 758.15;
        else if (amountOfTaxableGrossWage <= 16973) return 1889.63;
        else if (amountOfTaxableGrossWage <= 17042) return 4897.58;
        else                                        return 4921.73;

    }

    function secondIncomeTaxToWithhold(amountOfTaxableGrossWage) {
        if      (amountOfTaxableGrossWage <= 472)   return 0.10;
        else if (amountOfTaxableGrossWage <= 1631)  return 0.15;
        else if (amountOfTaxableGrossWage <= 3817)  return 0.25;
        else if (amountOfTaxableGrossWage <= 7858)  return 0.28;
        else if (amountOfTaxableGrossWage <= 16973) return 0.33;
        else if (amountOfTaxableGrossWage <= 17042) return 0.35;
        else                                        return 0.396;
    }

    function thirdIncomeTaxToWithhold(amountOfTaxableGrossWage) {
        if      (amountOfTaxableGrossWage <= 472)   return 94;
        else if (amountOfTaxableGrossWage <= 1631)  return 472;
        else if (amountOfTaxableGrossWage <= 3817)  return 1632;
        else if (amountOfTaxableGrossWage <= 7858)  return 3817;
        else if (amountOfTaxableGrossWage <= 16973) return 7858;
        else if (amountOfTaxableGrossWage <= 17042) return 16973;
        else                                        return 17042;
    }
}

function calculateStateTax(income)
{
    return income * 0.01;
}
