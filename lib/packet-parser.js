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
    var mA_bits = packet.slice(16,27)
    var mA_ba = ba.factory(mA_bits)

    return (mA_ba.toNumber());
  }

  var parse = function(packet){

    var bits = ba.factory(packet);

    var mV = extract_mV_from_packet(packet);
    var mA = extract_mA_from_packet(packet);

    return {
      mV : mV,
      mA : mA
    }
  }

  return {
    parse : parse
  };

})();
