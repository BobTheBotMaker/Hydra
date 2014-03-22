/**
 * Created with IntelliJ IDEA.
 * User: andre
 * Date: 3/22/14
 * Time: 6:29 PM
 * To change this template use File | Settings | File Templates.
 */

module.exports = (function(){

  var leftPad = function(s, c, n) {
    if (! s || ! c || s.length >= n) {
      return s;
    }
    var max = (n - s.length)/c.length;
    for (var i = 0; i < max; i++) {
      s = c + s;
    }
    return s;
  }

  return { leftPad: leftPad };

})()
