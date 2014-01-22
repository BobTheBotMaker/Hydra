
module.exports = (function(){
  var header_bytes = new Buffer([0x73, 0x6E, 0x70]);

  var Parser = function(callback){
    var index = 0;
    var currentState = new ReadStart();

    this.emitterCallback = callback;
    this.step = 0;
    this.packet = new Buffer(23);

    this.save = function(byte){
      this.packet[index] = byte;
      index++;
    }

    this.resetIndex = function(){
      index = 0;
    }

    this.resetStep = function(){
      this.step = 0;
    }

    this.parse = function(byte){
      console.log("Step: " + this.step + " State: " + currentState.name + " Byte: " + byte.toString(16));
      this.step++
      currentState = currentState.handle(byte, this);
    }
  }

  var ResetParser = function(){
    this.handle = function(byte, context){
      context.resetStep();
      context.resetIndex();
      return(new ReadStart());
    }
    this.name = "ResetParser";
  }

  var ReadStart = function(){
    this.handle = function(byte, context){
      if(byte == header_bytes[0]){
        context.save(byte);
        context.resetStep();
        return(new ReadNew());
      }
      else {
        return(new ResetParser());
      }
    }
    this.name = "ReadStart";
  }

  var ReadNew = function(){
    this.handle = function(byte, context){
      if(byte == header_bytes[1] && context.step == 1){
        context.save(byte);
        context.resetStep();
        return(new ReadPacket());
      } else {
        return(new ResetParser());
      }
    }
    this.name = "ReadNew";
  }

  var ReadPacket = function(){
    this.handle = function(byte, context){
      if(byte == header_bytes[2] && context.step == 1){
        context.save(byte);
        context.resetStep();
        return(new ReadToEnd());
      } else {
        return(new ResetParser());
      }
    }
    this.name = "ReadPacket";
  }

  var ReadToEnd = function(){
    this.handle = function(byte, context){
      context.save(byte);
      if(context.step < 20){
        return(new ReadToEnd());
      } else {
        context.emitterCallback(context.packet)
        return(new ResetParser());
      }
    }
    this.name = "ReadToEnd";
  }

  return Parser

})();
