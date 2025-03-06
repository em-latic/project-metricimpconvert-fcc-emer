'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  //const inputRegEx = ///^(\d+(\.\d+)?)(\/\d+(\.\d+)?)?(gal|L|lbs|kg|mi|km)$/; --> not used whole

  app.route('/api/convert')
  .get((req, res) => {
    const rawInput = req.query.input;   //console.log(`rawInput is: ${rawInput}`);

    const numVal = convertHandler.getNum(rawInput);   //console.log(`numVal is: ${numVal}`);
    const unit = convertHandler.getUnit(rawInput);    //console.log(`unit is: ${unit}`);

    if(numVal instanceof Error && unit instanceof Error) {
      res.status(400).send("invalid number and unit");
    }
    //validate 'numVal' ->  "invalid number" if  badly formatted -> [ const numInputRegex = /^(\d+(\.\d+)?)(\/\d+(\.\d+)?)?$/; ]
    if(numVal instanceof Error) {  //!numInputRegex.test(numVal)
      res.status(400).send("invalid number")
    }
    //validate 'unit' -> "invalid unit" if invalid -> [const unitInputRegex = /^(gal|L|lbs|kg|mi|km)$/;]
    if(unit instanceof Error){
      res.status(400).send("invalid unit");
    }

    const conversion = convertHandler.convert(numVal, unit);    //console.log(`xxx is: ${xxxx}`);
    const retUnit = convertHandler.getReturnUnit(unit);
    const speltOutUnit = convertHandler.spellOutUnit(unit);
    const speltOutRetUnit = convertHandler.spellOutUnit(retUnit);

    const message = convertHandler.getString(numVal, speltOutUnit, conversion, speltOutRetUnit);

    const response = { 
      initNum: numVal, 
      initUnit: unit, 
      returnNum: conversion, 
      returnUnit: retUnit, 
      string: message
    };

    res.json(response);
  });
};
