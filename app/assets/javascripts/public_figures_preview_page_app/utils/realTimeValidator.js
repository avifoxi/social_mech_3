'use strict';

var RealTimeValidator = function( $inputs ) {
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
  

  this.check = function( input ){
    var name = input.name(),
      expected = parseExpectation( dataKey.type_requirement ),
      value = ( expected === 'number' ) ? stringEvaluatesToNum( input.getValue() ) : input.getValue(),
      dataKey = _dataKeys[ name ],
      url = dataKey.validate_url;
    debugger;
    if ( typeof value !== expected ){
      input.setValidity( false )
      return;
    }
    if ( url ){

    }
    input.setValidity( true );
  };
  function stringEvaluatesToNum( string ){
    var inputLength = string.length,
      coercedNum = +string;

    if ( coercedNum.valueOf === NaN ){
      return false;
    }
    if ( new String( coercedNum ).length !== inputLength ){
      return false;
    }
    return coercedNum;
  }
  function parseExpectation( exp ){
    // currently, some of the expectations are in form:
    // type#detail 
    // ala string#csv
    // right now, we're not gonna worry about second value... though perhaps later we will
    // anyhoo -- right now just return string, first value of split on '#'
    return exp.split('#')[0];
  }
}

module.exports = RealTimeValidator;