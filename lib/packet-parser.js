
module.exports = (function(){
  var header_bytes = [0x73, 0x6E, 0x70]

  var Parser = function(){
    this.packet = new Buffer(22);

    var step = 0;
    var index = 0;
    var current_state = new ReadStart(this);

    this.parse = function(byte){
      console.log("Byte: " + byte.toString(16) + " Step: " + step);

      current_state.handle(byte);
      step++;
    }

    this.save = function(byte){
      this.packet[index] = byte;
      index++
    }

    this.change = function(state){
      current_state = state;
    }

    this.resetStep = function(){
      step = 0;
    }

    this.getStep = function(){
      return(step);
    }

    this.reset = function(){
      index = 0;
      this.resetStep();
    }

  }

  var ReadStart = function(parser){
    this.handle = function(byte){
      if(byte == header_bytes[0]){
        parser.save(byte);
        parser.resetStep();
        parser.change(new ReadNew(parser));
      }
    }
  }

  var ReadNew = function(parser){
    this.handle = function(byte){
      if(byte == header_bytes[1] && (parser.getStep()) == 0){
        parser.save(byte);
        console.log("Saving Start: " + byte + " Step: " + parser.getStep() + " Pkt: " + parser.packet.toString("hex"));
        parser.resetStep();
        parser.change(new ReadPacket(parser));
      } else {
        parser.reset();
        parser.change(new ReadStart(parser));
      }
    }
  }

  var ReadPacket = function(parser){
    this.handle = function(byte){
      if(byte == header_bytes[2] && (parser.getStep()) == 0){
        parser.save(byte);
        parser.resetStep();
        parser.change(new ReadToEnd(parser));
      } else {
        parser.reset();
        parser.change(new ReadStart(parser));
      }
    }
  }

  var ReadToEnd = function(parser){
    this.handle = function(byte){
      var s = parser.getStep();
      console.log("S: " + s)
      if(s < 20){
        console.log("Saving: " + byte + " Step: " + parser.getStep() + " Pkt: " + parser.packet.toString("hex"));
        parser.save(byte);
      } else {
        parser.reset();
        parser.change(new PrintYea(parser));
      }

    }
  }

  var PrintYea = function(parser){
    this.handle = function(byte){
      console.log("Yea: " + parser.packet.toString("hex"));
    }
  }

  return {
    Parser : Parser
  };

})();
