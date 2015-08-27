'use strict';

const STATES = ['UNVALIDATED', 'VALIDATED', 'INVALID'];

var InputField = function(args){
  var _state = STATES[0],
    _name = args.name,
    _value = args.value;
  
  this.updateValue = function( newVal ){
    _value = newVal;
  };
  this.getValue = function(){
    return _value;
  }
}

module.exports = InputField;

window.CHEAT = InputField;