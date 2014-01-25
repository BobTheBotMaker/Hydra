
module.exports = (function(){
  var header_bytes = new Buffer([0x73, 0x6E, 0x70]);

  var Parser = function(callback){
    var index = 0;
    var currentState = new ReadStart();
    var consumed = false;
    var packet = new Buffer(23);
    var step = 0;

    this.emitterCallback = callback;

    this.save = function(byte){
      packet[index] = byte;
      index++;
      consumed = true;
    }

    this.getPacket = function(){
      return(packet);
    }

    this.resetIndex = function(){
      index = 0;
    }

    this.resetStep = function(){
      step = 0;
    }

    this.getStep = function(){
      return(step);
    }

    this.markConsumed = function(){
      consumed = true;
    }

    this.parse = function(byte){
        consumed = false;
        while(!consumed){
          step++;
          currentState = currentState.handle(byte, this);
        }
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
      } else {
        context.markConsumed();
        return(new ResetParser());
      }
    }
    this.name = "ReadStart";
  }

  var ReadNew = function(){
    this.handle = function(byte, context){
      if(byte == header_bytes[1] && context.getStep() == 1){
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
      if(byte == header_bytes[2] && context.getStep() == 1){
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
      if(context.getStep() < 20){
        return(new ReadToEnd());
      } else {
        context.emitterCallback(context.getPacket());
        return(new ResetParser());
      }
    }
    this.name = "ReadToEnd";
  }

  return Parser

})();
