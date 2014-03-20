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
  var intArray = [115,110,112,208,85,128,0]

  var intStructure = {
    f1: 8,
    f2: 8,
    f3: 8,
    f4: 8,
    f5: 8,
    f6: 8,
    f7: 8
  }

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
    var ba = bf.fromBitArray(structure2, bitArray);

    expect(ba.bitField.f1.data).toEqual([1, 1, 0]);

  })

  it("should handle last field length = 1", function(){
    var ba = bf.fromBitArray(structure2, bitArray);

    expect(ba.bitField.f4.data).toEqual([1]);

  })

  it("should split an array based on structure", function(){
    var ba = bf.fromBitArray(structure, bitArray);

    expect(ba.bitField.f1.data).toEqual([1]);
    expect(ba.bitField.f2.data).toEqual([1, 0, 1]);
    expect(ba.bitField.f3.data).toEqual([1, 0, 1, 1]);
    expect(ba.bitField.f4.data).toEqual([1, 1]);
  })

  it("should split a string based on structure", function(){
    var ba = bf.fromBitString(structure, bitString);

    expect(ba.bitField.f1.data).toEqual([1]);
    expect(ba.bitField.f2.data).toEqual([1, 0, 1]);
    expect(ba.bitField.f3.data).toEqual([1, 0, 1, 1]);
    expect(ba.bitField.f4.data).toEqual([1, 1]);
  })

  it("should convert to base 10 from a bit array", function(){
    var ba = bf.fromBitArray(structure, bitArray);

    expect(ba.bitField.f1.toBase(10)).toEqual("1");
    expect(ba.bitField.f3.toBase(10)).toEqual("11");
  })

  it("should convert to base 10 from a bit string", function(){
    var ba = bf.fromBitArray(structure, bitArray);

    expect(ba.bitField.f3.toBase(10)).toEqual("11");
  })

  it("should convert bits to octet strings", function(){
    var ba = bf.fromBitArray(structure, bitArray);

    expect(ba.bitField.f4.toOctets().length).toEqual(8);
  })

  it("should convert an int array to bits", function(){
    var ba = bf.fromIntArray(intStructure, intArray);

    expect(ba.bitField.f1.data).toEqual([0,1,1,1,0,0,1,1])
  })

});