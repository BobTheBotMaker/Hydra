/**
 * Created with IntelliJ IDEA.
 * User: andre
 * Date: 11/26/13
 * Time: 4:31 PM
 * To change this template use File | Settings | File Templates.
 */

describe("The Server test suite", function(){

  var p = require("../../lib/packet-parser")
  var packet = [0x00,0x00,0x00,0x73, 0x00, 0x00, 0x6E, 0x00, 0x70, 0x00,0x73, 0x6E, 0x70, 0x00];

  it("should print yea", function(){
    var parser = new p.Parser();
    packet.forEach(parser.parse);
  })

})
