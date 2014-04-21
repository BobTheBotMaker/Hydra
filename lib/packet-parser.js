
module.exports = (function(){
  var Parser = function(callback){

    const header_bytes = [0x73, 0x6E, 0x70];

    var index = 0;
    var consumed = false;
    var packet = [];
    var step = 0;
    var emitterCallback = callback;

    var save = function(octet){
      packet[index] = octet;
      index++;
      consumed = true;
    }

    var ResetParser = function(){
      step = 0;
      index = 0;
      return(ReadStart);
    }

    var ReadStart = function(octet){
      if(octet == header_bytes[0]){
        save(octet);
        step = 0;
        return(ReadNew);
      } else {
        consumed = true;
        return(ResetParser);
      }
    }

    var ReadNew = function(octet){
      if(octet == header_bytes[1] && step == 1){
        save(octet);
        step = 0;
        return(ReadPacket);
      } else {
        return(ResetParser);
      }
    }

    var ReadPacket = function(octet){
      if(octet == header_bytes[2] && step == 1){
        save(octet);
        step = 0;
        return(ReadToEnd);
      } else {
        return(ResetParser);
      }
    }

    var ReadToEnd = function(octet){
      save(octet);
      if(step < 20){
        return(ReadToEnd);
      } else {
        emitterCallback(packet);
        return(ResetParser);
      }
    }

    var currentState = ReadStart;
    this.parse = function(octet){
      consumed = false;
      while(!consumed){
        step++;
        currentState = currentState(octet);
      }
    }
  }

  return Parser

})();
