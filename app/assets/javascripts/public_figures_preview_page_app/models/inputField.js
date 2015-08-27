'use strict';

const STATES = ['UNVALIDATED', 'VALID', 'INVALID'];

var InputField = function(args){
  // set internal vars
  var _state = STATES[0],
    _name = args.name,
    _value = args.value;
  
  this.name = function(){
    return _name;
  };
  this.updateValue = function( newVal ){
    _value = newVal;
    if ( _state !== STATES[0] ) {
      _state = STATES[0];
    }
  };
  this.getValue = function(){
    return _value;
  }
  this.getValidState = function(){
    return _state;
  }
  this.setValidity = function( boolean ){
    _state = boolean ? STATES[1] : STATES[2]
  };
}

module.exports = InputField;