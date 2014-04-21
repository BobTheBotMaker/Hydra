/**
 * Created with IntelliJ IDEA.
 * User: andre
 * Date: 11/16/13
 * Time: 5:30 PM
 * To change this template use File | Settings | File Templates.
 */

module.exports = (function(){
  const SERIAL_PORT = "/dev/tty.SLAB_USBtoUART";

  var Parser = require("./packet-parser.js")
  var bf = require("./bit-fields.js");
  var serialLib = require("serialport");
  var util = require("./util.js");
  var sprintf = require("sprintf-js").sprintf;

  var SerialPort = serialLib.SerialPort;
  var reportDataCallback;

  var packetStructure = {
    hdr: 40,
    ch1: 32,
    ch2: 32,
    ch3: 32,
    vIn: 32,
    chk: 16
  }

  var channelStructure = {
    cv: 1,
    cc: 1,
    fault: 2,
    current: 12,
    volts: 16
  }

  var sp = new SerialPort(SERIAL_PORT, {
    baudrate: 9600
  });

  var reportChannel = function(ch, mv, ma) {
    var v = sprintf("%4.2f", mv / 1000);
    var a = sprintf("%4.2f", ma / 1000);

    // Don't forget the decimal point
    var chV = util.leftPad(v, "0", 5);
    var chA = util.leftPad(a, "0", 5);
    reportDataCallback(ch, chV, chA);
  }

  var processPacket = function(packet){
    var structuredPacket = bf.fromIntArray(packetStructure, packet);

    var ch1 = structuredPacket.bitField.ch1.data;
    var structuredCh1 = bf.fromBitArray(channelStructure, ch1);
    reportChannel(1, structuredCh1.bitField.volts.toBase(10), structuredCh1.bitField.current.toBase(10))

    var ch2 = structuredPacket.bitField.ch2.data;
    var structuredCh2 = bf.fromBitArray(channelStructure, ch2);
    reportChannel(2, structuredCh2.bitField.volts.toBase(10), structuredCh2.bitField.current.toBase(10))

    var ch3 = structuredPacket.bitField.ch3.data;
    var structuredCh3 = bf.fromBitArray(channelStructure, ch3);
    reportChannel(3, structuredCh3.bitField.volts.toBase(10), structuredCh3.bitField.current.toBase(10))
  }

  var parser = new Parser(processPacket);

  var serialDataHandler = function (data) {
    var buffer = new Buffer(data);
    for(var i = 0; i < buffer.length; i++) {
      parser.parse(buffer[i]);
    }
  }

  var writeErrorHandler = function (error, results) {
    if(error) {
      console.log('Error ' + error)
    }
  }

  var goToBinaryMode = function() {
    sp.write(":b\r\n", writeErrorHandler)
  }

  var initHydra = function () {
    sp.on("open", goToBinaryMode)
  }

  var serialSetup = function () {
    initHydra();
    sp.on("data", serialDataHandler)
  }

  return {
    connect : function(callback) {
      reportDataCallback = callback;
      serialSetup(callback);
    }
  };

})();