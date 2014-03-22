module.exports = (function(){

  function ConvertibleField(data) {
    this.data = data;
  }

  ConvertibleField.prototype.toString = function(){
    return (this.data.join(""));
  }

  ConvertibleField.prototype.toBase = function(base){
    var x = parseInt(this.data.join(""), 2);
    var y = x.toString(base);

    return(y);
  }

  ConvertibleField.prototype.toNumber = function(){
    var ret = 0;

    for(var i = 0; i < this.data.length; i++) {
      if( this.data[i] != 0) {
        ret += Math.pow(2,(i));
      }
    }
    return (ret);
  }

  return ConvertibleField;

})()
