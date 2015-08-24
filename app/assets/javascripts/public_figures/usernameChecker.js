'use strict';

var usernameChecker = function( MASTER ) {

  var _pathMap = {
    'insta': MASTER.getPATHS('instagram_ids_from_string'),
    'facebook': MASTER.getPATHS('fb_id_from_string')
  };

  var _cachedLists = {
    'insta': undefined,
    'facebook': undefined
  };
  
  var _callback = function( data ){ 
    MASTER.showModal().show( 'username#check', data );
  };

  this.getUsernameList = function( testFor, value ){
    
    var path = _pathMap[ testFor ],
      data = {
        aggregator: {
          test_string: value
        }
      };

    MASTER.callingServer( _callback );

    $.post(path, data, function(res){
      if ( res.html )
        _cachedLists[ value ] = res.html;

      var data = _.assign(res, {testFor: testFor});
      MASTER.serverResponse(data, 'username#check');
    });
  };
}

module.exports = usernameChecker;