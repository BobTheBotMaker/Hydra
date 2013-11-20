/**
 * Created with IntelliJ IDEA.
 * User: andre
 * Date: 11/16/13
 * Time: 5:30 PM
 * To change this template use File | Settings | File Templates.
 */


var hydraCommInterface = (function(){
  const SERIAL_PORT = "/dev/cu.SLAB_USBtoUART";

  var SerialPort = require("serialport").SerialPort;
  var serialPort = new SerialPort(SERIAL_PORT, {
    baudrate: 9600
  });

})();





