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
    f4: {start: 0, len: 7},
    f5: {start: 5},
    f6: {start: 3},
    f7: {start: 1, len: 8},
    f8: {start: 0, len: 9}
  };

  it("should handle single bit fields", function(){
    var ba = new bf.BitField(structure, bitArray);

    expect(ba.bitField.f5.data).toEqual([0]);
    expect(ba.bitField.f6.data).toEqual([1]);

    expect(ba.bitField.f5.toBase(10)).toEqual("0");
    expect(ba.bitField.f6.toBase(10)).toEqual("1");

  })

  it("should split an array based on structure", function(){
    var ba =  new bf.BitField(structure, bitArray);

    expect(ba.bitField.f1.data).toEqual([1, 1, 0, 1, 1]);
    expect(ba.bitField.f2.data).toEqual([1, 0, 1]);
    expect(ba.bitField.f3.data).toEqual([1, 1, 1]);
    expect(ba.bitField.f4.data).toEqual([1, 1, 0, 1, 1, 0, 1]);
    expect(ba.bitField.f7.data).toEqual([1, 0, 1, 1, 0, 1, 1, 1]);
  })

  it("should split a string based on structure", function(){
    var ba =  new bf.BitField(structure, bitString);

    expect(ba.bitField.f1.data).toEqual([1, 1, 0, 1, 1]);
    expect(ba.bitField.f2.data).toEqual([1, 0, 1]);
    expect(ba.bitField.f3.data).toEqual([1, 1, 1]);
    expect(ba.bitField.f4.data).toEqual([1, 1, 0, 1, 1, 0, 1]);
  })

  it("should convert to base 10 from a bit array", function(){
    var ba =  new bf.BitField(structure, bitArray);

    expect(ba.bitField.f1.toBase(10)).toEqual("27");
  })

  it("should convert to base 10 from a bit string", function(){
    var ba =  new bf.BitField(structure, bitArray);

    expect(ba.bitField.f3.toBase(10)).toEqual("7");
  })

  it("should convert bits to octet strings", function(){
    var ba =  new bf.BitField(structure, bitArray);

    expect(ba.bitField.f4.toOctets().length).toEqual(8);
    expect(ba.bitField.f5.toOctets().length).toEqual(8);
    expect(ba.bitField.f7.toOctets().length).toEqual(8);
    expect(ba.bitField.f8.toOctets().length).toEqual(16);
  })

  it("should convert a known bit string to a buffer", function(){
    var ABCs = "1000000100000110000101000011";
    var ABC_Struct = {
      f1: {start: 0, len: 7},
      f2: {start: 7, len: 7},
      f3: {start: 14, len: 7},
      f4: {start: 21, len: 7}
    }

    var ba =  new bf.BitField(ABC_Struct, ABCs);
    expect(ba.toBuffer()).toEqual(['@','A','B','C']);
  })

});