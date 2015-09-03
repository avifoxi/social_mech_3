'use strict';

var usernamePotentials = function( MASTER ) {

  var _cachedLists = {
    // slightly awkward bc taken from form auto gen'd input names
    'public_figure[instagram_id]': {},
    'public_figure[facebook_id]': {}
  };
  
  this.getCachedList = function( testFor, name ){
    return _cachedLists[ testFor ][ name ];
  };

  this.getUsernameList = function( inputName, value ){
    
    var path = MASTER.getPATHS( inputName ),
      data = {
        aggregator: {
          test_string: value
        }
      };

    // MASTER.callingServer( _callback );
    // debugger;
    $.post(path, data, function(res){
      if ( res.html )
        _cachedLists[ inputName ][ value ] = res.html;

      var data = _.assign(res, {testFor: inputName, value: value}); // better to manually include function above, move towards less global
      MASTER.serverResponse(data, 'username#check');
    });
  };
}

module.exports = usernamePotentials;