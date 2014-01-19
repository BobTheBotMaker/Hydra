
module.exports = (function(){
  var header_bytes = [0x73, 0x6E, 0x70]

  var Parser = function(){
    this.packet = new Buffer(22);
    this.count = 0;

    var index = 0;
    var current_state = new ReadStart(this);

    this.parse = function(byte){
      console.log("Byte: " + byte.toString(16));
      current_state.handle(byte)
      this.count++;
    }

    this.save = function(byte){
      this.packet[index] = byte;
      index++
      this.count = 0;
    }

    this.change = function(state){
      current_state = state;
    }

    this.reset = function(){
      index = 0;
      this.count = 0;
    }

  }

  var ReadStart = function(parser){
    this.handle = function(byte){
      if(byte == header_bytes[0]){
        parser.save(byte);
        parser.change(new ReadNew(parser));
      }
    }
  }

  var ReadNew = function(parser){
    this.handle = function(byte){
      if(byte == header_bytes[1] && parser.count == 0){
        parser.save(byte);
        parser.change(new ReadPacket(parser));
      } else {
        parser.reset();
        parser.change(new ReadStart(parser));
      }
    }
  }

  var ReadPacket = function(parser){
    this.handle = function(byte){
      if(byte == header_bytes[2] && parser.count == 0){
        parser.save(byte);
        parser.change(new PrintYea(parser));
      } else {
        parser.reset();
        parser.change(new ReadStart(parser));
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
