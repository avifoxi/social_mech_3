'use strict';

var usernamePotentials = function( MASTER ) {

  var _pathMap = {
    'insta': MASTER.getPATHS('instagram_ids_from_string'),
    'facebook': MASTER.getPATHS('fb_id_from_string')
  };

  var _cachedLists = {
    'insta': {},
    'facebook': {}
  };

  var _callback = function( data ){ 
    MASTER.showModal().show( 'username#check', data );
  };
  this.getCachedList = function( testFor, name ){
    return _cachedLists[ testFor ][ name ];
  };

  this.getUsernameList = function( testFor, value ){
    
    var path = _pathMap[ testFor ],
      data = {
        aggregator: {
          test_string: value
        }
      };

    MASTER.callingServer( _callback );
    // debugger;
    $.post(path, data, function(res){
      if ( res.html )
        _cachedLists[ testFor ][ value ] = res.html;
      
      var data = _.assign(res, {testFor: testFor, value: value}); // better to manually include function above, move towards less global
      MASTER.serverResponse(data, 'username#check');
    });
  };
}

module.exports = usernamePotentials;