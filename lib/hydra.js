/**
 * Created with IntelliJ IDEA.
 * User: andre
 * Date: 11/16/13
 * Time: 5:30 PM
 * To change this template use File | Settings | File Templates.
 */

module.exports = (function(){
  const SERIAL_PORT = "/dev/cu.SLAB_USBtoUART";

  var packetParser = require("./packet-parser.js");
  var serialLib = require("serialport");
  var SerialPort = serialLib.SerialPort;

  var sp = new SerialPort(SERIAL_PORT, {
    baudrate: 9600,
    parser: serialLib.parsers.readline("snp", "ascii")
  });

  var registerReadHandler = function() {
    sp.on("open", function() {
      sp.write(":b\r\n", function(err, results){
        sp.on("data", function(data){
          var packetData = packetParser.parse(data);
            console.log("Mv: " + packetData.mV + " mA: " + packetData.mA);
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





