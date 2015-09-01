'use strict';

var FormStatusIconHelper = function () {
  var _iconMap = {};

  $( $('#form-status-icons').html() )
    .each(function(i, item){ 
      if ( $(item).is( 'div' ) ) {
        var key = $(item).attr('data-key'); 
        _iconMap[ key ] = item;
      }
    });

  return function( input ){
    var status = input.getValidState(),
      icon;
    if ( typeof status === 'string' ){
      icon = _iconMap[ status.toLowerCase() ];
    } else if ( status[ 'INVALID' ] === 'waiting' ) {
      icon = _iconMap[ 'waiting' ];
    } else {
      icon = _iconMap[ 'invalid' ];
    }
    return $.clone( icon );
  };
}

module.exports = FormStatusIconHelper;