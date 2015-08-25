'use strict';

var PublicFigureQuery = function () {
  var _activeFields = {},
    _inactiveFields = {};

  this.update = function( name, value ){
    _activeFields[ name ] = value;
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
window.ISOPUBLIC = PublicFigureQuery;