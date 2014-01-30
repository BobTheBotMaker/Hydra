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
    f1: 1,
    f2: 3,
    f3: 4,
    f4: 2
  };

  var structure2 = {
    f1: 3,
    f2: 1,
    f3: 5,
    f4: 1
  };

  it("should handle field 1 length > 1", function(){
    var ba = bf.fromArray(structure2, bitArray);

    expect(ba.bitField.f1.data).toEqual([1, 1, 0]);

  })

  it("should handle last field length = 1", function(){
    var ba = bf.fromArray(structure2, bitArray);

    expect(ba.bitField.f4.data).toEqual([1]);

  })

  it("should split an array based on structure", function(){
    var ba = bf.fromArray(structure, bitArray);

    expect(ba.bitField.f1.data).toEqual([1]);
    expect(ba.bitField.f2.data).toEqual([1, 0, 1]);
    expect(ba.bitField.f3.data).toEqual([1, 0, 1, 1]);
    expect(ba.bitField.f4.data).toEqual([1, 1]);
  })

  it("should split a string based on structure", function(){
    var ba = bf.fromString(structure, bitString);

    expect(ba.bitField.f1.data).toEqual([1]);
    expect(ba.bitField.f2.data).toEqual([1, 0, 1]);
    expect(ba.bitField.f3.data).toEqual([1, 0, 1, 1]);
    expect(ba.bitField.f4.data).toEqual([1, 1]);
  })

  it("should convert to base 10 from a bit array", function(){
    var ba = bf.fromArray(structure, bitArray);

    expect(ba.bitField.f1.toBase(10)).toEqual("1");
    expect(ba.bitField.f3.toBase(10)).toEqual("11");
  })

  it("should convert to base 10 from a bit string", function(){
    var ba = bf.fromArray(structure, bitArray);

    expect(ba.bitField.f3.toBase(10)).toEqual("11");
  })

  it("should convert bits to octet strings", function(){
    var ba = bf.fromArray(structure, bitArray);

    expect(ba.bitField.f4.toOctets().length).toEqual(8);
  })

  it("should convert a known bit string to a buffer", function(){
    var ABCs = "1000000100000110000101000011";
    var ABC_Struct = {
      f1: {start: 0, len: 7},
      f2: {start: 7, len: 7},
      f3: {start: 14, len: 7},
      f4: {start: 21, len: 7}
    }

    var ba = bf.fromString(ABC_Struct, ABCs);
    expect(ba.toBuffer()).toEqual(['@','A','B','C']);
  })

  it("should take a buffer and create a bit array", function(){
    var inputBuffer = new Buffer("Andre");
    var buffStruct = {
      f1: {start: 0, len: 7},
      f2: {start: 7, len: 7},
      f3: {start: 14, len: 7},
      f4: {start: 21, len: 7},
      f5: {start: 28, len: 7}
    }
    var ba = bf.fromBuffer(buffStruct, inputBuffer);

    expect(ba.toBuffer()).toEqual(['A','n','d','r','e'])
  })
});