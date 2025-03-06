const { init } = require("../server");

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    const unitRegEx = /[a-zA-Z]/;
    const unitIndex = input.search(unitRegEx);

    if(unitIndex == 0) {
      return 1;   // return default '1' when no number entered
    }
    else if(unitIndex == -1){
      result = input.slice(0);  // return the whole input when no unit given
    }
    else {
      result = input.slice(0,unitIndex);
    }
    
    const fractionalRegEx = /^(\d+(\.\d+)?)(\/\d+(\.\d+)?)?$/;
    if(fractionalRegEx.test(result)){
      result = eval(result);         // needs to be evaluated if it is fractional -> division. If whole/decimal, no change
    }
    else{
      return new Error("Invalid Number!");   
    }

    return result;
    //inline: input.slice(0, input.search(/[a-zA-Z]/));
  };
  
  this.getUnit = function(input) {
    let result;
    const unitRegEx = /[a-zA-Z]/;
    const unitIndex = input.search(unitRegEx);
    
    result = input.slice(unitIndex);
    result = result.toLowerCase();
    if (result == 'l') result = 'L';

    //validate 'unit' -> "invalid unit" if invalid 
    const unitInputRegex = /^(gal|L|lbs|kg|mi|km)$/;
    if(!unitInputRegex.test(result)){
      return new Error("Invalid Unit!");
    }
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    switch(initUnit) {
      case 'km':
        result = 'mi'
        break;
      case 'mi':
        result = 'km'
        break;
      case 'kg':
          result = 'lbs'
          break;
      case 'lbs':
          result = 'kg'
          break;
      case 'L':
      case 'l':
        result = 'gal'
        break;
      case 'gal':
        result = 'L'
        break;
      default:
        //
    } 
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    switch(unit) {
      case 'km':
        result = 'kilometers'
        break;
      case 'mi':
        result = 'miles'
        break;
      case 'kg':
          result = 'kilograms'
          break;
      case 'lbs':
          result = 'pounds'
          break;
      case 'L':
      case 'l':
        result = 'liters'
        break;
      case 'gal':
        result = 'gallons'
        break;
      default:
        //
    } 

    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    switch(initUnit) {
      case 'km':
        result = initNum / miToKm;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'kg':
          result = initNum / lbsToKg;
          break;
      case 'lbs':
          result = initNum * lbsToKg;
          break;
      case 'L':
      case 'l':
        result = initNum / galToL;
        break;
      case 'gal':
        result = initNum * galToL;
        break;
      default:
        //
    } 

    return result; //.toFixed(5)
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${initUnit} converts to ${returnNum.toFixed(5)} ${returnUnit}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
