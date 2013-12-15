/**
 * Created with IntelliJ IDEA.
 * User: andre
 * Date: 11/27/13
 * Time: 2:50 PM
 * To change this template use File | Settings | File Templates.
 */

module.exports = (function(){
  var ba = require("node-bitarray");

  var extract_ch1_from_packet = function(packet){
    ch1_bits = packet.slice(16,48);
    return(ch1_bits);
  }

  var extract_ch2_from_packet = function(packet){
    ch1_bits = packet.slice(48,80);
    return(ch1_bits);
  }

  var extract_ch3_from_packet = function(packet){
    ch1_bits = packet.slice(80,112);
    return(ch1_bits);
  }

  var extract_Vin_status_from_packet = function(packet){
    ch1_bits = packet.slice(113, 145);
    return(ch1_bits);
  }

  var extract_mV_in_from_packet = function(packet){
    var mV_bits = packet.slice(0,16);
    var mV_ba = ba.factory(mV_bits);

    return (mV_ba.toNumber());
  }

  var extract_mV_from_packet = function(packet){
    var mV_bits = packet.slice(17,33);
    var mV_ba = ba.factory(mV_bits);

    return (mV_ba.toNumber());
  }

  var extract_mA_from_packet = function(packet){
    var mA_bits = packet.slice(5,17);
    var mA_ba = ba.factory(mA_bits);

    return (mA_ba.toNumber());
  }

  var left_pad = function(s, c, n) {
    if (! s || ! c || s.length >= n) {
      return s;
    }

    var max = (n - s.length)/c.length;
    for (var i = 0; i < max; i++) {
      s = c + s;
    }

    return s;
  }

  var convert_to_bits = function(buffer){
    var output = "";
    var i;

    for(i = 0; i < buffer.length; i++) {
      output += left_pad(buffer[i].charCodeAt(0).toString(2), "0", 8);
    }
    return (output);
  }

  var parse = function(packet){
    var buffer = convert_to_bits(packet);
    var bits = ba.factory(buffer);

    console.log(bits.toString());

    var mV = extract_mV_from_packet(extract_ch2_from_packet(bits));
    var mA = extract_mA_from_packet(extract_ch2_from_packet(bits));
    var mVin = extract_mV_in_from_packet(extract_Vin_status_from_packet(bits));

    return {
      mV : mV,
      mA : mA,
      mVin : mVin
    }
  }

  return {
    parse : parse
  };

})();
