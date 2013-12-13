/**
 * Created with IntelliJ IDEA.
 * User: andre
 * Date: 12/13/13
 * Time: 11:58 AM
 * To change this template use File | Settings | File Templates.
 */

describe("Bit fields test suite", function(){

  var bf = require("../../lib/bit-fields.js");

  var bitString = "11011011110011001100101";
  var bitArray = [1,1,0,1,1,0,1,1,1,1,0,0,1,1,0,0,1,1,0,0,1,0,1];

  it("should split an array based on structure", function(){
    var structure = {
      f1: {start: 0, len: 5},
      f2: {start: 0, len: 5},
      f3: {start: 0, len: 5}
    }
    var ba = bf.build(structure, bitArray);
    console.log("ba: " + ba.f1);
    expect(ba.f1).toBe([1,1,0,1,1]);
  })
})