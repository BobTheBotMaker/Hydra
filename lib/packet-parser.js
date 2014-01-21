
module.exports = (function(){
  var header_bytes = [0x73, 0x6E, 0x70]

  var Parser = function(callback){
    var index = 0;
    var currentState = new ReadStart();

    this.emitterCallback = callback;
    this.step = 0;
    this.packet = new Buffer(23);

    this.save = function(byte){
      this.packet[index] = byte;
      console.log("Saved: " + byte.toString(16) + " Step: " + this.step)
      index++;
    }

    this.resetIndex = function(){
      index = 0;
    }

    this.resetStep = function(){
      this.step = 0;
    }

    this.parse = function(byte){
      this.step++;
      var nextState = currentState.handle(byte, this);
      currentState = nextState;
    }
  }

  var ResetParser = function(){
    this.handle = function(byte, context){
      context.resetStep();
      context.resetIndex();
      return(new ReadStart());
    }
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
  }

  var ReadToEnd = function(){
    this.handle = function(byte, context){
      if(context.step <= 20){
        context.save(byte);
        return(new ReadToEnd());
      } else {
        context.emitterCallback(context.packet)
        return(new ResetParser());
      }
    }
  }

  return Parser

})();
