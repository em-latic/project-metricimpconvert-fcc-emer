const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    //Reading input:
    test("Read input numbers", function(){
        assert.equal(convertHandler.getNum("3L"), "3", "Whole number input shall be read"); // typeOf, isOk ??
        assert.equal(convertHandler.getNum("3.5L"), "3.5", "Decimal number input shall be read");
        assert.equal(convertHandler.getNum("3/2L"), "1.5", "Fractional number input shall be read");
        assert.equal(convertHandler.getNum("3/1.5L"), "2", "Decimal & Fractional number input shall be read");
    });
    test("Validate incorrect & partial input", function(){
        assert.instanceOf(convertHandler.getNum("3/2/3"), Error, "Multiple fractions are not allowed");
        assert.equal(convertHandler.getNum("km"), 1, "Default number shall be '1' if none is input");
    });
    test("Read Input Units", function() {
        assert.equal(convertHandler.getUnit("12km"), "km", "Unit not correctly parsed");
        assert.equal(convertHandler.getUnit("12mi"), "mi", "Unit not correctly parsed");
        assert.equal(convertHandler.getUnit("12kg"), "kg", "Unit not correctly parsed");
        assert.equal(convertHandler.getUnit("12lbs"), "lbs", "Unit not correctly parsed");
        assert.equal(convertHandler.getUnit("12L"), "L", "Unit not correctly parsed");
        assert.equal(convertHandler.getUnit("12gal"), "gal", "Unit not correctly parsed");
        assert.instanceOf(convertHandler.getUnit("12oz"), Error, "Unit is wrong or is not valid for this conversion API");
    });
    test("Return Conversion Units", function() {
        assert.equal(convertHandler.getReturnUnit("km"), "mi", "Unit not correctly converted");
        assert.equal(convertHandler.getReturnUnit("mi"), "km", "Unit not correctly converted");
        assert.equal(convertHandler.getReturnUnit("kg"), "lbs", "Unit not correctly converted");
        assert.equal(convertHandler.getReturnUnit("lbs"), "kg", "Unit not correctly converted");
        assert.equal(convertHandler.getReturnUnit("L"), "gal", "Unit not correctly converted");
        assert.equal(convertHandler.getReturnUnit("gal"), "L", "Unit not correctly converted");
    });
    test("Spell-out Return Units", function() {
        assert.equal(convertHandler.spellOutUnit("km"), "kilometers", "Unit not correctly spelled-out");
        assert.equal(convertHandler.spellOutUnit("mi"), "miles", "Unit not correctly spelled-out");
        assert.equal(convertHandler.spellOutUnit("kg"), "kilograms", "Unit not correctly spelled-out");
        assert.equal(convertHandler.spellOutUnit("lbs"), "pounds", "Unit not correctly spelled-out");
        assert.equal(convertHandler.spellOutUnit("L"), "liters", "Unit not correctly spelled-out");
        assert.equal(convertHandler.spellOutUnit("gal"), "gallons", "Unit not correctly spelled-out");
    });
    test("Spell-out Return Units", function() {
        assert.approximately(convertHandler.convert(10, "km"), 6.21372, 0.001, "Conversion is incorrect");
        assert.approximately(convertHandler.convert(10, "mi"), 16.0934, 0.001, "Conversion is incorrect");
        assert.approximately(convertHandler.convert(10, "kg"), 22.04624, 0.001, "Conversion is incorrect");
        assert.approximately(convertHandler.convert(10, "lbs"), 4.53592, 0.001, "Conversion is incorrect");
        assert.approximately(convertHandler.convert(10, "L"),   2.64172, 0.001, "Conversion is incorrect");
        assert.approximately(convertHandler.convert(10, "gal"), 37.8541, 0.001, "Conversion is incorrect");
    });
});