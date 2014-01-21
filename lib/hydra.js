/**
 * Created with IntelliJ IDEA.
 * User: andre
 * Date: 11/16/13
 * Time: 5:30 PM
 * To change this template use File | Settings | File Templates.
 */

module.exports = (function(){
  const SERIAL_PORT = "/dev/tty.SLAB_USBtoUART";

  var Parser = require("../../lib/packet-parser")
  var bf = require("./bit-fields.js");
  var serialLib = require("serialport");
  var SerialPort = serialLib.SerialPort;

  var packetStructure = {
    pt: {start: 0, len: 8},
    addr: {start: 8, len: 8},
    ch1: {start: 16, len: 32},
    ch2: {start: 48, len: 32},
    ch3: {start: 80, len: 32},
    vIn: {start: 112, len: 32}
  }

  var sp = new SerialPort(SERIAL_PORT, {
    baudrate: 9600
  });

  var processPacket = function(packet){
    console.log("Packet: " + packet.toString("hex"));
  }

  var parser = new Parser(processPacket);

  var registerReadHandler = function() {
    sp.on("open", function() {
      sp.write(":b\r\n", function(){
        sp.on("data", function(data){
          parser.parse(data);
        });
      });
    });
  }

   return {
    test : function() {
      registerReadHandler();
    }
  };

})();





