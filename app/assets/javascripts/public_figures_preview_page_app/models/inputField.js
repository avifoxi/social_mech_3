'use strict';

const STATES = ['UNVALIDATED', 'VALID', 'INVALID'];

var InputField = function(args){
  // set internal vars
  var _state = STATES[0],
    _name = args.name,
    _value = args.value,
    _reasonForInvalidation = null;
  
  this.name = function(){
    return _name;
  };
  this.updateValue = function( newVal ){
    _value = newVal;
    if ( _state !== STATES[0] ) {
      _state = STATES[0];
      _reasonForInvalidation = null;
    }
  };
  this.getValue = function(){
    return _value;
  }
  this.getValidState = function(){
    if ( _state === STATES[2] ){ // invalid
      return {
        [ _state ]: _reasonForInvalidation
      };
    } else {
      return _state;
    }
  }
  this.setValidity = function( boolean ){
    _state = boolean ? STATES[1] : STATES[2]
  };
  this.setReasonForInvalidation = function( reason ){
    _reasonForInvalidation = reason;
  }
}

module.exports = InputField;