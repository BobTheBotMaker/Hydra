module.exports = (function(){

  function ConvertibleField(data) {
    this.data = data;

    this.leftPad = function(s, c, n) {
      if (! s || ! c || s.length >= n) {
        return s;
      }

      var max = (n - s.length)/c.length;
      for (var i = 0; i < max; i++) {
        s = c + s;
      }

      return s;
    }
  }

  ConvertibleField.prototype.toOctets = function() {
    if ((this.data.length % 8) == 0){
      var ret = this.data.join("");
    } else {
      var bits_to_pad = this.data.length + (8 - (this.data.length % 8));
      var ret = this.leftPad(this.data.join(""), "0", bits_to_pad);
    }
    return (ret);
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
