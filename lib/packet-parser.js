/**
 * Created with IntelliJ IDEA.
 * User: andre
 * Date: 11/27/13
 * Time: 2:50 PM
 * To change this template use File | Settings | File Templates.
 */

module.exports = (function(){
  var ba = require("node-bitarray");

  var extract_mV_from_packet = function(packet){
    var mV_bits = packet.slice(0,15)
    var mV_ba = ba.factory(mV_bits)

    return (mV_ba.toNumber());
  }

  var extract_mA_from_packet = function(packet){
    var mA_bits = packet.slice(16,28)
    var mA_ba = ba.factory(mA_bits)

    return (mA_ba.toNumber());
  }

  var convert_to_bits = function(buffer){
    var output = "";
    var i;

    for(i = 0; i < buffer.length; i++) {
      output += buffer[i].charCodeAt(0).toString(2)
    }
    return (output);
  }

  var parse = function(packet){

    var buffer = convert_to_bits(packet);
    var bits = ba.factory(buffer);

    var mV = extract_mV_from_packet(bits);
    var mA = extract_mA_from_packet(bits);

    return {
      mV : mV,
      mA : mA
    }
  }

  return {
    parse : parse
  };

})();
