
module.exports = (function(){
  var header_bytes = [0x73, 0x6E, 0x70]

  var Parser = function(){
    this.packet = new Buffer(23);

    var step = 0;
    var index = 0;
    var currentState = new ReadStart();

    this.parse = function(byte){
      var nextState = currentState.handle({byte: byte, step: step, save: save, ri: resetIndex, rs: resetStep});
      step++;
      currentState = nextState;
    }

    var save = function(byte){
      this.packet[index] = byte;
      index++;
      console.log("Saved: " + byte + " Pkt: " + this.packet.toString("hex"));
    }

    var resetIndex = function(){
      index = 0;
    }

    var resetStep = function(){
      step = 0;
    }
  }

  var ReadStart = function(){
    this.handle = function(contex){
      if(contex.byte == header_bytes[0]){
        contex.save(contex.byte);
        contex.rs();
        return(new ReadNew());
      }
    }
  }

  var ReadNew = function(){
    this.handle = function(contex){
      if(contex.byte == header_bytes[1] && contex.step == 0){
        contex.save(contex.byte);
        contex.rs();
        return(new ReadPacket());
      } else {
        contex.rs();
        contex.ri();
        return(new ReadStart());
      }
    }
  }

  var ReadPacket = function(){
    this.handle = function(contex){
      if(contex.byte == header_bytes[2] && contex.step == 0){
        contex.save(contex.byte);
        contex.rs();
        return(new ReadToEnd());
      } else {
        contex.rs();
        contex.ri();
        return(new ReadStart());
      }
    }
  }

  var ReadToEnd = function(){
    this.handle = function(contex){
      if(contex.step < 20){
        contex.save(contex.byte);
        return(new ReadToEnd());
      } else {
        contex.rs();
        contex.ri();
        return(new ReadStart());
      }
    }
  }

  return {
    Parser : Parser
  };

})();
