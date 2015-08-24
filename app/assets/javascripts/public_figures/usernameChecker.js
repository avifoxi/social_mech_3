'use strict';

var usernameChecker = function( MASTER ) {

  var _pathMap = {
    'insta-username': MASTER.getPATHS('instagram_ids_from_string'),
    'facebook-username': MASTER.getPATHS('fb_id_from_string')
  };

  var _cachedLists = {};
  var _callback = function( data ){ 
    MASTER.showModal().show( 'username#check', data );
  };

  this.getUsernameList = function( testFor, value ){
    
    let path = _pathMap[ testFor ],
      data = {
        aggregator: {
          test_string: value
        }
      };

    MASTER.callingServer( _callback );

    $.post(path, data, function(res){
      
      console.log('MASTER.checkPotentials placeholder');
      // handoff results to Master, disable waiting
      if ( res.html )
        _cachedLists[ username ] = res.html;
      debugger;
    
      MASTER.serverResponse(res, 'username#check');
    });
  };
}

module.exports = usernameChecker;