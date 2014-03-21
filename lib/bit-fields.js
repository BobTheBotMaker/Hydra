/**
 * Created with IntelliJ IDEA.
 * User: andre
 * Date: 12/13/13
 * Time: 11:47 AM
 * To change this template use File | Settings | File Templates.
 */

module.exports = (function(){

  var ConvertibleField = require("./ConvertibleField.js");

  var BitField = function(structure, data){
    this.bitField = {};
    var index = 0;

    for(var field in structure){
      var length = structure[field] + index;
      var fieldData = data.slice(index, length);
      this.bitField[field] = new ConvertibleField(fieldData);
      index += structure[field];
    }
  }

  BitField.fromBitString = function(structure, data){
    var dataArray = []
    for(var i = 0; i < data.length; i++) {
      dataArray[i] = parseInt(data[i]);
    }
    return ( new BitField(structure, dataArray) );
  }

  BitField.fromBitArray = function(structure, data){
    return ( new BitField(structure, data) )
  }

  BitField.fromIntArray = function(structure, data){
    var bitArray = [];

    var leftPad = function(s, c, n) {
      if (! s || ! c || s.length >= n) {
        return s;
      }
      var max = (n - s.length)/c.length;
      for (var i = 0; i < max; i++) {
        s = c + s;
      }
      return s;
    }

    var binaryParseInt = function(str) {
      return parseInt(str, 2)
    }

    for(var i = 0; i < data.length; i++){
      var bitString = parseInt(data[i]).toString(2);
      var paddedBitString = leftPad(bitString, "0", 8).split("");
      var paddedBitArray = paddedBitString.map(binaryParseInt);
      for(var x = 0; x < paddedBitArray.length; x++){
        bitArray.push(paddedBitArray[x]);
      }
    }

    return ( new BitField(structure, bitArray) );
  }

  return {
    fromBitString : BitField.fromBitString,
    fromBitArray : BitField.fromBitArray,
    fromIntArray : BitField.fromIntArray
  };

})();
