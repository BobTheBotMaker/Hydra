/**
 * Created with IntelliJ IDEA.
 * User: andre
 * Date: 11/16/13
 * Time: 5:30 PM
 * To change this template use File | Settings | File Templates.
 */

module.exports = (function(){
  const SERIAL_PORT = "/dev/cu.SLAB_USBtoUART";

  var SerialPort = require("serialport").SerialPort;

  var serialPort = new SerialPort(SERIAL_PORT, {
    baudrate: 9600
  }, false);

  var registerReadHandler = function() {
    console.log("registering read handler");
    serialPort.on("data", function(data){
      console.log("Data: " + data);
    });
  }

  var SPWrite = function(data) {
    serialPort.write(data, function(err, results){
      console.log('err ' + err);
      console.log('results ' + results);
    });
  }

  var enableBinaryMode = function() {
      SPWrite("\n\n\n:b\n");
    }

  return {
    test : function() {
      serialPort.open();
      enableBinaryMode();
      registerReadHandler();
    }
  };

})();





