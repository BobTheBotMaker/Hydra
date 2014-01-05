/**
 * Created with IntelliJ IDEA.
 * User: andre
 * Date: 11/16/13
 * Time: 5:30 PM
 * To change this template use File | Settings | File Templates.
 */

module.exports = (function(){
  const SERIAL_PORT = "/dev/cu.SLAB_USBtoUART";

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
    baudrate: 9600,
    parser: serialLib.parsers.readline("snp", "ascii")
  });

  var registerReadHandler = function() {
    sp.on("open", function() {
      sp.write(":b\r\n", function(err, results){
        sp.on("data", function(data){
          var tmp= new Buffer(data, "ascii");
          var packetData = bf.fromBuffer(packetStructure, tmp);
            console.log("Pt: " + packetData.bitField.pt.data + " Addr: " + packetData.bitField.addr.data + " V in: " + packetData.bitField.vIn.data);
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





