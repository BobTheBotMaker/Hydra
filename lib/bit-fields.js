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

  BitField.fromString = function(structure, data){
    var dataArray = []
    for(var i = 0; i < data.length; i++) {
      dataArray[i] = parseInt(data[i]);
    }
    return ( new BitField(structure, dataArray) );
  }

  BitField.fromArray = function(structure, data){
    return ( new BitField(structure, data) )
  }

  BitField.fromBuffer = function(structure, data){
    var bitString = "";

    for(var i =0; i < data.length; i++){
      bitString = bitString + (parseInt(data[i]).toString(2));
    }
    return ( new BitField(structure, bitString.split("")) );
  }

  return {
    fromString : BitField.fromString,
    fromArray : BitField.fromArray,
    fromBuffer : BitField.fromBuffer
  };

})();
