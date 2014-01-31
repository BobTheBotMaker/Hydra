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

  BitField.prototype.toBuffer = function(){
    var ret = [];
    for(var field in this.bitField){
      var octets = this.bitField[field].toOctets();
      for(var x = 0; x < octets.length; x += 8){
        var sub = octets.substr(x, 8)
        ret.push(String.fromCharCode(parseInt(sub, 2)))
      }
    }
    console.log("ret: " + new Buffer(ret).toString("hex"));
    return (new Buffer(ret));
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
