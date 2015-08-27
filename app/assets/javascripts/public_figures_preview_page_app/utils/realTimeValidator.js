'use strict';

var RealTimeValidator = function( $inputs ) {
  var _dataKeys = _($inputs)
    .filter( function(ip){
        return $(ip).attr('data-key') !== undefined
    })
    .map(function(ip){
      return {
        [$(ip).attr('name')]: JSON.parse( $(ip).attr('data-key') )
      }
    })
    .value();
  
  debugger

}

module.exports = RealTimeValidator;