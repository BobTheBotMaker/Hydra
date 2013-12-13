/**
 * Created with IntelliJ IDEA.
 * User: andre
 * Date: 12/13/13
 * Time: 11:47 AM
 * To change this template use File | Settings | File Templates.
 */

module.exports = (function(){
  var build = function(structure, data){
    var bitField = {};

    for(var field in structure){
      var fieldData = data.splice(structure[field].start, structure[field].len);
      bitField[field] = fieldData;
    }
    return(bitField);
  }

  return {
    build : build
  };

})();