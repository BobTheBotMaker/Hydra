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
  });

  var registerReadHandler = function() {
    serialPort.on("open", function() {
      console.log("open");
      serialPort.write(":b\r\n", function(err, results){
        console.log('err ' + err);
        console.log('results ' + results);
        serialPort.on("data", function(data){
          console.log("Data: " + data);
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





