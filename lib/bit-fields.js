/**
 * Created with IntelliJ IDEA.
 * User: andre
 * Date: 12/13/13
 * Time: 11:47 AM
 * To change this template use File | Settings | File Templates.
 */

module.exports = (function(){

  function ConvertableField(data) {
    this.data = data;
  }

  ConvertableField.prototype.toString = function(){
    return (this.data.join(""));
  }

  ConvertableField.prototype.toBase = function(base){
    var x = parseInt(this.data, 2);
    var y = x.toString(base);

    return(y);
  }

  ConvertableField.prototype.toNumber = function(){
    var ret = 0;

    for(var i = 0; i < this.data.length; i++) {
      if( this.data[i] != 0) {
        ret += Math.pow(2,(i));
      }
    }
    return (ret);
  }

  var build = function(structure, data){
    var bitField = {};

    if(typeof data === "string") {
      data = data.split("");

      for(var i = 0; i < data.length; i++) {
        data[i] = parseInt(data[i]);
      }
    }

    for(var field in structure){
      var fieldData = data.slice(structure[field].start, (structure[field].len + structure[field].start));
      bitField[field] = new ConvertableField(fieldData);
    }
    return(bitField);
  }

  return {
    build : build
  };

})();