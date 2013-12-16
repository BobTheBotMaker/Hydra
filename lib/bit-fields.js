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

    if(typeof data === "string") {
      data = data.split("");

      for(var i = 0; i < data.length; i++) {
        data[i] = parseInt(data[i]);
      }
    }

    for(var field in structure){
      if(typeof structure[field].len === "undefined") {
        structure[field].len = 1;
      }

      var fieldData = data.slice(structure[field].start, (structure[field].len + structure[field].start));
      this.bitField[field] = new ConvertableField(fieldData);
    }
    return(this.bitField);
  }

  BitField.prototype.toBuffer = function(){
    var ret = [];
    for(var field in this.bitField){
      var octets = field.toOctets();
      for(var x = 0; x < octets.length; x += 7){
        sub = octets.substr(x, 8)
        ret.push(String.fromCharCode(parseInt(sub, 2)))
        console.log("Sub: " + sub)
      }
    }
    return (ret);
  }

  return {
    BitField : BitField
  };

})();