/**
 * Created with IntelliJ IDEA.
 * User: andre
 * Date: 12/13/13
 * Time: 11:47 AM
 * To change this template use File | Settings | File Templates.
 */

module.exports = (function(){

  var ConvertableField = require("./ConvertableField.js");

  var BitField = function(structure, data){
    this.bitField = {};

    for(var field in structure){
      if(typeof structure[field].len === "undefined"){
        structure[field].len = 1;
      }

      var fieldData = data.slice(structure[field].start, (structure[field].len + structure[field].start));
      this.bitField[field] = new ConvertableField(fieldData);
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
      bitString = bitString + parseInt(data[i]).toString(2);
    }
    return ( new BitField(structure, bitString.split("")) );
  }

  BitField.prototype.toBuffer = function(){
    var ret = [];
    for(var field in this.bitField){
      var octets = this.bitField[field].toOctets();
      for(var x = 0; x < octets.length; x += 8){
        sub = octets.substr(x, 8)
        ret.push(String.fromCharCode(parseInt(sub, 2)))
      }
    }
    return (ret);
  }

  return {
    fromString : BitField.fromString,
    fromArray : BitField.fromArray,
    fromBuffer : BitField.fromBuffer
  };

})();