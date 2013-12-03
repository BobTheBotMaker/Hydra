/**
 * Created with IntelliJ IDEA.
 * User: andre
 * Date: 11/16/13
 * Time: 5:30 PM
 * To change this template use File | Settings | File Templates.
 */

module.exports = (function(){
  const SERIAL_PORT = "/dev/cu.SLAB_USBtoUART";

  var serialport = require("serialport");
  var SerialPort = serialport.SerialPort;

  var sp = new SerialPort(SERIAL_PORT, {
    baudrate: 9600,
    parser: serialport.parsers.readline("snp")
  });

  var registerReadHandler = function() {
    sp.on("open", function() {
      sp.write(":b\r\n", function(err, results){
        sp.on("data", function(data){
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





