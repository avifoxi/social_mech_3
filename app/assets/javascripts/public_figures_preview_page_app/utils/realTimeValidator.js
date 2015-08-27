'use strict';

var RealTimeValidator = function( $inputs ) {
  var _dataKeys = _($inputs) // this is maybe too clever ... filter jQ els, ensure they contain data-key attrs, and reduce to a single key-val map 
    .filter( function(ip){
      return $(ip).attr('data-key') !== undefined;
    })
    .reduce(function( collector, ip, n){
      
      var dataKey = JSON.parse( $(ip).attr('data-key') );
      var name = $(ip).attr('name');
      
      if ( dataKey ){
        _.assign(collector, {
          [$(ip).attr('name')]: dataKey
        });
        return collector;
      }
    }, {});
  

  this.check = function( input ){
    _dataKeys;
  };
}

module.exports = RealTimeValidator;