'use strict';

var PublicFigureQuery = function () {
  var _activeFields = {},
    _inactiveFields = {};

  this.update = function( nameVal ){
    _activeFields[ nameVal.name ] = nameVal.value;
  };
  this.removeFromActive = function( name ){
    if ( _activeFields[ name ] ) {
      _inactiveFields[ name ] = _activeFields[ name ];
      _activeFields = _.omit( _activeFields, name );
    }
  };
  this.returnToActive = function( name ){
    if ( _inactiveFields[ name ] ) {
      _activeFields[ name ] = _inactiveFields[ name ];
      _inactiveFields = _.omit( _inactiveFields, name );
    }
  };
  this.getActiveFields = function(){
    return _activeFields;
  };
}

module.exports = PublicFigureQuery;