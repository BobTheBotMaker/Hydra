/**
 * Created with IntelliJ IDEA.
 * User: andre
 * Date: 11/26/13
 * Time: 4:31 PM
 * To change this template use File | Settings | File Templates.
 */

describe("The Server test suite", function(){

  var p = require("../../lib/packet-parser")
  var packet = "11111111111111111111111111111111";

  it("should be true", function(){
    expect(true).toBe(true);
  })

  it("should return mV and mA", function(){
      var vals = p.parse(packet);

      expect(vals.mV).toBe(32767);
      expect(vals.mA).toBe(4095);
    }
  )
})
