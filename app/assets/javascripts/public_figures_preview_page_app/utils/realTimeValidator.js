/*
  
  DEV NOTES:
  real time validator is getting data-keys from the dom 
  these are embedded in the form being delivererd, as json field within form input html
  source is at app/views/public_figures/_preview_form_with_popovers

*/

'use strict';

var RealTimeValidator = function( $inputs, MASTER ) {
  var _dataKeys = _.reduce( $inputs, function( collector, ip, n){ // n is iterator -- function doesn't work unless this value is in the args 
      var dataKey =  $(ip).attr('data-key') ;
      if ( dataKey ){
        var name = $(ip).attr('name');
        _.assign(collector, {
          [ name ]: JSON.parse( dataKey )
        }); 
      }
      return collector; 
    }, {});
  
  // EXPOSES 1 PUBLIC FUNCTION 
  this.check = function( input, callback ){
    debugger;
    var name = input.name(),
      dataKey = _dataKeys[ name ],
      expected = parseExpectation( dataKey.type_requirement ),
      value = ( expected === 'number' ) ? stringEvaluatesToNum( input.getValue() ) : input.getValue(),
      url = dataKey.validate_url,
      valid = ( typeof value === expected ),
      reason = undefined;

    if ( value === '' ){
      // do nothing. input is still unvalidated bc nothing to validate
    } else if ( !valid && !url ){
      reason = errorMessage( input, expected );
      input.setValidity( false, reason );
    } else if ( !valid && url ) {
      reason = 'waiting';
      input.setValidity( false, reason );
      MASTER.requestTwoStepValidation( input, url );
    } else {
      input.setValidity( true );
    }
    callback();
  };

  // PRIVATE FUNCS
  function errorMessage( input, expected ){
    return 'user input of "' + 
      input.getValue() +
      '" is not a ' + 
      expected;
  }
  function stringEvaluatesToNum( string ){
    var inputLength = string.length,
      coercedNum = +string;

    if ( isNaN( coercedNum ) ){
      return false;
    }
    if ( new String( coercedNum ).length !== inputLength ){
      return false;
    }
    return coercedNum;
  }
  function parseExpectation( exp ){
    // currently, some of the form-embedded expectations are formatted:
    // type#detail 
    // ala string#csv
    // right now, we're not gonna worry about second value... though perhaps later we will
    // anyhoo -- right now just return string, first value of split on '#'
    return exp.split('#')[0];
  }
}

module.exports = RealTimeValidator;