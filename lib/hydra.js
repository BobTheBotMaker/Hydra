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
  var SerialPort = serialLib.SerialPort;

  var packetStructure = {
    s: 8,
    n: 8,
    p: 8,
    pt: 8,
    addr: 8,
    ch1: 32,
    ch2: 32,
    ch3: 32,
    vIn: 32
  }

  var sp = new SerialPort(SERIAL_PORT, {
    baudrate: 9600
  });

  var processPacket = function(packet){
    console.log("Raw Packet: " + packet.toString("hex"));
    var structuredPacket = bf.fromBuffer(packetStructure, packet);
    console.log("Structured Packet " + structuredPacket.bitField.s.data + " " + structuredPacket.bitField.n.data + " " + structuredPacket.bitField.p.data);
  }

  var parser = new Parser(processPacket);

  var serialDataHandler = function (data) {
    var buffer = new Buffer(data);
    console.log("Length: " + buffer.length);
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
    test : function() {
      serialSetup();
    }
  };

})();





