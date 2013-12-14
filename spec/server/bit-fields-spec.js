/**
 * Created with IntelliJ IDEA.
 * User: andre
 * Date: 12/13/13
 * Time: 11:58 AM
 * To change this template use File | Settings | File Templates.
 */

describe("Bit fields test suite", function () {

  var bf = require("../../lib/bit-fields.js");

  var bitString = "1101101111";
  var bitArray = [1, 1, 0, 1, 1, 0, 1, 1, 1, 1];

  var structure = {
    f1: {start: 0, len: 5},
    f2: {start: 4, len: 3},
    f3: {start: 7, len: 4},
    f5: {start: 5},
    f6: {start: 3}
  };

  it("should handle single bit fields", function(){
    var ba = bf.build(structure, bitArray);

    expect(ba.f5.data).toEqual([0]);
    expect(ba.f6.data).toEqual([1]);

    expect(ba.f5.toBase(10)).toEqual("0");
    expect(ba.f6.toBase(10)).toEqual("1");

  })

  it("should split an array based on structure", function(){
    var ba = bf.build(structure, bitArray);

    expect(ba.f1.data).toEqual([1, 1, 0, 1, 1]);
    expect(ba.f2.data).toEqual([1, 0, 1]);
    expect(ba.f3.data).toEqual([1, 1, 1]);
  })

  it("should split a string based on structure", function(){
    var ba = bf.build(structure, bitString);

    expect(ba.f1.data).toEqual([1, 1, 0, 1, 1]);
    expect(ba.f2.data).toEqual([1, 0, 1]);
    expect(ba.f3.data).toEqual([1, 1, 1]);
  })

  it("should convert to base 10 from a bit array", function(){
    var ba = bf.build(structure, bitArray);

    expect(ba.f1.toBase(10)).toEqual("27");
  })

  it("should convert to base 10 from a bit string", function(){
    var ba = bf.build(structure, bitArray);

    expect(ba.f3.toBase(10)).toEqual("7");
  })

});