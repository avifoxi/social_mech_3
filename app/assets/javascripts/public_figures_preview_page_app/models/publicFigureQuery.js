'use strict';

var InputField = require('./inputField.js');

var PublicFigureQuery = function () {
  var _activeFields = {},
    _inactiveFields = {};

  this.update = function( nameVal ){
    if ( !_activeFields[ nameVal.name ] ){
      _activeFields[ nameVal.name ] = new InputField(nameVal);
    } else {
      _activeFields[ nameVal.name ].updateValue( nameVal.value );
    }
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
  this.getInputField = function( key ){
    return _activeFields[ key ];
  }
}

module.exports = PublicFigureQuery;