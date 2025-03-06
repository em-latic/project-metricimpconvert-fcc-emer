const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    //1 - Reading input [whole number]:
    test("1- Read whole number input", function(){
        assert.equal(convertHandler.getNum("3L"), "3", "Whole number input shall be read"); // typeOf, isOk ??      
    });
    //2 - Reading input [decimal number]:
    test("2- Read decimal number input", function(){
        assert.equal(convertHandler.getNum("3.5L"), "3.5", "Decimal number input shall be read");
    });
    //3 - Reading input [fractional number]:
    test("3- Read fractional number input", function(){
        assert.equal(convertHandler.getNum("3/2L"), "1.5", "Fractional number input shall be read");
    });
    //4 - Reading input [complex number]:
    test("4- Read decimal & fractional number input", function(){
        assert.equal(convertHandler.getNum("3/1.5L"), "2", "Decimal & Fractional number input shall be read");
    });
    //5 - Reading invalid input [double-fraction]:
    test("5- Handle double-fraction number input", function(){
        assert.instanceOf(convertHandler.getNum("3/2/3"), Error, "Multiple fractions are not allowed");
    });
    //6 - Reading incomplete input [default number]:
    test("6- Validate incorrect & partial input", function(){
        assert.equal(convertHandler.getNum("km"), 1, "Default number shall be '1' if none is input");
    });
    //7 - Read input [units]:
    test("Read Input Units", function() {
        assert.equal(convertHandler.getUnit("12km"), "km", "Unit not correctly parsed");
        assert.equal(convertHandler.getUnit("12mi"), "mi", "Unit not correctly parsed");
        assert.equal(convertHandler.getUnit("12kg"), "kg", "Unit not correctly parsed");
        assert.equal(convertHandler.getUnit("12lbs"), "lbs", "Unit not correctly parsed");
        assert.equal(convertHandler.getUnit("12L"), "L", "Unit not correctly parsed");
        assert.equal(convertHandler.getUnit("12gal"), "gal", "Unit not correctly parsed");
    });
    //8 - Invalid input [unit]:
    test("8- Validate incorrect input unit", function(){
        assert.instanceOf(convertHandler.getUnit("12oz"), Error, "Unit is wrong or is not valid for this conversion API");
    });
    //9 - Return [units]:
    test("Return Conversion Units", function() {
        assert.equal(convertHandler.getReturnUnit("km"), "mi", "Unit not correctly converted");
        assert.equal(convertHandler.getReturnUnit("mi"), "km", "Unit not correctly converted");
        assert.equal(convertHandler.getReturnUnit("kg"), "lbs", "Unit not correctly converted");
        assert.equal(convertHandler.getReturnUnit("lbs"), "kg", "Unit not correctly converted");
        assert.equal(convertHandler.getReturnUnit("L"), "gal", "Unit not correctly converted");
        assert.equal(convertHandler.getReturnUnit("gal"), "L", "Unit not correctly converted");
    });
    //10 - Spell-out [units]:
    test("Spell-out Return Units", function() {
        assert.equal(convertHandler.spellOutUnit("km"), "kilometers", "Unit not correctly spelled-out");
        assert.equal(convertHandler.spellOutUnit("mi"), "miles", "Unit not correctly spelled-out");
        assert.equal(convertHandler.spellOutUnit("kg"), "kilograms", "Unit not correctly spelled-out");
        assert.equal(convertHandler.spellOutUnit("lbs"), "pounds", "Unit not correctly spelled-out");
        assert.equal(convertHandler.spellOutUnit("L"), "liters", "Unit not correctly spelled-out");
        assert.equal(convertHandler.spellOutUnit("gal"), "gallons", "Unit not correctly spelled-out");
    });
    //11 - Convert unit [km to mi]:
    test("Convert Units [km to mi]", function() {
        assert.approximately(convertHandler.convert(10, "km"), 6.21372, 0.001, "Conversion is incorrect");
    });
    //12 - Convert unit [mi to km]:
    test("Convert Units [mi to km]", function() {
        assert.approximately(convertHandler.convert(10, "mi"), 16.0934, 0.001, "Conversion is incorrect");
    });
    //13 - Convert unit [kg to lbs]:
    test("Convert Units [kg to lbs]", function() {
        assert.approximately(convertHandler.convert(10, "kg"), 22.04624, 0.001, "Conversion is incorrect");
    });
    //14 - Convert unit [lbs to kg]:
    test("Convert Units [lbs to kg]", function() {
        assert.approximately(convertHandler.convert(10, "lbs"), 4.53592, 0.001, "Conversion is incorrect");
    });
    //15 - Convert unit [L to gal]:
    test("Convert Units [L to gal]", function() {
        assert.approximately(convertHandler.convert(10, "L"),   2.64172, 0.001, "Conversion is incorrect");
    });
    //16 - Convert unit [gal to L]:
    test("Convert Units [gal to L]", function() {
        assert.approximately(convertHandler.convert(10, "gal"), 37.8541, 0.001, "Conversion is incorrect");
    });
});