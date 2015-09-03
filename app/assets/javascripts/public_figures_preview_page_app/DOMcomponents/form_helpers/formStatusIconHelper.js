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

  function handleInvalid( invalid ){
    switch ( invalid ){
      case 'waiting':
      case 'select':
        return _iconMap[ invalid ]; // string will be either 'waiting' or 'select'
        break;
      default: 
        return _iconMap[ 'invalid' ]; 
    }
  }

  return function( input ){
    var status = input.getValidState(),
      icon;
    if ( typeof status === 'string' ){
      icon = _iconMap[ status.toLowerCase() ];
    } else {
      icon = handleInvalid( status[ 'INVALID' ]);
    }

    return $.clone( icon );
  };
}

module.exports = FormStatusIconHelper;