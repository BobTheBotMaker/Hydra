/**
 * Created with IntelliJ IDEA.
 * User: andre
 * Date: 11/26/13
 * Time: 4:31 PM
 * To change this template use File | Settings | File Templates.
 */

describe("The Display test suite", function(){

  it("should be true", function(){
    expect(true).toBe(true);
  })

  it("should return a channel name", function(){
    var d = HydraDisplay("display1v", "#ff2c0f", "#331605");

    expect(d.channel).toBe("display1");
  })

  it("should measure volts", function(){
    var d = HydraDisplay("display1v", "#ff2c0f", "#331605");

    expect(d.measures).toBe("v");
  })

})